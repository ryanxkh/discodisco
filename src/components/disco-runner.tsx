"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import type { Mode, SectionName } from "@/lib/schemas";
import {
  SnapshotRender,
  DiscoveryRender,
  ProductMapRender,
  CaseStudyRender,
  ObjectionsRender,
  CompetitiveRender,
} from "./section-renderers";

type SectionState = {
  status: "pending" | "ready" | "error";
  data?: unknown;
  error?: string;
  citations?: Array<{ sourceFile: string; sourceTitle: string }>;
};

type RunState = {
  status: "idle" | "streaming" | "done" | "error";
  prospect?: {
    company: string;
    industry: string;
    role: string;
    stage: string;
  };
  confidence?: "low" | "medium" | "high";
  missingSignals?: string[];
  plan: SectionName[];
  sections: Partial<Record<SectionName, SectionState>>;
  fatalError?: string;
};

const SECTION_TITLES: Record<SectionName, string> = {
  snapshot: "Prospect snapshot",
  discovery: "Discovery questions",
  "product-map": "Vercel product map",
  "case-study": "Case study to drop",
  objections: "Objection prep",
  competitive: "Competitive read",
};

const EXAMPLE_PASTE = `Met with Sarah Chen, VP Engineering at Glide AI (Series B, ~80 engineers, ~$30M raised). They're building an AI customer support agent product. Pain: AWS Lambda bill exploded last quarter — long LLM tool calls are paying for idle wait time. Staging environments take ~25 minutes to spin up which is killing experimentation velocity. Currently on Next.js 14 self-hosted on EKS. Champion is the head of platform eng. Looking at competitors: Cloudflare Workers and self-hosted.`;

export function DiscoRunner() {
  const [paste, setPaste] = useState("");
  const [mode, setMode] = useState<Mode>("ae");
  const [run, setRun] = useState<RunState>({
    status: "idle",
    plan: [],
    sections: {},
  });
  const [, startTransition] = useTransition();

  async function handleRun() {
    if (!paste.trim()) return;
    setRun({ status: "streaming", plan: [], sections: {} });

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ paste, mode }),
      });
      if (!res.ok || !res.body) {
        throw new Error(`Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const raw of lines) {
          if (!raw.trim()) continue;
          processEvent(JSON.parse(raw));
        }
      }
      if (buffer.trim()) processEvent(JSON.parse(buffer));
      setRun((r) => ({ ...r, status: "done" }));
    } catch (err) {
      setRun((r) => ({
        ...r,
        status: "error",
        fatalError: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }

  function processEvent(ev: unknown) {
    startTransition(() => {
      const event = ev as
        | {
            type: "parsed";
            prospect: RunState["prospect"];
            confidence: RunState["confidence"];
            missingSignals: string[];
          }
        | { type: "plan"; sections: SectionName[] }
        | {
            type: "section";
            name: SectionName;
            data: unknown;
            citations: SectionState["citations"];
          }
        | { type: "section_error"; name: SectionName; error: string }
        | { type: "done" };

      setRun((prev) => {
        switch (event.type) {
          case "parsed":
            return {
              ...prev,
              prospect: event.prospect,
              confidence: event.confidence,
              missingSignals: event.missingSignals,
            };
          case "plan": {
            const sections: RunState["sections"] = {};
            for (const s of event.sections)
              sections[s] = { status: "pending" };
            return { ...prev, plan: event.sections, sections };
          }
          case "section":
            return {
              ...prev,
              sections: {
                ...prev.sections,
                [event.name]: {
                  status: "ready",
                  data: event.data,
                  citations: event.citations,
                },
              },
            };
          case "section_error":
            return {
              ...prev,
              sections: {
                ...prev.sections,
                [event.name]: { status: "error", error: event.error },
              },
            };
          default:
            return prev;
        }
      });
    });
  }

  const isStreaming = run.status === "streaming";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Paste prospect context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paste" className="text-xs uppercase tracking-wide text-muted-foreground">
              Meeting notes, LinkedIn bio, SDR handoff, company URL — anything goes
            </Label>
            <Textarea
              id="paste"
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              placeholder={EXAMPLE_PASTE}
              className="min-h-[160px] font-mono text-xs leading-relaxed resize-y"
              disabled={isStreaming}
            />
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Mode
              </Label>
              <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                <TabsList>
                  <TabsTrigger value="ae" disabled={isStreaming}>
                    AE — fast prep
                  </TabsTrigger>
                  <TabsTrigger value="sa" disabled={isStreaming}>
                    SE/SA — deep prep
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPaste(EXAMPLE_PASTE)}
                disabled={isStreaming || !!paste}
              >
                Use example
              </Button>
              <Button onClick={handleRun} disabled={isStreaming || !paste.trim()}>
                {isStreaming ? "Running…" : "Run discodisco"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {run.fatalError && (
        <Alert variant="destructive">
          <AlertTitle>Run failed</AlertTitle>
          <AlertDescription>{run.fatalError}</AlertDescription>
        </Alert>
      )}

      {run.prospect && (
        <Card className="border-dashed">
          <CardContent className="py-4 space-y-3 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="font-mono">
                {run.prospect.company}
              </Badge>
              <span className="text-muted-foreground">
                {run.prospect.industry}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{run.prospect.role}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{run.prospect.stage}</span>
              {run.confidence && (
                <Badge
                  variant={
                    run.confidence === "high"
                      ? "default"
                      : run.confidence === "medium"
                        ? "secondary"
                        : "outline"
                  }
                  className="ml-auto text-xs font-mono"
                >
                  parse: {run.confidence}
                </Badge>
              )}
            </div>
            {run.missingSignals && run.missingSignals.length > 0 && (
              <div className="text-muted-foreground leading-relaxed">
                <span className="text-foreground/80 font-medium">
                  Missing context:
                </span>{" "}
                {run.missingSignals.map((s) => s.replace(/-/g, " ")).join(", ")}
                . Sections will hedge accordingly — add these to sharpen the
                output.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {run.plan.length > 0 && (
        <div className="space-y-4">
          {run.plan.map((name) => {
            const s = run.sections[name];
            return (
              <Card key={name}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>{SECTION_TITLES[name]}</span>
                    {s?.status === "pending" && (
                      <span className="text-xs text-muted-foreground font-normal">
                        generating…
                      </span>
                    )}
                    {s?.status === "ready" && s.citations && s.citations.length > 0 && (
                      <span className="text-xs text-muted-foreground font-mono font-normal">
                        {s.citations.length} sources
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(!s || s.status === "pending") && (
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  )}
                  {s?.status === "error" && (
                    <Alert variant="destructive">
                      <AlertDescription className="text-xs">
                        {s.error}
                      </AlertDescription>
                    </Alert>
                  )}
                  {s?.status === "ready" && (
                    <SectionDispatcher name={name} data={s.data} mode={mode} />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SectionDispatcher({
  name,
  data,
  mode,
}: {
  name: SectionName;
  data: unknown;
  mode: Mode;
}) {
  switch (name) {
    case "snapshot":
      return <SnapshotRender data={data as never} mode={mode} />;
    case "discovery":
      return <DiscoveryRender data={data as never} mode={mode} />;
    case "product-map":
      return <ProductMapRender data={data as never} mode={mode} />;
    case "case-study":
      return <CaseStudyRender data={data as never} mode={mode} />;
    case "objections":
      return <ObjectionsRender data={data as never} mode={mode} />;
    case "competitive":
      return <CompetitiveRender data={data as never} mode={mode} />;
    default:
      return null;
  }
}

"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowUp, Check, Copy, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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

const PASTE_STORAGE_KEY = "discodisco:lastPaste";
const MODE_STORAGE_KEY = "discodisco:lastMode";

function sectionAnchor(name: SectionName) {
  return `section-${name}`;
}

export function DiscoRunner() {
  const [paste, setPaste] = useState("");
  const [mode, setMode] = useState<Mode>("ae");
  const [run, setRun] = useState<RunState>({
    status: "idle",
    plan: [],
    sections: {},
  });
  const [activeSection, setActiveSection] = useState<SectionName | null>(null);
  const [, startTransition] = useTransition();
  const inputCardRef = useRef<HTMLDivElement>(null);

  // Hydrate paste + mode from localStorage on mount
  useEffect(() => {
    try {
      const savedPaste = localStorage.getItem(PASTE_STORAGE_KEY);
      const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
      if (savedPaste) setPaste(savedPaste);
      if (savedMode === "ae" || savedMode === "sa") setMode(savedMode);
    } catch {
      // localStorage unavailable; ignore
    }
  }, []);

  // Persist paste (debounced to avoid excessive writes)
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        if (paste) localStorage.setItem(PASTE_STORAGE_KEY, paste);
        else localStorage.removeItem(PASTE_STORAGE_KEY);
      } catch {
        // ignore
      }
    }, 400);
    return () => clearTimeout(id);
  }, [paste]);

  useEffect(() => {
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

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

  function handleEdit() {
    setRun({ status: "idle", plan: [], sections: {} });
    setActiveSection(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Track which section is currently in viewport for nav active state.
  // Only depends on plan length — sections updating doesn't change which
  // anchors to observe, just their content.
  useEffect(() => {
    if (run.plan.length === 0) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }
    const planSnapshot = run.plan;

    let cancelled = false;
    const setup = () => {
      if (cancelled) return null;
      const elements = planSnapshot
        .map((n) => document.getElementById(sectionAnchor(n)))
        .filter((el): el is HTMLElement => el !== null);
      if (elements.length === 0) return null;
      const obs = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) {
            const id = visible[0].target.id;
            const name = planSnapshot.find((n) => sectionAnchor(n) === id);
            if (name) setActiveSection(name);
          }
        },
        { rootMargin: "-80px 0px -50% 0px", threshold: [0, 0.5, 1] },
      );
      for (const el of elements) obs.observe(el);
      return obs;
    };

    let observer: IntersectionObserver | null = setup();
    return () => {
      cancelled = true;
      observer?.disconnect();
      observer = null;
    };
  }, [run.plan]);

  const isStreaming = run.status === "streaming";
  const hasResults = run.status !== "idle" && run.plan.length > 0;
  const isCompactHeader = run.status !== "idle";

  return (
    <div className="flex flex-col min-h-screen">
      <Header compact={isCompactHeader} prospect={run.prospect} />

      <div
        className={cn(
          "flex-1 mx-auto w-full px-4 sm:px-6 pb-12",
          hasResults ? "max-w-7xl pt-6" : "max-w-3xl pt-8 sm:pt-10",
        )}
      >
        {!hasResults && (
          <div className="space-y-6">
            <InputCard
              paste={paste}
              setPaste={setPaste}
              mode={mode}
              setMode={setMode}
              isStreaming={isStreaming}
              onRun={handleRun}
              cardRef={inputCardRef}
            />
            {run.fatalError && (
              <Alert variant="destructive">
                <AlertTitle>Run failed</AlertTitle>
                <AlertDescription>{run.fatalError}</AlertDescription>
              </Alert>
            )}
            <EmptyStatePreview mode={mode} />
          </div>
        )}

        {hasResults && (
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_220px] gap-6 lg:gap-8 items-start">
            <aside className="lg:sticky lg:top-20 order-1 space-y-3">
              <InputRail
                paste={paste}
                mode={mode}
                isStreaming={isStreaming}
                onEdit={handleEdit}
                onRerun={handleRun}
              />
            </aside>

            <div className="order-2 space-y-4 min-w-0">
              {run.fatalError && (
                <Alert variant="destructive">
                  <AlertTitle>Run failed</AlertTitle>
                  <AlertDescription>{run.fatalError}</AlertDescription>
                </Alert>
              )}

              {run.prospect && (
                <ProspectStrip
                  prospect={run.prospect}
                  confidence={run.confidence}
                  missingSignals={run.missingSignals}
                />
              )}

              {run.plan.map((name) => {
                const s = run.sections[name];
                return (
                  <SectionCard
                    key={name}
                    name={name}
                    state={s}
                    mode={mode}
                  />
                );
              })}
            </div>

            <aside className="hidden lg:block lg:sticky lg:top-20 order-3">
              <SectionNav
                plan={run.plan}
                sections={run.sections}
                isStreaming={isStreaming}
                activeSection={activeSection}
              />
            </aside>
          </div>
        )}
      </div>

      <SiteFooter />
      {hasResults && <BackToTop />}
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 size-10 rounded-full border border-border bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-card shadow-lg transition-all flex items-center justify-center animate-in fade-in slide-in-from-bottom-2"
    >
      <ArrowUp className="size-4" />
    </button>
  );
}

function Header({
  compact,
  prospect,
}: {
  compact: boolean;
  prospect?: RunState["prospect"];
}) {
  if (compact) {
    return (
      <div className="border-b border-border bg-background/60 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3">
          <span className="font-mono text-sm tracking-tight">discodisco</span>
          {prospect && (
            <>
              <span className="text-muted-foreground/60 text-xs">/</span>
              <span className="font-mono text-xs text-muted-foreground truncate">
                {prospect.company}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    <header className="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16 pb-2 space-y-2">
      <h1 className="font-mono text-2xl sm:text-3xl tracking-tight">
        discodisco
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
        A discovery coach for Vercel sales. Paste meeting notes, an SDR
        handoff, or a LinkedIn bio. Get a prospect snapshot, dual-tagged
        MEDDPICC + SPICED questions, a product map, the closest case study,
        and objection prep — grounded in real Vercel research.
      </p>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 border-t border-border text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
      <span className="font-mono">v0.1 · MIT</span>
      <a
        href="https://github.com/ryanxkh/discodisco"
        target="_blank"
        rel="noreferrer"
        className="hover:text-foreground transition-colors"
      >
        github.com/ryanxkh/discodisco
      </a>
    </footer>
  );
}

function InputCard({
  paste,
  setPaste,
  mode,
  setMode,
  isStreaming,
  onRun,
  cardRef,
}: {
  paste: string;
  setPaste: (v: string) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  isStreaming: boolean;
  onRun: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <Card ref={cardRef}>
      <CardHeader>
        <CardTitle className="text-base">Paste prospect context</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="paste"
            className="text-xs uppercase tracking-wide text-muted-foreground"
          >
            Meeting notes, LinkedIn bio, SDR handoff, company URL — anything
            goes
          </Label>
          <Textarea
            id="paste"
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder={EXAMPLE_PASTE}
            className="min-h-[180px] font-mono text-xs leading-relaxed resize-y"
            disabled={isStreaming}
            autoFocus
          />
        </div>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Mode
            </Label>
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
              <TabsList>
                <TabsTrigger
                  value="ae"
                  disabled={isStreaming}
                  className="data-active:bg-foreground/10 data-active:text-foreground dark:data-active:bg-foreground/10 dark:data-active:border-foreground/20"
                >
                  AE — fast prep
                </TabsTrigger>
                <TabsTrigger
                  value="sa"
                  disabled={isStreaming}
                  className="data-active:bg-foreground/10 data-active:text-foreground dark:data-active:bg-foreground/10 dark:data-active:border-foreground/20"
                >
                  SE/SA — deep prep
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => setPaste(EXAMPLE_PASTE)}
              disabled={isStreaming || !!paste}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Use example
            </Button>
            <Button onClick={onRun} disabled={isStreaming || !paste.trim()}>
              {isStreaming ? "Running…" : "Run discodisco"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const PREVIEW_AE: { name: SectionName; hint: string }[] = [
  { name: "snapshot", hint: "buyer type, signals, committee" },
  { name: "discovery", hint: "8 dual-tagged questions" },
  { name: "objections", hint: "rebuttals to expected pushback" },
  { name: "case-study", hint: "closest Vercel customer to drop" },
];

const PREVIEW_SA: { name: SectionName; hint: string }[] = [
  { name: "snapshot", hint: "buyer type, signals, committee" },
  { name: "discovery", hint: "deeper questions w/ follow-ups + 'why'" },
  { name: "product-map", hint: "anchor products, current state, proposed arch" },
  { name: "case-study", hint: "closest Vercel customer + alternates" },
  { name: "objections", hint: "rebuttals + 'reframe' angles" },
  { name: "competitive", hint: "head-to-head positioning vs named competitors" },
];

function EmptyStatePreview({ mode }: { mode: Mode }) {
  const items = mode === "ae" ? PREVIEW_AE : PREVIEW_SA;
  return (
    <div className="rounded-lg border border-dashed border-border bg-card/20 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          What you'll get
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {items.length} sections · {mode === "ae" ? "AE mode" : "SE/SA mode"}
        </span>
      </div>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={item.name}
            className="flex items-baseline gap-3 text-xs leading-relaxed"
          >
            <span className="font-mono text-[10px] text-muted-foreground/70 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground/90">{SECTION_TITLES[item.name]}</span>
            <span className="text-muted-foreground truncate">— {item.hint}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function InputRail({
  paste,
  mode,
  isStreaming,
  onEdit,
  onRerun,
}: {
  paste: string;
  mode: Mode;
  isStreaming: boolean;
  onEdit: () => void;
  onRerun: () => void;
}) {
  const preview = paste.length > 220 ? `${paste.slice(0, 220).trim()}…` : paste;
  return (
    <div className="rounded-lg border border-border bg-card/40 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Your paste
        </span>
        <Badge variant="outline" className="font-mono text-[10px]">
          {mode === "ae" ? "AE" : "SE/SA"}
        </Badge>
      </div>
      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap break-words max-h-48 overflow-hidden">
        {preview}
      </p>
      <div className="flex flex-col gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={isStreaming}
          className="w-full justify-start"
        >
          <Pencil className="size-3.5" />
          Edit notes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRerun}
          disabled={isStreaming || !paste.trim()}
          className="w-full justify-start text-muted-foreground"
        >
          {isStreaming ? "Running…" : "Re-run"}
        </Button>
      </div>
    </div>
  );
}

function ProspectStrip({
  prospect,
  confidence,
  missingSignals,
}: {
  prospect: NonNullable<RunState["prospect"]>;
  confidence?: RunState["confidence"];
  missingSignals?: string[];
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-4 space-y-3 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="font-mono">
            {prospect.company}
          </Badge>
          <span className="text-muted-foreground">{prospect.industry}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{prospect.role}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{prospect.stage}</span>
          {confidence && (
            <Badge
              variant={
                confidence === "high"
                  ? "default"
                  : confidence === "medium"
                    ? "secondary"
                    : "outline"
              }
              className="ml-auto text-xs font-mono"
            >
              parse: {confidence}
            </Badge>
          )}
        </div>
        {missingSignals && missingSignals.length > 0 && (
          <div className="text-muted-foreground leading-relaxed">
            <span className="text-foreground/80 font-medium">
              Missing context:
            </span>{" "}
            {missingSignals.map((s) => s.replace(/-/g, " ")).join(", ")}.
            Sections will hedge accordingly — add these to sharpen the output.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SectionCard({
  name,
  state,
  mode,
}: {
  name: SectionName;
  state: SectionState | undefined;
  mode: Mode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isReady = state?.status === "ready";

  return (
    <Card id={sectionAnchor(name)} className="scroll-mt-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between gap-3">
          <span>{SECTION_TITLES[name]}</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
            {state?.status === "pending" && <span>generating…</span>}
            {isReady && state.citations && state.citations.length > 0 && (
              <span className="font-mono">
                {state.citations.length} sources
              </span>
            )}
            {isReady && (
              <CopyButton
                getText={() => contentRef.current?.innerText ?? ""}
                label={`Copy ${SECTION_TITLES[name]}`}
              />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={contentRef}>
          {(!state || state.status === "pending") && (
            <div className="space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          )}
          {state?.status === "error" && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs">
                {state.error}
              </AlertDescription>
            </Alert>
          )}
          {isReady && (
            <SectionDispatcher name={name} data={state.data} mode={mode} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SectionNav({
  plan,
  sections,
  isStreaming,
  activeSection,
}: {
  plan: SectionName[];
  sections: Partial<Record<SectionName, SectionState>>;
  isStreaming: boolean;
  activeSection: SectionName | null;
}) {
  const completed = plan.filter((n) => sections[n]?.status === "ready").length;
  return (
    <div className="rounded-lg border border-border bg-card/40 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Sections
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {completed}/{plan.length}
        </span>
      </div>
      <ol className="space-y-0.5">
        {plan.map((name) => {
          const s = sections[name];
          const status = s?.status ?? "pending";
          const isActive = activeSection === name;
          return (
            <li key={name}>
              <a
                href={`#${sectionAnchor(name)}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group flex items-center gap-2 py-1.5 px-2 -mx-2 rounded text-xs transition-colors",
                  isActive
                    ? "bg-foreground/5 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <StatusDot status={status} streaming={isStreaming} />
                <span className="truncate">{SECTION_TITLES[name]}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StatusDot({
  status,
  streaming,
}: {
  status: SectionState["status"];
  streaming: boolean;
}) {
  if (status === "ready") {
    return (
      <span
        aria-label="ready"
        className="size-1.5 rounded-full bg-foreground/80 shrink-0"
      />
    );
  }
  if (status === "error") {
    return (
      <span
        aria-label="error"
        className="size-1.5 rounded-full bg-destructive shrink-0"
      />
    );
  }
  return (
    <span
      aria-label="pending"
      className={cn(
        "size-1.5 rounded-full border border-muted-foreground/40 shrink-0",
        streaming && "animate-pulse",
      )}
    />
  );
}

function CopyButton({ getText, label }: { getText: () => string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={label}
      title={label}
      onClick={async () => {
        const text = getText();
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard unavailable; ignore
        }
      }}
      className="text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
    </Button>
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

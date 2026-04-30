"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type {
  CaseStudy,
  Competitive,
  Discovery,
  Mode,
  Objections,
  ProductMap,
  Snapshot,
} from "@/lib/schemas";

const MEDDPICC_ABBR: Record<string, string> = {
  Metrics: "M",
  "Economic-Buyer": "E",
  "Decision-Criteria": "Dc",
  "Decision-Process": "Dp",
  "Paper-Process": "Pp",
  "Identify-Pain": "I",
  Champion: "Ch",
  Competition: "Co",
};

const SPICED_ABBR: Record<string, string> = {
  Situation: "S",
  Pain: "P",
  Impact: "I",
  "Critical-Event": "C",
  Decision: "D",
};

export function SnapshotRender({ data, mode }: { data: Snapshot; mode: Mode }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
          Buyer type
        </div>
        <p className="text-sm leading-relaxed">{data.buyerType}</p>
      </div>
      <Separator />
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Top signals
        </div>
        <ul className="space-y-2">
          {data.topSignals.map((s, i) => (
            <li key={i} className="text-sm leading-relaxed flex gap-2">
              <span className="text-muted-foreground font-mono text-xs mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
      {mode === "sa" && data.buyerCommittee && (
        <>
          <Separator />
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Buyer committee
            </div>
            <ul className="space-y-1">
              {data.buyerCommittee.map((m, i) => (
                <li key={i} className="text-sm">
                  • {m}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {mode === "sa" && (data.dealStageRead || data.icpFitConfidence) && (
        <>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.dealStageRead && (
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Deal stage
                </div>
                <p className="text-sm">{data.dealStageRead}</p>
              </div>
            )}
            {data.icpFitConfidence && (
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  ICP fit confidence
                </div>
                <Badge
                  variant={
                    data.icpFitConfidence === "high"
                      ? "default"
                      : data.icpFitConfidence === "medium"
                        ? "secondary"
                        : "outline"
                  }
                  className="capitalize"
                >
                  {data.icpFitConfidence}
                </Badge>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function DiscoveryRender({
  data,
  mode,
}: {
  data: Discovery;
  mode: Mode;
}) {
  return (
    <div className="space-y-5">
      {data.questions.map((q) => (
        <div key={q.rank} className="space-y-2">
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs text-muted-foreground mt-1 shrink-0">
              Q{String(q.rank).padStart(2, "0")}
            </span>
            <p className="text-sm leading-relaxed font-medium">{q.question}</p>
          </div>
          <div className="ml-9 flex flex-wrap gap-1.5">
            {q.meddpicc.map((m) => (
              <Badge key={m} variant="secondary" className="font-mono text-xs">
                {MEDDPICC_ABBR[m] ?? m}
              </Badge>
            ))}
            {q.spiced.map((s) => (
              <Badge key={s} variant="outline" className="font-mono text-xs">
                {SPICED_ABBR[s] ?? s}
              </Badge>
            ))}
            <Badge className="text-xs" variant="default">
              → {q.productAnchor}
            </Badge>
          </div>
          {mode === "sa" && (q.goodAnswerSounds || q.followUp || q.why) && (
            <div className="ml-9 mt-2 space-y-1.5 text-xs text-muted-foreground border-l border-border pl-3">
              {q.goodAnswerSounds && (
                <p>
                  <span className="font-medium text-foreground/80">
                    Good answer sounds like:
                  </span>{" "}
                  {q.goodAnswerSounds}
                </p>
              )}
              {q.followUp && (
                <p>
                  <span className="font-medium text-foreground/80">
                    Follow-up:
                  </span>{" "}
                  {q.followUp}
                </p>
              )}
              {q.why && (
                <p>
                  <span className="font-medium text-foreground/80">Why:</span>{" "}
                  {q.why}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProductMapRender({
  data,
  mode,
}: {
  data: ProductMap;
  mode: Mode;
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {mode === "ae" ? "Anchor product" : "Anchor products"}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.anchorProducts.map((p) => (
            <Badge key={p} variant="default">
              {p}
            </Badge>
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed">{data.rationale}</p>
      {mode === "sa" && data.currentState && (
        <>
          <Separator />
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Current state
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.currentState}
            </p>
          </div>
        </>
      )}
      {mode === "sa" && data.proposedArchitecture && (
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
            Proposed Vercel architecture
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {data.proposedArchitecture}
          </p>
        </div>
      )}
    </div>
  );
}

export function CaseStudyRender({
  data,
  mode,
}: {
  data: CaseStudy;
  mode: Mode;
}) {
  return (
    <div className="space-y-3">
      {data.studies.map((s, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium">{s.title}</span>
            {s.url && (
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                ↗
              </a>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{s.metric}</p>
          {mode === "sa" && s.rationale && (
            <p className="text-xs text-muted-foreground italic">
              {s.rationale}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function ObjectionsRender({ data }: { data: Objections; mode: Mode }) {
  return (
    <div className="space-y-4">
      {data.pushbacks.map((p, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                p.type === "technical"
                  ? "default"
                  : p.type === "pricing"
                    ? "secondary"
                    : "outline"
              }
              className="capitalize text-xs"
            >
              {p.type}
            </Badge>
            <p className="text-sm font-medium">{p.objection}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-1">
            {p.response}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CompetitiveRender({ data }: { data: Competitive; mode: Mode }) {
  return (
    <div className="space-y-3">
      {data.likelyCompetitor && (
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
            Likely competitor
          </div>
          <Badge variant="default">{data.likelyCompetitor}</Badge>
        </div>
      )}
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Differentiators to lead with
        </div>
        <ul className="space-y-1.5">
          {data.differentiators.map((d, i) => (
            <li key={i} className="text-sm leading-relaxed">
              • {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { DiscoRunner } from "@/components/disco-runner";

export default function Page() {
  return (
    <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <header className="space-y-2">
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
      <DiscoRunner />
      <footer className="pt-8 border-t border-border text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono">v0.1 · MIT</span>
        <a
          href="https://github.com/ryanxkh/discodisco"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          github.com/ryanxkh/discodisco
        </a>
      </footer>
    </main>
  );
}

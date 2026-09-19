import type { MagazinePage } from "@/data/blank-magazine";

type PageSurfaceProps = {
  page: MagazinePage;
  isActive?: boolean;
};

export function PageSurface({ page, isActive = false }: PageSurfaceProps) {
  const isCover = page.kind === "cover";
  const isBack = page.kind === "back";

  return (
    <div
      className={[
        "page-surface relative flex h-full w-full overflow-hidden",
        isCover || isBack ? "cover" : "",
        isActive ? "ring-2 ring-[var(--color-focus)] ring-offset-2 ring-offset-[var(--color-page-background)]" : "",
      ].join(" ")}
    >
      {/* Subtle paper texture */}
      <div className="page-texture absolute inset-0 opacity-80 pointer-events-none" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8">
        {/* Top running head */}
        <div className="flex items-center justify-between text-running-head opacity-80">
          <span>{page.kind === "cover" ? "The 0-1" : page.kind === "back" ? "Issue end" : "Blank page"}</span>
          {page.number ? <span className="text-page-number">{page.number}</span> : null}
        </div>

        {/* Main content area */}
        {isCover ? (
          <div className="flex flex-1 items-center justify-center text-center">
            <div className="max-w-[80%]">
              <div className="mb-4 text-running-head">
                Global AI & technology brief
              </div>
              <h1 className="text-4xl font-semibold tracking-[0.18em] sm:text-5xl leading-tight">THE 0-1</h1>
              <div className="mt-6 text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">Issue 01</div>
            </div>
          </div>
        ) : isBack ? (
          <div className="flex flex-1 items-center justify-center text-center">
            <div className="max-w-[80%]">
              <div className="mb-4 text-running-head">
                End matter
              </div>
              <h2 className="text-2xl font-semibold tracking-[0.18em]">Back cover</h2>
              <p className="mt-4 text-sm text-[var(--color-text-muted)] max-w-xs mx-auto">
                Sources, credits, and corrections
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-[85%] rounded-2xl border border-dashed border-[var(--color-page-border)] bg-[var(--color-surface)]/50 p-8 text-center shadow-inner">
              <div className="text-running-head">
                Blank page
              </div>
              <div className="mt-5 text-2xl font-light tracking-[0.2em] text-[var(--color-text-muted)]">{page.number}</div>
              <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                Awaiting content
              </p>
            </div>
          </div>
        )}

        {/* Bottom running foot */}
        <div className="flex items-center justify-between text-page-number opacity-80">
          <span>{page.label}</span>
          <span>{isCover ? "Front" : isBack ? "Back" : "Inner"}</span>
        </div>
      </div>
    </div>
  );
}

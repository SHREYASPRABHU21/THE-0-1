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
        "relative flex h-full w-full overflow-hidden rounded-[28px] border border-stone-300 bg-stone-100 shadow-[0_20px_60px_rgba(28,25,23,0.15)]",
        isCover || isBack ? "bg-[#1f1a17] text-stone-100" : "bg-stone-50 text-stone-900",
        isActive ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-stone-200" : "",
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] opacity-80">
          <span>{page.kind === "cover" ? "The 0-1" : page.kind === "back" ? "Issue end" : "Blank page"}</span>
          {page.number ? <span>{page.number}</span> : null}
        </div>

        {isCover ? (
          <div className="flex flex-1 items-center justify-center text-center">
            <div>
              <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.42em] text-stone-300">
                Global AI & technology brief
              </div>
              <h1 className="text-4xl font-semibold tracking-[0.18em] sm:text-5xl">THE 0-1</h1>
              <div className="mt-6 text-xs uppercase tracking-[0.35em] text-stone-300">Issue 01</div>
            </div>
          </div>
        ) : isBack ? (
          <div className="flex flex-1 items-center justify-center text-center">
            <div>
              <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.42em] text-stone-300">
                End matter
              </div>
              <h2 className="text-2xl font-semibold tracking-[0.18em]">Back cover</h2>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full rounded-2xl border border-dashed border-stone-300 bg-white/50 p-8 text-center shadow-inner">
              <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500">
                Blank page
              </div>
              <div className="mt-5 text-2xl font-light tracking-[0.2em] text-stone-400">{page.number}</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] opacity-80">
          <span>{page.label}</span>
          <span>{isCover ? "Front" : isBack ? "Back" : "Inner"}</span>
        </div>
      </div>
    </div>
  );
}

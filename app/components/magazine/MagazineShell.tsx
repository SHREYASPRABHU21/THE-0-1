"use client";

import HTMLFlipBook from "react-pageflip";
import { useEffect, useRef, useState } from "react";

import { magazinePages } from "@/data/blank-magazine";
import { PageSurface } from "@/components/magazine/PageSurface";

export function MagazineShell() {
  const bookRef = useRef<any>(null);
  const totalPages = magazinePages.length;
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 900);

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const step = isMobile ? 1 : 2;

  const goToPage = (pageIndex: number) => {
    const safeIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
    setCurrentPage(safeIndex);
    if (bookRef.current && typeof bookRef.current.pageFlip === "function") {
      bookRef.current.pageFlip().flip(safeIndex, "top");
    }
  };

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <div className="min-h-screen bg-[#f4efe9] px-4 py-8 text-stone-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white/70 p-4 shadow-[0_8px_30px_rgba(28,25,23,0.05)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-stone-500">Issue preview</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[0.12em] text-stone-900">THE 0-1</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToPage(currentPage - step)}
              disabled={!canGoPrev}
              aria-label="Previous page"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <div className="min-w-[120px] text-center text-sm font-medium tracking-[0.12em] text-stone-600">
              Page {currentPage + 1} / {totalPages}
            </div>

            <button
              type="button"
              onClick={() => goToPage(currentPage + step)}
              disabled={!canGoNext}
              aria-label="Next page"
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <HTMLFlipBook
            ref={bookRef}
            startPage={0}
            width={isMobile ? 280 : 540}
            height={isMobile ? 420 : 680}
            size="stretch"
            minWidth={280}
            maxWidth={540}
            minHeight={420}
            maxHeight={680}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={false}
            clickEventForward={false}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={false}
            disableFlipByClick={false}
            onFlip={(event) => setCurrentPage(event.data)}
            className="w-full max-w-5xl"
            style={{}}
          >
            {magazinePages.map((page) => (
              <div key={page.id} className="h-full w-full">
                <PageSurface page={page} isActive={currentPage === magazinePages.indexOf(page)} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}

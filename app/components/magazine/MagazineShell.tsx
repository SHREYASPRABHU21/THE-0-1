"use client";

import HTMLFlipBook from "react-pageflip";
import { useEffect, useRef, useState, useCallback } from "react";

import { magazinePages } from "@/data/blank-magazine";
import { PageSurface } from "@/components/magazine/PageSurface";
import { ThemeToggle } from "@/components/magazine/ThemeToggle";
import { ReaderControls } from "@/components/magazine/ReaderControls";
import { useTheme } from "@/lib/theme-context";

export function MagazineShell() {
  const bookRef = useRef<any>(null);
  const totalPages = magazinePages.length;
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 900);

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const step = isMobile ? 1 : 2;

  const goToPage = useCallback((pageIndex: number) => {
    const safeIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
    setCurrentPage(safeIndex);
    if (bookRef.current && typeof bookRef.current.pageFlip === "function") {
      bookRef.current.pageFlip().flip(safeIndex, "top");
    }
  }, [totalPages]);

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const getPageIndicator = () => {
    if (isMobile) {
      return `Page ${currentPage + 1} / ${totalPages}`;
    }
    if (currentPage === 0) {
      return `Cover / ${totalPages}`;
    }
    if (currentPage === totalPages - 1) {
      return `Back cover / ${totalPages}`;
    }
    const leftPage = currentPage;
    const rightPage = Math.min(currentPage + 1, totalPages - 1);
    if (leftPage === rightPage) {
      return `Page ${leftPage} / ${totalPages}`;
    }
    return `Pages ${leftPage}–${rightPage} / ${totalPages}`;
  };

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
    // Apply zoom to the book container via CSS transform
    if (bookRef.current && bookRef.current.container) {
      bookRef.current.container.style.transform = `scale(${newZoom})`;
      bookRef.current.container.style.transformOrigin = 'center center';
    }
  }, []);

  const handleFullscreenChange = useCallback((isFull: boolean) => {
    setFullscreen(isFull);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 py-8 text-[var(--color-text)] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-4 shadow-[var(--shadow-level2)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-running-head">Issue preview</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[0.12em] text-[var(--color-text)]">THE 0-1</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToPage(currentPage - step)}
              disabled={!canGoPrev}
              aria-label="Previous page"
              className="control-button"
            >
              Previous
            </button>

            <div className="page-indicator">
              {getPageIndicator()}
            </div>

            <button
              type="button"
              onClick={() => goToPage(currentPage + step)}
              disabled={!canGoNext}
              aria-label="Next page"
              className="control-button primary"
            >
              Next
            </button>
          </div>
        </div>

        {/* Reader Controls: TOC, Thumbnails, Zoom, Fullscreen, Go to page */}
        <ReaderControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={goToPage}
          onZoomChange={handleZoomChange}
          onFullscreenChange={handleFullscreenChange}
          pages={magazinePages}
          bookRef={bookRef}
          isMobile={isMobile}
        />

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
            flippingTime={800}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.4}
            showCover={true}
            mobileScrollSupport={false}
            clickEventForward={false}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
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
      <ThemeToggle />
    </div>
  );
}

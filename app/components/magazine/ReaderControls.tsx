'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type FormEvent,
  type ChangeEvent,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';
import { useTheme } from '@/lib/theme-context';
import type { MagazinePage } from '@/data/blank-magazine';

interface ReaderControlsProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
  onFullscreenChange: (fullscreen: boolean) => void;
  pages: MagazinePage[];
  bookRef: React.RefObject<any>;
  isMobile: boolean;
}

export function ReaderControls({
  totalPages,
  currentPage,
  onPageChange,
  onZoomChange,
  onFullscreenChange,
  pages,
  bookRef,
  isMobile,
}: ReaderControlsProps) {
  const { theme } = useTheme();
  const [showTOC, setShowTOC] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [goToPageInput, setGoToPageInput] = useState('');
  const tocRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.25;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (currentPage > 0) onPageChange(currentPage - (isMobile ? 1 : 2));
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentPage < totalPages - 1) onPageChange(currentPage + (isMobile ? 1 : 2));
          break;
        case 'Home':
          e.preventDefault();
          onPageChange(0);
          break;
        case 'End':
          e.preventDefault();
          onPageChange(totalPages - 1);
          break;
        case 't':
        case 'T':
          if (!e.ctrlKey && !e.metaKey) setShowTOC(!showTOC);
          break;
        case 'n':
        case 'N':
          if (!e.ctrlKey && !e.metaKey) setShowThumbnails(!showThumbnails);
          break;
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) toggleFullscreen();
          break;
        case 'z':
        case 'Z':
          if (!e.ctrlKey && !e.metaKey) {
            if (e.shiftKey) zoomOut();
            else zoomIn();
          }
          break;
        case '0':
          if (!e.ctrlKey && !e.metaKey) resetZoom();
          break;
        case 'Escape':
          setShowTOC(false);
          setShowThumbnails(false);
          if (fullscreen) toggleFullscreen();
          break;
        case 'g':
        case 'G':
          if (!e.ctrlKey && !e.metaKey) {
            const input = document.getElementById('goto-page-input') as HTMLInputElement;
            input?.focus();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, isMobile, onPageChange, showTOC, showThumbnails, fullscreen]);

  // Fullscreen handling
  const toggleFullscreen = useCallback(() => {
    if (!fullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => {
          setFullscreen(true);
          onFullscreenChange(true);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setFullscreen(false);
          onFullscreenChange(false);
        });
      }
    }
  }, [fullscreen, onFullscreenChange]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setFullscreen(isFull);
      onFullscreenChange(isFull);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [onFullscreenChange]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setZoom(prev => {
      const next = Math.min(MAX_ZOOM, prev + ZOOM_STEP);
      onZoomChange(next);
      return next;
    });
  }, [onZoomChange]);

  const zoomOut = useCallback(() => {
    setZoom(prev => {
      const next = Math.max(MIN_ZOOM, prev - ZOOM_STEP);
      onZoomChange(next);
      return next;
    });
  }, [onZoomChange]);

  const resetZoom = useCallback(() => {
    setZoom(1);
    onZoomChange(1);
  }, [onZoomChange]);

  const handleZoomChange = useCallback((value: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
    setZoom(clamped);
    onZoomChange(clamped);
  }, [onZoomChange]);

  // Page navigation
  const handleGoToPage = useCallback((e: FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(goToPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum - 1);
      setGoToPageInput('');
    }
  }, [goToPageInput, totalPages, onPageChange]);

  const handlePageInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setGoToPageInput(e.target.value);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (showTOC && tocRef.current && !tocRef.current.contains(e.target as Node)) {
        setShowTOC(false);
      }
      if (showThumbnails && thumbnailsRef.current && !thumbnailsRef.current.contains(e.target as Node)) {
        setShowThumbnails(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTOC, showThumbnails]);

  // Touch/pinch zoom for mobile
  const touchState = useRef({ initialDistance: 0, initialZoom: 1 });

  const handleTouchStart = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchState.current.initialDistance = Math.sqrt(dx * dx + dy * dy);
      touchState.current.initialZoom = zoom;
    }
  }, [zoom]);

  const handleTouchMove = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchState.current.initialDistance > 0) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scale = distance / touchState.current.initialDistance;
      handleZoomChange(touchState.current.initialZoom * scale);
    }
  }, [handleZoomChange]);

  const handleWheel = useCallback((e: ReactWheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    }
  }, [zoomIn, zoomOut]);

  // TOC items - generate from pages
  const tocItems = pages.map((page, index) => ({
    page: index,
    label: page.kind === 'cover' ? 'Front Cover' : page.kind === 'back' ? 'Back Cover' : page.label,
    isCurrent: index === currentPage,
  }));

  return (
    <>
      {/* Keyboard hint (visible on focus) */}
      <div className="sr-only" id="keyboard-hints">
        Keyboard shortcuts: Arrow keys navigate, T=TOC, N=Thumbnails, F=Fullscreen, Z/Shift+Z=Zoom, 0=Reset zoom, G=Go to page, Esc=Close
      </div>

      {/* Top bar with TOC, Thumbnails, Zoom, Fullscreen, Go to page */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-3 shadow-[var(--shadow-level2)] backdrop-blur-sm">
        {/* Left: TOC & Thumbnails toggles */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTOC(!showTOC)}
            aria-label={showTOC ? 'Hide table of contents' : 'Show table of contents'}
            aria-expanded={showTOC}
            aria-controls="toc-panel"
            className={`control-button ${showTOC ? 'ring-2 ring-[var(--color-focus)]' : ''}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">Contents</span>
          </button>

          <button
            type="button"
            onClick={() => setShowThumbnails(!showThumbnails)}
            aria-label={showThumbnails ? 'Hide thumbnails' : 'Show thumbnails'}
            aria-expanded={showThumbnails}
            aria-controls="thumbnails-panel"
            className={`control-button ${showThumbnails ? 'ring-2 ring-[var(--color-focus)]' : ''}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4zm0 0l16 16M4 20l16-16" />
            </svg>
            <span className="hidden sm:inline">Thumbnails</span>
          </button>
        </div>

        {/* Center: Page indicator + Go to page */}
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <div className="page-indicator" aria-live="polite">
            {isMobile ? `Page ${currentPage + 1} / ${totalPages}` : currentPage === 0 ? `Cover / ${totalPages}` : currentPage === totalPages - 1 ? `Back cover / ${totalPages}` : `Pages ${currentPage}–${Math.min(currentPage + 1, totalPages - 1)} / ${totalPages}`}
          </div>

          <form onSubmit={handleGoToPage} className="flex items-center gap-2">
            <label htmlFor="goto-page-input" className="sr-only">Go to page</label>
            <input
              id="goto-page-input"
              type="number"
              min={1}
              max={totalPages}
              value={goToPageInput}
              onChange={handlePageInputChange}
              placeholder={`1–${totalPages}`}
              className="w-20 sm:w-24 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
              aria-label="Go to page number"
            />
            <button type="submit" className="control-button px-3" disabled={!goToPageInput}>
              Go
            </button>
          </form>
        </div>

        {/* Right: Zoom controls & Fullscreen */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-1">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              className="control-button p-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-2 text-sm font-mono text-[var(--color-text-muted)]" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              className="control-button p-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={resetZoom}
              disabled={zoom === 1}
              aria-label="Reset zoom"
              className="control-button p-1.5 ml-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            aria-pressed={fullscreen}
            className="control-button"
          >
            {fullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* TOC Panel */}
      {showTOC && (
        <div
          ref={tocRef}
          id="toc-panel"
          role="dialog"
          aria-label="Table of contents"
          className="fixed inset-0 z-40 flex items-start justify-center pt-20 px-4 pb-4 bg-[var(--color-overlay)] sm:pt-24"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-level4)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">Table of Contents</h2>
              <button
                type="button"
                onClick={() => setShowTOC(false)}
                aria-label="Close table of contents"
                className="control-button p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="max-h-[60vh] overflow-y-auto p-3" role="list">
              <ul className="space-y-1" role="list">
                {tocItems.map((item) => (
                  <li key={item.page} role="listitem">
                    <button
                      type="button"
                      onClick={() => {
                        onPageChange(item.page);
                        setShowTOC(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        item.isCurrent
                          ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]'
                          : 'text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                      }`}
                      aria-current={item.isCurrent ? 'page' : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Thumbnails Panel */}
      {showThumbnails && (
        <div
          ref={thumbnailsRef}
          id="thumbnails-panel"
          role="dialog"
          aria-label="Page thumbnails"
          className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-overlay)] pb-4 sm:pb-8"
        >
          <div
            className="mx-auto max-w-6xl rounded-t-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-level4)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">Thumbnails</h2>
              <button
                type="button"
                onClick={() => setShowThumbnails(false)}
                aria-label="Close thumbnails"
                className="control-button p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-3 overflow-x-auto" role="list">
              <ul className="flex gap-3 min-w-max" role="list">
                {pages.map((page, index) => (
                  <li key={page.id} role="listitem">
                    <button
                      type="button"
                      onClick={() => {
                        onPageChange(index);
                        setShowThumbnails(false);
                      }}
                      className={`relative flex-shrink-0 w-20 h-28 rounded-lg border-2 overflow-hidden transition-all ${
                        index === currentPage
                          ? 'border-[var(--color-focus)] ring-2 ring-[var(--color-focus)] ring-offset-2 ring-offset-[var(--color-surface)]'
                          : 'border-transparent hover:border-[var(--color-border)]'
                      }`}
                      aria-label={`Page ${index + 1}${page.kind === 'cover' ? ' (Cover)' : page.kind === 'back' ? ' (Back cover)' : ''}`}
                      aria-current={index === currentPage ? 'page' : undefined}
                    >
                      <div className="w-full h-full bg-[var(--color-page-background)]">
                        {page.kind === 'cover' && (
                          <div className="w-full h-full flex items-center justify-center text-center p-2">
                            <span className="text-xs font-semibold text-[var(--color-cover-text)]">COVER</span>
                          </div>
                        )}
                        {page.kind === 'back' && (
                          <div className="w-full h-full flex items-center justify-center text-center p-2">
                            <span className="text-xs font-semibold text-[var(--color-cover-text)]">BACK</span>
                          </div>
                        )}
                        {page.kind === 'inner' && (
                          <div className="w-full h-full flex items-center justify-center text-center p-1">
                            <span className="text-[10px] text-[var(--color-text-muted)]">{page.number}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Zoom overlay indicator */}
      {zoom !== 1 && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-30 rounded-full bg-[var(--color-surface)]/95 border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium text-[var(--color-text)] shadow-[var(--shadow-level3)] backdrop-blur-sm"
          aria-live="polite"
        >
          Zoom: {Math.round(zoom * 100)}%
        </div>
      )}

      {/* Fullscreen exit hint */}
      {fullscreen && (
        <div
          className="fixed top-4 right-4 z-30 rounded-full bg-[var(--color-surface)]/95 border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] shadow-[var(--shadow-level3)] backdrop-blur-sm"
          aria-live="polite"
        >
          Press Esc or F to exit fullscreen
        </div>
      )}

      {/* Touch/zoom handlers on the book container */}
      <div
        className="absolute inset-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
        aria-hidden="true"
      />
    </>
  );
}
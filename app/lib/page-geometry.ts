export const pageGeometry = {
  aspectRatio: {
    width: 3,
    height: 4,
  },
  logicalSize: {
    width: 720,
    height: 960,
  },
  margins: {
    inner: 48,
    outer: 64,
    top: 72,
    bottom: 72,
  },
  safeArea: {
    width: 720 - 48 - 64,
    height: 960 - 72 - 72,
  },
  spread: {
    gap: 24,
    maxWidth: 1440 + 24,
  },
  cover: {
    spineWidth: 12,
    edgeRadius: 8,
  },
  cornerFold: {
    size: 48,
  },
} as const;

export type PageGeometry = typeof pageGeometry;

export function getPageDimensions(viewportWidth: number, isSpread: boolean) {
  const maxPageWidth = isSpread
    ? (viewportWidth - pageGeometry.spread.gap) / 2
    : viewportWidth;

  const pageWidth = Math.min(pageGeometry.logicalSize.width, maxPageWidth);
  const scale = pageWidth / pageGeometry.logicalSize.width;
  const pageHeight = pageGeometry.logicalSize.height * scale;

  return {
    width: pageWidth,
    height: pageHeight,
    scale,
    safeArea: {
      width: pageGeometry.safeArea.width * scale,
      height: pageGeometry.safeArea.height * scale,
    },
  };
}

export function getSpreadDimensions(viewportWidth: number) {
  const { width: pageWidth, height: pageHeight, scale } = getPageDimensions(viewportWidth, true);
  return {
    width: pageWidth * 2 + pageGeometry.spread.gap,
    height: pageHeight,
    pageWidth,
    pageHeight,
    scale,
    gap: pageGeometry.spread.gap,
  };
}
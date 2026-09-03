# Testing Checklist

Run the relevant checks before every feature is committed.

## General

- [ ] Application starts without errors
- [ ] No browser console errors
- [ ] No TypeScript errors
- [ ] No broken links/buttons
- [ ] Existing completed features still work
- [ ] Keyboard focus is visible
- [ ] Text remains readable

## Desktop

- [ ] Test at a wide desktop width
- [ ] Test page-turn controls
- [ ] Test two-page layout when enabled
- [ ] Check that pages do not overflow/crop unexpectedly
- [ ] Check hover states
- [ ] Test full screen and zoom when those exist

## Mobile

- [ ] Test narrow phone width
- [ ] One-page reading mode works
- [ ] No horizontal page scroll
- [ ] Controls are easy to tap
- [ ] Text is readable without awkward zoom
- [ ] Images scale correctly
- [ ] Modals fit on screen
- [ ] Touch/swipe interactions work when added

## Accessibility

- [ ] Buttons have labels
- [ ] Images have alt text or are marked decorative
- [ ] Text has sufficient contrast
- [ ] Keyboard navigation works
- [ ] Reduced-motion preference is respected when animations are added
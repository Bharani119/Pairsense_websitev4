# Commit Context

**Commit:** ac265f1d4737557e78828deeb0f0c13434a3fb44  
**Author:** Preetham-Prasad-S <preetham2005105@gmail.com>  
**Date:** Thu Apr 23 20:16:17 2026 +0530  
**Message:** paralax video ready for flavours

## Modified Files

- `components/sections/Hero.tsx` – Replaced the `MolecularField` component with a new `ScrollImageSequence` component, updated imports and JSX structure.
- `components/three/ScrollImageSequence.tsx` – Updated imports to include `ReactNode`, added an optional `children` prop, and adjusted styling and loader markup.

## Added Files

- **Image frames** – 240 JPEG files added under `public/main-one/ezgif-frame-*.jpg` (frames 001–240).
- **Image frames** – 236 JPEG files added under `public/main-two/ezgif-frame-*.jpg` (frames 001–236).

_Total added image files: **476**._

## Summary

This commit introduces a parallax video effect by rendering a sequence of images via the new `ScrollImageSequence` component, and adds the required image assets to the `public/main-one` and `public/main-two` directories.

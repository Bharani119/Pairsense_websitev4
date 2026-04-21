# Pairsense Website

A high-performance sensory systems website built with Next.js, featuring immersive 3D visualizations and sophisticated animations.

## Project Overview

Pairsense is a precision formulation house specializing in engineering flavors and crafting fragrances. The website serves as a digital monograph, showcasing their expertise in designing sensory systems for global brands.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/) for UI transitions
  - [GSAP](https://gsap.com/) for scroll-based interactions
  - [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- **3D Rendering:** 
  - [Three.js](https://threejs.org/)
  - [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Language:** TypeScript

## Key Components

- **Immersive Hero:** Features a 3D `MolecularField` visualization representing aroma molecules.
- **Interactive Sections:** 
  - **InnovationLoop:** Showcases the circular process of creation.
  - **Process:** Explains the formulation methodology.
  - **Capabilities:** Highlights service offerings.
  - **Segments:** Explores different market sectors.
- **Visual Polish:** Uses `SplitText` for typography animations and `Reveal` components for smooth entry effects.

## Structure

- `/app`: Next.js App Router pages and global styles.
- `/components`:
  - `/layout`: Global components like Nav, Footer, Loader, and SmoothScroll.
  - `/sections`: Main page sections (Hero, About, Contact, etc.).
  - `/three`: 3D components (MolecularField, LiquidField, etc.).
  - `/ui`: Reusable UI elements (TiltCard, Reveal, SplitText, etc.).
- `/lib`: Utility functions and shared constants.
- `/assets`: Static assets including the Pairsense logo.

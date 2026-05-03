/**
 * Pinned Unsplash photo URLs — each verified HTTP 200.
 * Format: images.unsplash.com/photo-<id>?w=<w>&q=80&auto=format&fit=crop
 */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const IMG = {
  innovation: {
    lab: U("photo-1581093450021-4a7360e9a6b5"),           // scientists working in lab
  },
  process: {
    sourcing: "/sourcing.png",
    formulation: "/formulation.png",
    validation: "/validation.png",
  },
  about: "/about_premium.png",
  capabilities: {
    concept: "/cap_concept.png",
    ingredients: "/cap_ingredients.png",
    application: "/cap_application.png",
    sectors: "/cap_sectors.png",
  },
  segments: {
    fine: "/seg_fine.png",
    food: U("photo-1504674900247-0877df9cc836"),          // food flat lay
    seasoning: U("photo-1596040033229-a9821ebd058d"),     // spices
    beverage: U("photo-1514362545857-3bc16c4c7d1b"),      // cocktail / beverage
  },
  contact: {
    ctaBg: "/commence_bg.png",
  },
};

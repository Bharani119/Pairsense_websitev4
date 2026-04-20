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
    sourcing: U("photo-1501004318641-b39e6451bec6"),      // dark botanical leaves
    formulation: U("photo-1582719471384-894fbb16e074"),   // lab glassware / flasks
    validation: U("photo-1557672172-298e090bd0f1"),       // ink / smoke in water
  },
  about: U("photo-1541701494587-cb58502866ab"),           // ink flowing
  capabilities: {
    concept: U("photo-1554147090-e1221a04a025"),          // abstract pastel form
    ingredients: U("photo-1490730141103-6cac27aaab94"),   // macro pattern / petals
    application: U("photo-1564182842519-8a3b2af3e228"),   // liquid pour
    sectors: U("photo-1451187580459-43490279c0fa"),       // earth / globe
  },
  segments: {
    fine: U("photo-1541643600914-78b084683601"),          // perfume bottle
    food: U("photo-1504674900247-0877df9cc836"),          // food flat lay
    seasoning: U("photo-1596040033229-a9821ebd058d"),     // spices
    beverage: U("photo-1514362545857-3bc16c4c7d1b"),      // cocktail / beverage
  },
  contact: {
    ctaBg: U("photo-1508615263227-c5d58c1e5821"),         // atmospheric / studio
  },
};

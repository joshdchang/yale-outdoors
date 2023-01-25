import { z, defineCollection } from 'astro:content';

const tripsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    time: z.boolean(),
    image: z.string(),
  }),
});
const gearCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});
const merchCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    price: z.number(),
    image: z.string(),
  }),
});
const galleryCollection = defineCollection({
  schema: z.object({
    caption: z.string(),
    image: z.string(),
    date: z.date(),
    photographer: z.string(),
  }),
});
const resourcesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
  }),
});

// prettier-ignore
export const collections = {
  'trips': tripsCollection,
  'gear': gearCollection,
  'merch': merchCollection,
  'gallery': galleryCollection,
  'resources': resourcesCollection,
};

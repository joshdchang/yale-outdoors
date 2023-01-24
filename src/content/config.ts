import { z, defineCollection } from "astro:content";

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

export const collections = {
  'trips': tripsCollection,
  'gear': gearCollection,
  'merch': merchCollection,
};

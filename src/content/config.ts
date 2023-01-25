import { z, defineCollection } from 'astro:content';

// // example implementation yo() to add metadata to the schema for the CMS
// type YoConfig = {
//   name: string;
//   info?: string;
//   view?: 'input' | 'image' | 'video';
// }
// function yo(config: YoConfig | string) {
//   if (typeof config === 'string') {
//     return `{"name": "${config}"}"}`
//   }
//   return JSON.stringify(config);
// }

const tripsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    // // example using yo() to add metadata to the schema for the CMS
    // title: z.string().describe(yo({
    //   name: 'Title',
    //   info: 'The title of the trip',
    //   view: 'input',
    // })),
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

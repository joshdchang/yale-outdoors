import { z, defineCollection } from 'astro:content';

// example implementation yo() to add metadata to the schema for the CMS
type CMSConfig = {
  name: string;
  info?: string;
  view?: 'input' | 'date' | 'checkbox' | 'switch' | 'textarea' | 'markdown' | 'image' | 'youtube';
};
function cms(config: CMSConfig | string) {
  if (typeof config === 'string') {
    return `{"name": "${config}"}`;
  }
  return JSON.stringify(config);
}

const tripsCollection = defineCollection({
  schema: z
    .object({
      title: z.string().describe(
        cms({
          name: 'Title',
          info: 'The name of the trip or event',
          view: 'input',
        })
      ),
      description: z.string().describe(
        cms({
          name: 'Description',
          info: 'A short description of the trip or event',
          view: 'textarea',
        })
      ),
      date: z.date().describe(
        cms({
          name: 'Date',
          info: 'The date of the trip or event',
          view: 'date',
        })
      ),
      time: z.boolean().describe(
        cms({
          name: 'Show time',
          info: 'Whether to display the time of the trip or event',
          view: 'switch',
        })
      ),
      image: z.string().describe(
        cms({
          name: 'Feautured image',
          info: 'The image to display for the trip or event',
          view: 'image',
        })
      ),
    })
    .describe(
      cms({
        name: 'Trips + Events',
        info: 'Upcoming trips and events such as hikes, meetings, workshops, etc.',
      })
    ),
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

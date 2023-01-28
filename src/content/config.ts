import { z, defineCollection } from 'astro:content';

type ThumbnailCategory = {
  view: 'image' | 'title' | 'description' | 'price'; // TODO: add more views
  field: string;
};
type CMSConfig = {
  name: string;
  info?: string;
  view?: 'input' | 'date' | 'checkbox' | 'switch' | 'textarea' | 'markdown' | 'image' | 'youtube';
  thumbnail?: ThumbnailCategory[];
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
        thumbnail: [
          {
            view: 'image',
            field: 'image',
          },
          {
            view: 'title',
            field: 'title',
          },
          {
            view: 'description',
            field: 'description',
          },
        ],
      })
    ),
});
const gearCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
    })
    .describe(
      cms({
        name: 'Gear Room',
        info: 'An overview of the gear we have in the gear room',
        thumbnail: [
          {
            view: 'image',
            field: 'image',
          },
          {
            view: 'title',
            field: 'title',
          },
          {
            view: 'description',
            field: 'description',
          },
        ],
      })
    ),
});
const merchCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      price: z.number(),
      image: z.string(),
    })
    .describe(
      cms({
        name: 'Merch',
        info: 'Merchandise for sale',
        thumbnail: [
          {
            view: 'image',
            field: 'image',
          },
          {
            view: 'title',
            field: 'title',
          },
          {
            view: 'price',
            field: 'price',
          },
        ],
      })
    ),
});
const galleryCollection = defineCollection({
  schema: z
    .object({
      caption: z.string(),
      image: z.string(),
      date: z.date(),
      photographer: z.string(),
    })
    .describe(
      cms({
        name: 'Photo Gallery',
        info: 'Photos from our trips and events',
        thumbnail: [
          {
            view: 'image',
            field: 'image',
          },
          {
            view: 'title',
            field: 'caption',
          },
          {
            view: 'description',
            field: 'photographer',
          },
        ],
      })
    ),
});
const resourcesCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      thumbnail: z.string(),
    })
    .describe(
      cms({
        name: 'Resources',
        info: 'Useful information and articles',
        thumbnail: [
          {
            view: 'image',
            field: 'thumbnail',
          },
          {
            view: 'title',
            field: 'title',
          },
          {
            view: 'description',
            field: 'description',
          },
        ],
      })
    ),
});

// prettier-ignore
export const collections = {
  'trips': tripsCollection,
  'gear': gearCollection,
  'merch': merchCollection,
  'gallery': galleryCollection,
  'resources': resourcesCollection,
};

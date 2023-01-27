import { useParams } from '@solidjs/router';
import { collections } from '@content/config';
import type { ZodObject } from 'astro/zod';
import { parseSchemaDescription } from '../lib/description';
import { createComputed } from 'solid-js';
import { IconFilePlus, IconPlus, IconSquareRoundedPlus } from '@tabler/icons-solidjs';

export default function Collection() {
  const params = useParams();

  interface Collection {
    schema: ZodObject<any>;
  }

  const annotation = () => {
    const collection: Collection = Object(collections)[params.collectionId];
    return parseSchemaDescription(collection.schema);
  };

  return (
    <section>
      <div class="flex justify-between items-center">
        <div class="grid gap-3">
          <h1 class="text-2xl font-bold capitalize">{annotation().name || params.collectionId}</h1>
          <p class="text-sm text-gray-500">{annotation().info}</p>
        </div>
        <div class="grid grid-flow-col items-center gap-3">
          <button class="flex items-center justify-center w-full rounded-md border border-slate-300 shadow-sm px-4 py-2 gap-2 bg-white text-sm font-medium text-slate-600 hover:bg-slate-100 active:bg-slate-200">
            <IconFilePlus class="w-5 h-5" />
            New Page
          </button>
          <button class="rounded-md bg-blue-600 hover:bg-blue-500 transition-colors active:bg-blue-400 text-white text-sm py-2 px-4 gap-2 flex items-center justify-center relative disabled:bg-blue-400">
            <IconPlus class="w-5 h-5" />
            New Entry
          </button>
        </div>
      </div>
    </section>
  );
}

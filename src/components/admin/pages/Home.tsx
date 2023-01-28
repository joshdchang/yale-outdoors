import { collections } from '@content/config';
import { A } from '@solidjs/router';
import { IconFolder } from '@tabler/icons-solidjs';
import { For } from 'solid-js';
import { parseSchemaDescription } from '../lib/description';

export default function Home() {
  return (
    <div class="grid gap-10">
      <h2 class="text-2xl font-bold">Collections</h2>
      <div class="grid gap-6 xl:grid-cols-2">
        <For each={Object.entries(collections)}>
          {([collectionId, collection]) => (
            <div class="grid grid-flow-col justify-between gap-6 bg-white shadow rounded-xl p-8 items-center">
              <div class="grid grid-flow-col gap-6 items-center">
                <IconFolder class="text-blue-600 w-10 h-10" />
                <div class="grid gap-2">
                  <h3 class="text-lg font-bold">{parseSchemaDescription(collection.schema).name}</h3>
                  <p class="text-sm text-gray-500">{parseSchemaDescription(collection.schema).info}</p>
                </div>
              </div>
              <A href={`/collection/${collectionId}`} class="bg-blue-600 hover:bg-blue-500 transition-colors active:bg-blue-400 text-white text-sm py-2 px-4 gap-2 flex items-center justify-center relative disabled:bg-blue-400 rounded-md">
                View
              </A>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

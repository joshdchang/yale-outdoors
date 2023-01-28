import { A, useParams } from '@solidjs/router';
import { collections } from '@content/config';
import { parseSchemaDescription } from '../lib/description';
import { IconChevronRight, IconPencil, IconPlus, IconTrash } from '@tabler/icons-solidjs';
import { useFirestore } from 'solid-firebase';
import { db } from '../firebase';
import { collection, DocumentData } from 'firebase/firestore';
import { createEffect, createMemo, createSignal, For, Match, Show, Switch } from 'solid-js';

export default function Collection() {
  const params = useParams();

  const annotation = createMemo(() => parseSchemaDescription(Object(collections)[params.collectionId].schema));
  const name = () => annotation()?.name || params.collectionId;

  const [entries, setEntries] = createSignal([] as DocumentData[] | undefined);
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    setLoading(true);
    const newEntries = useFirestore(collection(db, 'content', 'collections', params.collectionId));
    createEffect(() => {
      setEntries(newEntries.data);
      setLoading(newEntries.loading);
    });
  });

  return (
    <section class="flex flex-col gap-10">
      <div class="flex justify-between items-center">
        <div class="grid gap-3">
          <div class="flex gap-4 items-center">
            <A href="/" class="text-sm text-slate-500 hover:text-slate-700">
              Content
            </A>
            <IconChevronRight class="text-slate-400 w-4 h-4" />
            <A href={`/collection/${params.collectionId}`} class="text-sm text-slate-500 hover:text-slate-700 capitalize">
              {name()}
            </A>
          </div>
          <h1 class="text-2xl font-bold capitalize">{name()}</h1>
          <Show when={annotation().info}>
            <p class="text text-gray-500">{annotation().info}</p>
          </Show>
        </div>
        <div class="grid grid-flow-col items-center gap-3">
          <button class="rounded-md bg-blue-600 hover:bg-blue-500 transition-colors active:bg-blue-400 text-white text-sm py-2 px-4 gap-2 flex items-center justify-center relative disabled:bg-blue-400">
            <IconPlus class="w-5 h-5" />
            New
          </button>
        </div>
      </div>
      <Show
        when={!loading()}
        fallback={
          <div class="flex py-24 items-center justify-center">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-r-2 border-blue-500"></div>
          </div>
        }
      >
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <For
            each={entries()}
            fallback={() => (
              <div class="p-20 border-dashed border-slate-300 border-2 rounded-xl justify-center grid gap-6 text-slate-400">
                No entries yet
                <button class="rounded-md bg-blue-600 hover:bg-blue-500 transition-colors active:bg-blue-400 text-white text-sm py-2 px-4 gap-2 flex items-center justify-center relative disabled:bg-blue-400">
                  <IconPlus class="w-5 h-5" />
                  New
                </button>
              </div>
            )}
          >
            {(entry) => (
              <div class="bg-white shadow p-8 rounded-xl flex flex-col h-full justify-between gap-8">
                <div class="grid gap-3">
                  <For each={annotation().thumbnail || []}>
                    {(item) => (
                      <Switch fallback={() => <p class="text-sm font-medium text-slate-700">{entry[item.field]}</p>}>
                        <Match when={item.view === 'image'}>
                          <img src={`/_image?w=500&h=300&href=${entry[item.field]}`} loading="lazy" class="rounded-lg border border-slate-300 mb-2" width="500" height="300" />
                        </Match>
                        <Match when={item.view === 'title'}>
                          <h2 class="text-lg font-medium text-slate-700">{entry[item.field]}</h2>
                        </Match>
                        <Match when={item.view === 'description'}>
                          <p class="text-sm text-slate-500">{entry[item.field]}</p>
                        </Match>
                        <Match when={item.view === 'price'}>
                          <p class="text-emerald-600">${entry[item.field]}</p>
                        </Match>
                      </Switch>
                    )}
                  </For>
                </div>
                <div class="flex gap-3">
                  <A
                    href={`/collection/${params.collectionId}/${entry.id}`}
                    class="flex-grow rounded-md bg-blue-600 hover:bg-blue-500 transition-colors active:bg-blue-400 text-white text-sm py-2 px-4 gap-2 flex items-center justify-center relative disabled:bg-blue-400"
                  >
                    <IconPencil class="w-5 h-5" />
                    Edit
                  </A>
                  <button class="rounded-md px-3 py-2 border shadow-sm transition-colors text-red-600 bg-red-50 border-red-300 hover:border-red-400 hover:bg-red-100 active:bg-red-200">
                    <IconTrash class="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </section>
  );
}

import { A } from '@solidjs/router';
import { IconCommand, IconEdit, IconFolder, IconLayoutDashboard, IconPhoto, IconSearch, IconSettings } from '@tabler/icons-solidjs';
import { collections } from '@content/config';
import { For } from 'solid-js';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { parseSchemaDescription } from '../lib/description';

export default function Sidebar(props: { children: any }) {
  return (
    <div class="flex">
      <div class="flex-none flex flex-col h-screen w-80 text-sm justify-between bg-white shadow overflow-scroll relative">
        <div>
          <div class="sticky top-0 pointer-events-none">
            <div class="flex items-center gap-3 p-9 bg-white pointer-events-auto">
              <div class="p-1.5 rounded-lg border border-slate-300 shadow">
                <IconEdit class="w-5 h-5 text-blue-500" />
              </div>
              <h1 class="font-bold text-xl tracking-tight text-slate-900">Yale Outdoors</h1>
            </div>
            <div class="bg-white px-9">
              <A
                href="/search"
                activeClass="bg-sky-50 border-blue-300 text-blue-500"
                inactiveClass="text-slate-400 hover:border-slate-400 hover:text-slate-500 active:border-slate-500 border-slate-300"
                class="pointer-events-auto px-3 py-2 rounded-md border shadow-sm transition-all outline-none appearance-none flex content-start justify-between items-center"
              >
                <span class="flex gap-3.5 items-center">
                  <IconSearch class="w-5 h-5" />
                  Search...
                </span>
                <span class="flex items-center text-xs">
                  <IconCommand class="w-3 h-3" />K
                </span>
              </A>
            </div>
            <div class="h-9 bg-gradient-to-b from-white"></div>
          </div>
          <div class="grid gap-9 px-9">
            <ul class="grid gap-3 items-start">
              <li>
                <A href="/" end activeClass="text-blue-600" inactiveClass="text-slate-600 hover:text-black" class="group flex gap-4 rounded-md font-medium transition-colors items-center">
                  <div class="p-1.5 rounded-lg border border-slate-300 shadow-sm transition-all group-hover:border-slate-400 group-hover:shadow group-aria-[current]:border-blue-600 group-aria-[current]:bg-blue-600">
                    <IconLayoutDashboard class="w-5 h-5 text-slate-500 group-hover:text-slate-600 transition-colors group-aria-[current]:text-white" />
                  </div>
                  Dashboard
                </A>
              </li>
              <li>
                <A href="/media" activeClass="text-blue-600" inactiveClass="text-slate-600 hover:text-black" class="group flex gap-4 rounded-md font-medium transition-colors items-center">
                  <div class="p-1.5 rounded-lg border border-slate-300 shadow-sm transition-all group-hover:border-slate-400 group-hover:shadow group-aria-[current]:border-blue-600 group-aria-[current]:bg-blue-600">
                    <IconPhoto class="w-5 h-5 text-slate-500 group-hover:text-slate-600 transition-colors group-aria-[current]:text-white" />
                  </div>
                  Media
                </A>
              </li>
              <li>
                <A href="/settings" activeClass="text-blue-600" inactiveClass="text-slate-600 hover:text-black" class="group flex gap-4 rounded-md font-medium transition-colors items-center">
                  <div class="p-1.5 rounded-lg border border-slate-300 shadow-sm transition-all group-hover:border-slate-400 group-hover:shadow group-aria-[current]:border-blue-600 group-aria-[current]:bg-blue-600">
                    <IconSettings class="w-5 h-5 text-slate-500 group-hover:text-slate-600 transition-colors group-aria-[current]:text-white" />
                  </div>
                  Settings
                </A>
              </li>
            </ul>
            <div class="grid gap-4">
              <h2 class="text-slate-800 font-semibold">Content</h2>
              <ul class="grid gap-3 overflow-scroll">
                {/* <li class="flex">
                  <A
                    href={`/single/home`}
                    activeClass="text-blue-500 font-semibold border-blue-300 bg-sky-50 shadow-sky-100 active:bg-sky-100"
                    inactiveClass="text-slate-500 border-slate-300 active:bg-slate-200 hover:bg-slate-100"
                    class="pl-3 pr-2 py-2 rounded-lg border shadow-sm capitalize w-full flex justify-between group items-center transition-all"
                  >
                    <span class="flex gap-3">
                      <IconFileText class="w-5 h-5 text-slate-400 transition-colors group-aria-[current]:text-blue-500" />
                      Home
                    </span>
                  </A>
                </li> */}
                <For each={Object.entries(collections)}>
                  {([key, value]) => (
                    <li class="flex">
                      <A
                        href={`/collection/${key}`}
                        activeClass="text-white border-blue-600 bg-blue-600 shadow-sky-100 active:bg-blue-500"
                        inactiveClass="text-slate-600 border-slate-300 active:bg-slate-200 hover:bg-slate-100"
                        class="px-3 py-2 rounded-md border shadow-sm capitalize w-full justify-between group items-center transition-all flex"
                      >
                        <span class="flex gap-3">
                          <IconFolder class="w-5 h-5 text-slate-500 transition-colors group-aria-[current]:text-white" />
                          {parseSchemaDescription(value.schema)?.name || key}
                        </span>
                        <div class="hidden group-aria-[current]:flex"></div>
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </div>
        <div class="p-9">
          <button onClick={() => signOut(auth)} class="flex gap-3 items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
      <div class="p-16 flex-grow overflow-y-scroll h-screen">{props.children}</div>
    </div>
  );
}

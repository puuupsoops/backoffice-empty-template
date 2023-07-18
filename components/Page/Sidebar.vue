<script setup lang="ts">
import { onMounted } from 'vue'
import { Collapse } from 'flowbite'
import type { CollapseOptions } from 'flowbite'
import { useUiStore } from '~/store/ui'
import { storeToRefs } from 'pinia'
import {
    svgDashboard,
    svgKanban,
    svgInbox,
    svgChat,
    svgUsers,
    svgPages,
    svgBookOpen,
    svgProducts,
    svgSign_in,
    svgDocumentCheck,
} from '~/utils/svg'

const uiStore = useUiStore();
const { isSidebarExpanded } = storeToRefs(uiStore);


onMounted(() => {
    menuSidebarLinks.forEach( link => {
        if (link.children) {
            const $triggerEl = document.getElementById('sidebar-link-' + link.id);
            const $targetEl = document.getElementById('sidebar-sub-link-' + link.id);
            if ($targetEl) {
                new Collapse($targetEl, $triggerEl);
            }
        }

    })

})
const openedSubLink = ref<string[]>([]);
interface  IMenuSidebarLinks {
    id: string;
    title: string;
    link: string;
    svg: any;
    tip?: string
    children?: [{title: string; link: string; tip?: string}]
};
const menuSidebarLinks = <IMenuSidebarLinks[]>[
    { id: 'dashboard', title: 'pages.sidebar.dashboard', link: '/', svg: svgDashboard},
    { id: 'kanban', title: 'pages.sidebar.kanban', link: '/kanban', svg: svgKanban},
    { id: 'company', title: 'pages.sidebar.company.company', link: '/', svg: svgPages, children:[
            { title: 'pages.sidebar.company.structure', link: '/'},
            { title: 'pages.sidebar.company.presentation', link: '/'},
            { title: 'pages.sidebar.company.newspaper', link: '/news'},
            { title: 'pages.sidebar.company.photo', link: '/gallery'},
            { title: 'pages.sidebar.company.orders', link: '/'},
            { title: 'pages.sidebar.company.requisite', link: '/documents'},
        ]},
    //{ id: 'diary', title: 'Фотогалерея', link: '/gallery', svg: svgBookOpen},
    { id: 'chat', title: 'pages.sidebar.chat', link: '/chat', svg: svgChat},
    { id: 'checklist', title: 'pages.sidebar.checklist', link: '/', svg: svgDocumentCheck},
    { id: 'complaints_book', title: 'pages.sidebar.complaints_book', link: '/complaints', svg: svgUsers},
];
</script>

<template>

<aside class="h-full top-0 left-0 z-40 pt-2
            bg-gray-50 border-r border-gray-200 sm:translate-x-0 bg-gray-50 dark:bg-gray-800 dark:border-gray-700
            transition-all duration-300 ease-in-out"
     :class="isSidebarExpanded ? 'w-64' : 'w-16'"
>
    <div class="px-3 pb-4 overflow-hidden">
        <template
                v-for="(link, key) in menuSidebarLinks"
                :key="key"
        >
          <nuxt-link :to="link.link"
             :id="'sidebar-link-' + link.id"
             :data-tooltip-target="'sidebar-tooltip-' + link.id"
             data-tooltip-placement="right"
             class="flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <component
                      :is="link.svg"
                      class="w-6 h-6 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
              >
              </component>
              <div :id="'sidebar-tooltip-' + link.id" role="tooltip"
                   class="absolute z-10 whitespace-nowrap invisible inline-block px-3 py-2 text-sm font-medium text-white
                          transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                   :class="{ 'hidden': isSidebarExpanded }"
              >
                  {{ $t(link.title) }}
                  <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            <span class="ml-5 flex-1 whitespace-nowrap duration-300 ease-in-out origin-center hover:origin-top"
                  :class="{'skew-y-2': !isSidebarExpanded}"
            >
                {{ $t(link.title) }}
            </span>
            <svg v-if="link.children" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </nuxt-link>
            <ul v-if="link.children" :id="'sidebar-sub-link-' + link.id"
                class="hidden py-2 space-y-2"
                :class="{ 'collapse': !isSidebarExpanded }"
            >
                <li v-for="(subLink, subLinkKey) in link.children" :key="subLinkKey">
                    <nuxt-link :to="subLink.link" class="flex items-center w-full p-2 text-base font-normal text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        {{ $t(subLink.title) }}</nuxt-link>
                </li>
            </ul>
        </template>

    </div>
</aside>


</template>
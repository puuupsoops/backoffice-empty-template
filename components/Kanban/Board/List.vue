<script setup lang="ts">
import { MagnifyingGlassIcon, StarIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'
import svgSettings from '@/assets/img/icon/settings.svg';
import {PropType} from "@vue/runtime-core";
import {Board} from "~/dto/task";
import {useChatStore} from "~/store/chat";
import {storeToRefs} from "pinia";

const props = defineProps({
    boards: Object as PropType<Board[] | null>
});
const chatStore = useChatStore();
const { userSelf } = storeToRefs(chatStore);
</script>

<template>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th scope="col" class="px-6 py-3 ">{{ $t('kanban.boardTable.name') }}</th>
                    <th scope="col" class="px-6 py-3">ID</th>
                    <th scope="col" class="px-6 py-3">{{ $t('kanban.boardTable.owner') }}</th>
                    <th scope="col" class="px-6 py-3">{{ $t('common.users') }}</th>
                    <th scope="col" class="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(board, key) in boards" :key="key"
                class="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                :class="{'border-b': key !== boards.length-1}"
            >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <router-link :to="`/kanban/${board.id}`">{{ board.title }}</router-link>
                </th>
                <td class="px-6 py-4">
                    <router-link :to="`/kanban/${board.id}`">{{ board.id }}</router-link>
                </td>
                <td class="px-6 py-4">
                    {{ userSelf.user.id == board.owner.id ? 'Вы' : `${board.owner.surname} ${board.owner.name}`}}
                </td>
                <td class="px-6 py-4 w-1/2">
                    <div class="inline-flex flex-wrap">
                        <span v-for="user in board.users"
                              :key="user.id"
                              class="inline-flex items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900
                                         bg-white rounded-full border border-gray-200 hover:bg-gray-100
                                         hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400
                                         dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <img v-if="user.avatar" class="rounded-full items-start flex-shrink-0 mr-3" :src="user.avatar" width="32" height="32" />
                            <img v-else class="rounded-full items-start flex-shrink-0 mr-3" src="@/assets/img/user.png" width="32" height="32" />
                              {{ `${user.surname} ${user.name}`}}
<!--                              <button type="button" class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm"-->
<!--                                      @click="removeUser(user.id)"-->
<!--                              >-->
<!--                                  <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg><span class="sr-only">Remove badge</span>-->
<!--                              </button>-->
                            </span>
                    </div>
                </td>

                <td class="px-6 py-4">
                    <div class="flex gap-4  ">

<!--                        <div data-tooltip-target="tooltip-favorites"-->
<!--                             @click="board.favorites = ! board.favorites"-->
<!--                        >-->
<!--                            <div id="tooltip-favorites" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-1 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">-->
<!--                                {{ $t('common.favorites') }}-->
<!--                                <div class="tooltip-arrow" data-popper-arrow></div>-->
<!--                            </div>-->
<!--                            <StarIcon class="w-5 h-5 stroke-gray-400 cursor-pointer hover:fill-current"-->
<!--                                      :class="{ 'fill-none': !board.favorites,-->
<!--                                                'fill-current': board.favorites}"-->
<!--                            />-->
<!--                        </div>-->
                        <div data-tooltip-target="tooltip-setting">
                            <div id="tooltip-setting" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-1 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                {{ $t('common.settings') }}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <svgSettings class="w-5 h-5 fill-current  cursor-pointer "/>
                        </div>
                    </div>
                </td>
            </tr>
            <tr v-for="i in [1, 2, 3, 4, 5]" :key="i" v-if="!boards">
                <td colspan="5">
                    <common-loader-skeleton list />
                </td>

            </tr>
            </tbody>
        </table>

    </div>

</template>

<style scoped>

</style>
<script lang="ts" setup>

import {PlusIcon, XMarkIcon, CheckIcon} from "@heroicons/vue/24/solid";

const checkList = ref([]);
const isEdit = ref(-1);
const editRef = ref();
onClickOutside(editRef, () => {
    isEdit.value = -1
});
</script>

<template>
    <div class="max-w-sm m-2 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" ref="editRef">
        <div class="cursor-pointer w-full font-base font-bold text-sm rounded-lg tracking-tight text-gray-900 dark:text-white">{{$t('kanban.task.checkList')}}</div>
        <div v-for="(check, key) in checkList" :key="key">
            <div class="flex  items-center my-1 w-full">
                <input :id="'checkbox-'+key" type="checkbox" value="" class=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label @click="isEdit = key"
                       v-if="key != isEdit"
                       class="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 rounded-lg
                              border border-transparent hover:ring-blue-500 hover:border-blue-500 dark:hover:ring-blue-500 dark:hover:border-blue-500"
                >{{check}}</label>
                <div v-else class="flex items-center gap-1">
                    <div class="relative">
                        <input v-model="checkList[key]" type="text" autofocus
                               class="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                      focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500
                                      block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder=" " />
                        <button
                                class="absolute top-0 right-2 p-1 text-sm font-medium text-white bg-blue-700 rounded-r-lg
                                   border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                            <CheckIcon class="cursor-pointer w-5 h-5" @click="isEdit=-1"/>
                        </button>
                    </div>
                    <XMarkIcon class="cursor-pointer  w-5 h-5 " @click="isEdit=-1; checkList.splice(key, 1)"/>
                </div>


            </div>
        </div>

        <div class="flex items-center p-2 cursor-pointer text-xs" @click="checkList.push('Новый ' + checkList.length)"> <plus-icon class=" h-4 w-4 cursor-pointer"/> {{$t('common.add')}}</div>
    </div>

</template>
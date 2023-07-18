<script setup lang="ts">
import {PlusIcon } from "@heroicons/vue/24/solid";
import userPng from "assets/img/user.png";
import _ from "lodash";
import {PropType} from "@vue/runtime-core";
import {Task} from "~/dto/task";
import {User} from "~/dto/chat";
import {useApi} from "~/helpers";
import {useChatStore} from "~/store/chat";

const props = defineProps({
    task:  { type: Object as PropType<Task>,      required: true },
    users: { type: Object as PropType<User[]|null>, required: true }
});
const taskLocal = toRef(props, 'task');

const { getUserById } = useChatStore();
const addObservers = (userId: number) => {
    if (taskLocal.value.observers && taskLocal.value.observers.findIndex(user => user.id === userId) !== -1) {
        taskLocal.value.observers = taskLocal.value.observers.filter( user => user.id !== userId)
    } else {
        const {fetchData: addObserver} = useApi(`/tasks/task/${taskLocal.value.id}/add/observer`);
        addObserver({method: 'post', params: {value: userId}});
        if (taskLocal.value.observers == null) taskLocal.value.observers = [];
        taskLocal.value.observers.push(getUserById(userId).user)
    }
}
const addAll = () => {
    taskLocal.value.observers = _.cloneDeep(props.users)
}
</script>

<template>
    <div class="flex items-center relative min-w-[10rem] justify-end" id="observers">
        <div  v-if="taskLocal.observers && users">
            <span class="absolute right-0 -top-4 text-xs text-gray-500 dark:text-gray-400">{{ $t('kanban.task.observers') }}</span>
            <div v-if="taskLocal.observers.length >= users.length"
                 class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
            >{{$t('common.all')}}</div>
            <div v-else class="flex" :class="{'-space-x-4': task.observers?.length>1}">
                <div  v-for="observer in taskLocal.observers?.slice(0, 3)" :key="observer.id">
                    <common-tooltip>
                        <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" :src="observer.avatar ? observer.avatar : userPng" alt="" >
                        <template #tooltip> {{ `${observer.surname} ${observer.name}`  }}</template>
                    </common-tooltip>
                </div>
                <div v-if="task.observers && task.observers.length>3"
                   class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                >{{task.observers?.length}}</div>
            </div>
        </div>

        <common-dropdown :close-by-click="false" :skidding="-100" v-if="users">
            <plus-icon class=" h-6 w-6 cursor-pointer"/>
            <template #dropdown>
                <div class="max-w-lg w-[32rem] p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex justify-between items-center">
                        <div class="text-xl p-2 font-medium text-gray-900 dark:text-white">{{$t('kanban.addObservers')}}</div>
                        <common-button alternative @click="addAll">{{$t('common.all')}}</common-button>
                    </div>

                    <div v-for="user in users"
                         :key="user.id"
                         @click="addObservers(user.id)"
                         class=" cursor-pointer inline-flex items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900
                                  bg-white rounded-full border border-gray-200 hover:bg-gray-100
                                  hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400
                                  dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                         :class="{ 'bg-blue-100 dark:bg-blue-700 dark:hover:bg-blue-900': taskLocal.observers && taskLocal.observers.findIndex(u => u.id == user.id) !== -1 }"
                    >
                        <img class="rounded-full items-start flex-shrink-0 mr-3 h-6 w-6" :src="user.avatar ? user.avatar: userPng" alt="" />
                        <div>{{ `${user.surname} ${user.name}`}}</div>
                    </div>

                </div>
            </template>

        </common-dropdown>

    </div>
</template>
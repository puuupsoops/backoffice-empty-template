<script setup lang="ts">
import _ from "lodash";
import {Task, TaskCreateRequest} from "~/dto/task";
import {EllipsisVerticalIcon, CheckIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { ChatBubbleBottomCenterTextIcon, DocumentCheckIcon, ClockIcon } from "@heroicons/vue/24/outline";
import {useApi, timeAgo, formatDate} from "~/helpers";
import {useChatStore} from "~/store/chat";
import {User} from "~/dto/chat";
import {Dropdown, initDropdowns} from "flowbite";

const chatStore = useChatStore();

const props = defineProps({
    task: {
        type: Object as PropType<Task>,
        required: true
    },
    users: {
        type: Object as PropType<User|null>,
        required: true
    }
})

const { task } = toRefs(props)
const taskLocal = ref(_.cloneDeep(props.task))
const isTitleEdit = ref(false);
const titleRef = ref();
const isDescriptionEdit = ref(false);
const descriptionRef = ref();

const { fetchData: updateTitle} = useApi(`/tasks/task/${taskLocal.value.id}/update/title`);
const { fetchData: updateDescription} = useApi(`/tasks/task/${taskLocal.value.id}/update/description`);

onClickOutside(titleRef, () => {
    if (isTitleEdit.value){
        taskLocal.value.title = props.task.title;
        isTitleEdit.value = false;
    }
});

onClickOutside(descriptionRef, () => {
    if (isDescriptionEdit.value){
        taskLocal.value.description = props.task.description;
        isDescriptionEdit.value = false;
    }
});
const updTitle = () => {
    updateTitle({ method: 'post', params: { value: taskLocal.value.title } });
    task.value.title = taskLocal.value.title;
    isTitleEdit.value = !isTitleEdit.value;
}
const updDescription = () => {
    updateDescription({ method: 'post', params: { value: taskLocal.value.description } });
    task.value.description = taskLocal.value.description;
    isDescriptionEdit.value = !isDescriptionEdit.value;
}
const dropdownMenu = ref();
onMounted(() => {
    initDropdowns()}
)


const isShowCheckList = ref(false)

const isShowComment = ref(false);
</script>

<template>
    <div class="block w-full p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
        <div class="mb-2 flex justify-between content-center">
            <div v-if="isTitleEdit" class="relative w-full" ref="titleRef">
                <input
                   type="text" id="title"
                   v-model="taskLocal.title"
                   @keyup.enter="updTitle"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                          focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500
                          block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                   :class="{'pr-11': task.title != taskLocal.title}"
                   :placeholder="$t('kanban.insertTitle')" required>
                <button @click="updTitle" v-if="task.title != taskLocal.title"
                        class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg
                               border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <CheckIcon class="w-5 h-5"/>
                </button>
            </div>
            <div v-else
                 @click="isTitleEdit = !isTitleEdit"
                 class="cursor-pointer pt-2 pl-2 w-full font-base font-bold text-sm rounded-lg tracking-tight text-gray-900 dark:text-white
                        border border-transparent hover:ring-blue-500 hover:border-blue-500 dark:hover:ring-blue-500 dark:hover:border-blue-500"
            >{{taskLocal.title}}</div>
            <common-dropdown :close-by-click="false">
                <button class="text-gray-500 p-2 focus:outline-none rounded-lg text-sm dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ">
                    <ellipsis-vertical-icon class="h-6 w-6 cursor-pointer"/>
                </button>
                <template #dropdown>
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li class="px-4 py-1 text-xs text-gray-700 dark:text-gray-400">
                            <div class="font-medium truncate">{{$t('kanban.task.addToTask')}}</div>
                        </li>
                        <li>
                            <div class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <input type="checkbox" v-model="isShowCheckList" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                <label class="pl-2 cursor-pointer" @click="isShowCheckList=!isShowCheckList">{{$t('kanban.task.checkList')}}</label>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <input type="checkbox" v-model="isShowComment" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                <label class="pl-2 cursor-pointer" @click="isShowComment=!isShowComment">{{$t('common.comment')}}</label>
                            </div>
                        </li>
                    </ul>
                    <div class="py-2">
                        <a href="#" class="block px-10 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{{$t('common.delete')}}</a>
                    </div>
                </template>
            </common-dropdown>

        </div>

        <common-edit-box v-if="isDescriptionEdit" ref="descriptionRef"
                         v-model="taskLocal.description"
                         :placeholder="$t('kanban.addTaskDescription')"
                         :button-title=" $t('common.save')"
                         :row-count="5"
                         @add="updDescription"
        />
        <p v-else
           @click="isDescriptionEdit = !isDescriptionEdit"
           class="cursor-pointer px-2 pl-2 text-ellipsis overflow-hidden font-base text-gray-700 dark:text-gray-400 rounded-lg
                  border border-transparent hover:ring-blue-500 hover:border-blue-500 dark:hover:ring-blue-500 dark:hover:border-blue-500"
        >{{taskLocal.description}}</p>

        <div class="pt-4 flex justify-between h-14">
            <common-tooltip>
                <div class="h-6 bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center p-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                    <ClockIcon class="w-3 h-3 mr-1"/>
                    <div>{{ timeAgo(task.create_at) }}</div>
                </div>
                <template #tooltip>{{ $t('common.created')}} {{ formatDate(task.create_at) }}</template>
            </common-tooltip>

            <common-tooltip>
                <div class="relative">
                    <ChatBubbleBottomCenterTextIcon @click="isShowComment = !isShowComment" class=" h-5 w-5 cursor-pointer" :class="{ 'opacity-50': !isShowComment}"/>
                    <span class="absolute top-3 -right-2 inline-flex items-center justify-center w-4 h-4 ml-2 text-gray-800 dark:text-gray-400 text-xs font-medium ">
                        {{task.comments !== null ? task.comments.length : ''}}
                    </span>
                </div>
                <template #tooltip>{{ $t('common.comment')}}</template>
            </common-tooltip>

            <common-tooltip class="ml-2 mr-auto">
                <DocumentCheckIcon @click="isShowCheckList = !isShowCheckList" class=" h-5 w-5 cursor-pointer" :class="{ 'opacity-50': !isShowCheckList}"/>
                <template #tooltip>{{$t('kanban.task.checkList')}}</template>
            </common-tooltip>

            <kanban-task-observers :task="task" :users="users"/>

        </div>

        <kanban-task-to-do v-if="isShowCheckList"/>
        <kanban-task-comments v-if="isShowComment" :task="task"/>
    </div>

</template>
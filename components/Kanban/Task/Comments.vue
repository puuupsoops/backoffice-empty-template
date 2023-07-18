<script setup lang="ts">
import { PaperClipIcon } from "@heroicons/vue/24/outline";
import {PropType} from "@vue/runtime-core";
import {Task, TaskComment} from "~/dto/task";
import {formatDate, useApi} from "~/helpers";
import userPng from '@/assets/img/user.png';
import {useChatStore} from "~/store/chat";
const { userSelf } = useChatStore();

const props = defineProps({
    task: { type: Object as PropType<Task>, required: true }
});
const taskLocal = toRef(props, 'task');
const { fetchData: addCommentToTask} = useApi(`/tasks/task/${props.task.id}/add/comment`);

const commentText = ref('');
const addComment = () => {
    if (commentText.value !== ''){
        addCommentToTask({ method: 'post', params: { value: commentText.value } })
        const comment: TaskComment = {
            text: commentText.value,
            user: userSelf?.user!,
            idx: 0,
            timestamp: ~~((new Date().getTime())/1000)
        };
        if (taskLocal.value.comments === null) {
            taskLocal.value.comments = [];
        }
        taskLocal.value.comments.push(comment)
        commentText.value = '';
    }
}
</script>

<template>
    <div class="flex flex-col gap-2 max-w-sm m-2 bg-white dark:bg-gray-800 dark:border-gray-700" ref="editRef">
        <div class="cursor-pointer w-full font-base font-bold text-sm rounded-lg tracking-tight text-gray-900 dark:text-white">{{$t('common.comment')}}</div>
        <div v-if="taskLocal.comments == null || taskLocal.comments.length ===0" class="p-4 text-xs italic">{{ $t('kanban.task.noComments')}}...</div>
        <div v-else>
            <div class="flex w-full mt-2 gap-4" v-for="comment in taskLocal.comments" :key="comment.idx">
                <div class="flex-shrink-0 h-5 w-5 rounded-full bg-gray-300">
                    <img :src="comment.user.avatar ? comment.user.avatar : userPng " />
                </div>
                <div class="flex-shrink-1 w-full">
                    <div class="dark:bg-gray-700 overflow-hidden dark:text-white p-1 rounded-r-lg rounded-bl-lg break-normal">
                        <p class="text-xs break-all">{{ comment.text }}</p>
                    </div>
                    <div class="text-right mt-1  w-full text-xs dark:text-gray-500 leading-none">{{formatDate(comment.timestamp)}}</div>
                </div>
            </div>
        </div>
<!--edit box-->

        <common-edit-box v-model="commentText" :placeholder="$t('kanban.task.writeComment')+'...'" @add="addComment">
            <template v-slot:buttons>
                <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <PaperClipIcon class="w-5 h-5"/>
                </button>
            </template>
        </common-edit-box>

    </div>


</template>

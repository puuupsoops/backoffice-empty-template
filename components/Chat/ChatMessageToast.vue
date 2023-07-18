<script setup lang="ts">
import { svgMessageNew } from '~/utils/svg'
import { MessageContainer } from "~/dto/chat";
import { formatDate } from "~/helpers";

const props = defineProps({
    message: Object as PropType<MessageContainer>
});
const emits = defineEmits(['update:message'])

</script>

<template>
    <div v-if="message"
         id="toast-notification"
         class="animate-slideIn fixed bottom-10 right-10 w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow-md  dark:bg-gray-800 dark:text-gray-300"
         role="alert"
    >
        <div class="flex items-center mb-3">
            <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{{ $t('chat.newMessage') }}</span>
            <button class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    @click="emits('update:message', undefined)"
            >
                <span class="sr-only">Close</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
        <nuxt-link class="flex items-center "
                   :to="`/chat?to_chat=${message.chat_id}`"
                   @click="emits('update:message', undefined)"
        >
            <div class="relative inline-block shrink-0">
                <img v-if="message.message.from.avatar" class="rw-12 h-12 rounded-full" :src="message.message.from.avatar" />
                <img v-else class="w-12 h-12 rounded-full" src="@/assets/img/user.png" />
                <span class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                    <svgMessageNew class="w-4 h-4 text-white"/>
                </span>
            </div>
            <div class="ml-3 text-sm font-normal">
                <div class="text-sm font-semibold  text-gray-900 dark:text-white">{{ message.message.from.name + ' ' + message.message.from.surname }}</div>
                <div class="text-sm font-normal max-h-[4rem] text-ellipsis overflow-hidden">{{ message.message.message.body }}</div>
                <span class="text-xs font-medium text-blue-600 dark:text-blue-500">{{ formatDate(message.message.date) }}</span>
            </div>
        </nuxt-link>
    </div>
</template>

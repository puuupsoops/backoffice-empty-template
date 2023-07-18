<script setup lang="ts">
import _ from 'lodash'
const { $socket } = useNuxtApp();
import { svgSend } from '~/utils/svg'
import {Chat, Message, MessageWS, UserSelf, WSSend} from "~/dto/chat";
import { useScroll, useElementSize } from '@vueuse/core'
import { useChatStore } from "~/store/chat";
import {storeToRefs} from "pinia";
import {SymbolKind} from "vscode-languageserver-types";
import Array = SymbolKind.Array;

const { getChatMessageByChatId } = useChatStore();
const { chatMessagesCollection, newMessagesCounter } = storeToRefs(useChatStore());
const props = defineProps({
    disabled:{
        type: Boolean,
        default: true
    },
    currentChat: {
        type: Object as PropType<Chat>
    },
    userSelf: {
        type: Object as PropType<UserSelf | null>
    },
});
const emit = defineEmits(['send'])

let offset = 0;
let stopScroll = true;
const sendMessageText = ref('');
const messageLocal = ref<Message[]>([]);
const sendMessage = async () => {
    if (sendMessageText.value !== '' && props.currentChat && props.userSelf) {
        const messageWS = new WSSend<MessageWS>({
            type: 'chat',
            cmd: [
                "add", // добавить
                "message" // сообщение
            ],
            data: new MessageWS({
                chat_id: props.currentChat.id,
                from: props.userSelf.user_id,
                to: props.currentChat.interlocutor.id,
                message: {
                    body: sendMessageText.value,
                    type: 'text'
                }
            })
        });
        await $socket.send(messageWS.toString());
        sendMessageText.value = '';
        loadMsg();
    }
};
const chatMessagesContainer = ref<HTMLElement|null>(null);
const { y } = useScroll(chatMessagesContainer);
const loadMsg = () => {
    nextTick( async () => {
        if (props.currentChat && chatMessagesContainer.value) {
            offset = 0;
            stopScroll = true;
            await getChatMessageByChatId(props.currentChat.id);
            messageLocal.value = [];
            await messageLocal.value.push(...chatMessagesCollection.value ?? []);
            y.value = chatMessagesContainer.value.scrollHeight;
            stopScroll = false;
        }
    });
};

watch(() => props.currentChat, ()=>{
    loadMsg();
})
watch(() => newMessagesCounter.value, ()=>{
    loadMsg();
})
watch(()=>y.value, async ()=>{
    if (y.value == 0 && props.currentChat && !stopScroll) {
        offset = offset + 10;
        const oldHeight = chatMessagesContainer.value?.scrollHeight ?? 0
        await getChatMessageByChatId(props.currentChat.id, offset);
        if (chatMessagesCollection.value.length < 10) {
            stopScroll = true;
        } else {
            messageLocal.value = _.concat(chatMessagesCollection.value ?? [], messageLocal.value);
        }

        await nextTick(() => {
            y.value = (chatMessagesContainer.value?.scrollHeight ?? oldHeight) - oldHeight;
        })
    }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-w-[340px] w-full">
    <div class="flex flex-col flex-grow w-full bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div class="min-h-[56px] font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90
                    backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
            <chat-card v-if="currentChat" :chat="currentChat"/>
        </div>
        <div class="flex flex-col flex-grow h-0 p-4 overflow-auto" ref="chatMessagesContainer" v-if="messageLocal">
            <template v-for="chatMessage in messageLocal">
                <chat-message :msg="chatMessage" :user-self="userSelf"/>
            </template>
        </div>

        <div class="bg-white dark:bg-dark-bg-default p-4">
            <div class="relative hidden md:block">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svgSend class="w-5 h-5 text-gray-500 cursor-pointer"
                             :class="{'text-sky-500': sendMessageText!=''}"
                             @click="sendMessage"
                    />
                </div>
                <input type="text" id="search-navbar"
                       v-model="sendMessageText"
                       :disabled="disabled"
                       v-on:keyup.enter="sendMessage"
                       class="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50
                              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       :placeholder="$t('common.inputPlaceholder')" >
            </div>

        </div>
    </div>
  </div>
</template>
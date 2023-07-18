<script setup lang="ts">
import {Chat, UserSelf} from "~/dto/chat";

const props = defineProps({
    chat: {
        type: Object as PropType<Chat>,
        required: true
    },
    currentChatId: {
        type: Number
    },
    userSelf: {
        type: Object as PropType<UserSelf | null>,
    },
    is_online: {
        type: Boolean,
        default: false
    }
});
const emits =defineEmits(['onClick']);

const user = computed(()=> props.userSelf?.user_id == props.chat?.interlocutor.id ? props.chat?.owner : props.chat?.interlocutor);

</script>

<template>
    <button v-if="user"
        class="w-full text-left py-2 rounded scroll-pt-6 snap-start"
        :class="{ 'bg-gradient-to-r from-cyan-500 to-blue-500': props.chat.id === currentChatId}"
        @click="$emit('onClick', props.chat.id)"
    >
        <div class="flex items-center px-4">
            <img v-if="user.avatar" class="rounded-full items-start flex-shrink-0 mr-3" :src="user.avatar" width="32" height="32" />
            <img v-else class="rounded-full items-start flex-shrink-0 mr-3" src="@/assets/img/user.png" width="32" height="32" />
            <div class="overflow-hidden">
                <h4 class="text-sm font-semibold dark:text-gray-600 text-gray-900 truncate "
                    :class="{
                              'dark:text-white text-gray-900': props.is_online && props.chat.id !== currentChatId,
                              'dark:text-gray-600 text-gray-300': !props.is_online && props.chat.id !== currentChatId,
                              'dark:text-slate-900 text-slate-900': props.chat.id === currentChatId,
                            }"
                >
                    {{`${user.surname} ${user.name}`}}
                </h4>
                <div class="text-[13px] dark:text-gray-600 text-gray-900">{{user.nickname}}</div>
            </div>
        </div>
    </button>
</template>
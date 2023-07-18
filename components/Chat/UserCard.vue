<script setup lang="ts">
import { UserFull } from "~/dto/chat";

const props = defineProps({
    userFull: {
        type: Object as PropType<UserFull>,
        required: true
    },
    currentUserId: {
        type: Number,
    },
});
const emits =defineEmits(['onClick'])
const userAvatar = computed(() => props.userFull.user.avatar ? props.userFull.user.avatar : '@/assets/img/user.png')
</script>

<template>
    <button
            class="w-full text-left py-2 rounded scroll-pt-6 snap-start"
            :class="{ 'bg-gradient-to-r from-cyan-500 to-blue-500': userFull.id === currentUserId }"
            @click="$emit('onClick', userFull.id)"
    >
        <div class="flex items-center px-4">
            <img v-if="props.userFull.user.avatar" class="rounded-full items-start flex-shrink-0 mr-3" :src="props.userFull.user.avatar" width="32" height="32" />
            <img v-else class="rounded-full items-start flex-shrink-0 mr-3" src="@/assets/img/user.png" width="32" height="32" />
            <div>
                <h4 class="text-sm font-semibold "
                    :class="{ 'dark:text-slate-900 text-slate-900': userFull.id === currentUserId,
                              'dark:text-gray-300 text-gray-900': userFull.is_online,
                              'dark:text-gray-600 text-gray-300': !userFull.is_online,
                            }"

                >
                    {{`${userFull.surname} ${userFull.name} ${userFull.patronymic}`}}

                </h4>
                <div class="text-[13px]"
                     :class="{ 'dark:text-slate-900 text-slate-900': userFull.id === currentUserId,
                               'dark:text-gray-300 text-gray-900': userFull.is_online,
                               'dark:text-gray-600 text-gray-300': !userFull.is_online,
                             }"
                >{{userFull.nickname}}</div>
            </div>
        </div>
    </button>
</template>
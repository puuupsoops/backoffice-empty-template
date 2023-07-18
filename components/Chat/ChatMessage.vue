<script setup lang="ts">
import {Message} from "~/dto/chat/message";
import { formatDate } from "~/helpers";
import { IThemeSettingOptions } from "~/utils/theme";
import { UserSelf } from "~/dto/chat";
const themeSetting = useState<IThemeSettingOptions>('theme.setting')

const props = defineProps({
    msg: {
        type: Object as PropType<Message>,
        required: true
    },
    userSelf: {
        type: Object as PropType<UserSelf>
    }
});
</script>

<template>
<!--    Сообщение исходящее-->
    <div class="flex mt-2 gap-4 justify-end" v-if="msg.from.id === userSelf?.user_id">
        <div class="flex-shrink-1">
            <div class="dark:bg-blue-600 overflow-hidden dark:text-white p-3 rounded-l-lg rounded-br-lg "
                :class="{'bg-gradient-to-r from-indigo-300 to-blue-400': themeSetting ==='light'}"
            >
                <p class="text-sm break-all">{{ msg.message.body }}</p>
            </div>
            <div class="mt-1 text-xs text-right dark:text-gray-500 leading-none">{{formatDate(msg.date)}}</div>
        </div>
        <div class="flex-shrink-0 h-10 w-10 rounded-full ">
            <img src="@/assets/img/user.png" />
        </div>
    </div>
<!--    Сообщение входящее-->
    <div class="flex w-full mt-2 gap-4" v-else>
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
            <img src="@/assets/img/user.png" />
        </div>
        <div class="flex-shrink-1">
            <div class="dark:bg-gray-700 overflow-hidden dark:text-white p-3 rounded-r-lg rounded-bl-lg break-normal"
                 :class="{'bg-gradient-to-r from-indigo-100 to-indigo-200 ': themeSetting ==='light'}"
            >
                <p class="text-sm break-all">{{ msg.message.body }}</p>
            </div>
            <div class="mt-1 text-xs dark:text-gray-500 leading-none">{{formatDate(msg.date)}}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import 'overlayscrollbars/overlayscrollbars.css';
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
const { $socket } = useNuxtApp();

import {initTooltips, initDrawers, initModals, initCollapses, initDropdowns} from 'flowbite'
import {ApiResponse} from "~/helpers";

// initialize components based on data attribute selectors
onMounted(() => {
    initTooltips();
    // initDrawers();
    // initModals();
    // initCollapses();
    initDropdowns();
})

AppSetup()
const theme = useState<ITheme>('theme.current')

const app = useAppConfig() as AppConfigInput

useHead({
  title: app.name,
  titleTemplate: '%s - psk.expert',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Nuxt 3 Awesome Starter',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

import { useChatStore } from "~/store/chat";
const { pushMessageToChat, getUserSelf } = useChatStore();
import ChatMessageToast from "~/components/Chat/ChatMessageToast.vue";
import { MessageContainer } from "~/dto/chat";
import {storeToRefs} from "pinia";

const { userSelf } = storeToRefs(useChatStore());

const newMessage = ref<MessageContainer>();

onMounted(() => {
    getUserSelf();
    $socket.onmessage = (event: any) => {
        const message = JSON.parse(event.data);
        if (message.response.update && message.response.update.status == 'create'){
            pushMessageToChat(message.response.update.message.chat_id, message.response.update.message.message );

            if (message.response.update.message.message.to.id == userSelf.value?.user_id) {
                newMessage.value = message.response.update.message;
                setTimeout(()=>{ newMessage.value = undefined }, 10000);
            }
        }
    };
})

</script>

<template>
  <Html :class="`${theme === 'dark' ? 'dark' : ''}`" >
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-bg-color"
    >
      <NuxtLayout>
          <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
          <NuxtPage />
          <chat-message-toast v-model:message="newMessage"/>
      </NuxtLayout>
    </Body>
  </Html>
</template>

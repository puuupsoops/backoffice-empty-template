import _ from 'lodash';
import { ref } from 'vue';
import { defineStore } from 'pinia'
import {useApi} from "~/helpers";
import {Chat, ChatMessages, Message, UserFull, UserSelf} from "~/dto/chat";


export const useChatStore = defineStore('chatStore', () => {
    const chats = ref([]);
    const messages = ref([]);
    const newMessagesCounter = ref(0);

    const { loading: loadingChats, data: chatCollection, fetchData: getChatsList} = useApi<{chats: Chat[]}>('/chats/list');
    const { loading: loadingChat, data: chatMessages, fetchData: getChatMessageByChatId } = useApi<ChatMessages>('/chat/:id');
    const { loading: loadingUsers, data: users, fetchData: getUserCollection } = useApi<{ users: UserFull[] }>('/users/list');
    const { loading: loadingCreateChat, data: createChatResponse, fetchData: createChat } = useApi<Chat>('/chat/create/private/chat');
    const { loading: loadingUserSelf, data: userSelf, fetchData: getUserSelf } = useApi< UserSelf>('user/self');

    return {
        // Чаты
        loadingChats,
        chatCollection: computed(()=> chatCollection.value ? chatCollection.value.chats : []),
        getChatsList,

        // Сообщения в чатах
        loadingChat,
        chatMessagesCollection: computed(() => chatMessages.value ? chatMessages.value.messages : []),
        getNewMessagesCounter: computed(() => newMessagesCounter),
        newMessagesCounter,
        pushMessageToChat: (chatId: number, message: Message) => {
            newMessagesCounter.value = newMessagesCounter.value + 1;
            if (chatId == chatMessages.value?.chat_id && chatMessages.value) {
                chatMessages.value.messages = _.concat(chatMessages.value?.messages, message)
            }
        },
        getChatMessageByChatId: async (chatId: number, offset = 0, limit = 10) => {
            chatMessages.value = null;
            await getChatMessageByChatId({urlParams: {id: chatId}, params: {offset, limit}})
            chatMessages.value!.messages.reverse()
        },

        // Пользователи
        loadingUsers,
        usersCollection: computed(() => users.value ? users.value.users : []),
        getUserCollection,
        getUserById: (id: number) => _.find(users.value?.users, {id}),

        // Инфа о пользователе
        loadingUserSelf,
        userSelf: computed(() => userSelf.value),
        getUserSelf,

        // Создание чата
        loadingCreateChat,
        createChatResponse: computed(()=> createChatResponse.value ? createChatResponse.value.id : 0),
        createChat: async (to: number) => await createChat({method: 'post', params: {to}}),
    }
})
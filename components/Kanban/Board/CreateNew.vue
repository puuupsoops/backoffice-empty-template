<script setup lang="ts">

import {Modal, ModalInterface, ModalOptions} from "flowbite";
import {useChatStore} from "~/store/chat";
import {storeToRefs} from "pinia";
import {User} from "~/dto/chat";
import {useKanbanStore} from "~/store/kanban";

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
        default: false
    }
});
const chatStore = useChatStore();
const { getUserCollection } = chatStore;
const { usersCollection } = storeToRefs(chatStore);

const kanbanStore = useKanbanStore();
const { addBoard } = kanbanStore;
const { loadingBoardCreate } = storeToRefs(kanbanStore);
const emit = defineEmits(['update:show', 'add']);

let modal: ModalInterface|undefined = undefined;
const modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        emit('update:show', false);
    }
}
const modalElement = ref<HTMLElement | null>(null);
onMounted( () => {
    modal = new Modal(modalElement.value, modalOptions);
});

watch(()=>props.show, ()=>{
    if (props.show) {
        getUserCollection();
        modal?.show();
    } else {
        modal?.hide()
    }
});
const showUserModal = ref(false);
const title = ref('');
const userList = ref<User[]>([]);
const addUser = (userId: number) => { userList.value.push({id: userId})};
const removeUser = (userId: number) => { userList.value = userList.value.filter(user => user.id != userId)};

const add = async () => {
    await addBoard({ title: title.value, users: userList.value });
    emit('add');
    emit('update:show', false);
};
</script>

<template>
    <div id="createBoardModal"
         ref="modalElement"
         class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4
                overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]"
    >
        <div class="relative w-[500px]">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ $t('kanban.createBoard') }}
                    </h3>
                    <button @click="show=false"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm
                            p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div>
                    <div class="p-4 relative bg-white dark:bg-slate-800
                                overflow-auto ring-1 ring-slate-900/5 -my-px">
                        <div class="mb-4">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('common.title')}}</label>
                            <input type="text" id="title"
                                   v-model="title"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                                          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   :placeholder="$t('kanban.insertTitle')" required>
                        </div>
                        <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Добавить пользователей</div>
                        <div  class="flex flex-wrap">
                            <span v-for="user in userList"
                                  :key="user.id"
                                    class="inline-flex items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900
                                         bg-white rounded-full border border-gray-200 hover:bg-gray-100
                                         hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400
                                         dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <img v-if="user.avatar" class="rounded-full items-start flex-shrink-0 mr-3" :src="user.avatar" width="32" height="32" />
                                <img v-else class="rounded-full items-start flex-shrink-0 mr-3" src="@/assets/img/user.png" width="32" height="32" />
                                {{user}}
                                <button type="button" class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm"
                                        @click="removeUser(user.id)"
                                >
                                    <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg><span class="sr-only">Remove badge</span>
                                </button>
                            </span>
                            <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900
                                                    bg-white rounded-full border border-gray-200 hover:bg-gray-100
                                                    hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400
                                                    dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    @click="showUserModal = true"
                            >+ {{ $t('common.add')}}</button>
                        </div>


                    </div>
                </div>
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button :disabled="title == '' || loadingBoardCreate"
                            class="font-medium rounded-lg text-sm px-5 py-2.5 text-center rounded-lg border border-gray-200 dark:border-gray-500"
                            :class="{
                                'bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 text-white':  title != '',
                                'bg-gray-100 border-gray-200 dark:bg-gray-700 text-gray-800 dark:border-gray-500':  title == ''
                            }"
                            @click="add"
                    >
                        <svg v-if="loadingBoardCreate" aria-hidden="true" role="status" class="inline w-4 h-4 mx-auto mx-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        <span v-else>{{ $t('common.create') }}</span>
                    </button>
                    <button @click="show=false"
                            class="text-gray-500 bg-white hover:bg-gray-100
                                rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900
                                dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                        {{ $t('common.cancel') }}
                    </button>
                </div>
            </div>
        </div>
        <chat-users-modal-card v-model:show="showUserModal" :users="usersCollection" @add="addUser($event)"/>
    </div>
</template>

<style scoped>

</style>
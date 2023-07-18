<script setup lang="ts">
import _ from 'lodash';
import {initDropdowns, Modal} from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { FunnelIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import {UserFull} from "~/dto/chat";
import UserCard from "~/components/Chat/UserCard.vue";

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
        default: false
    },
    users: {
        type: Array as PropType<UserFull[]>,
    },
    selectOnLine: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['update:show', 'add']);
const filter = ref('');
const isShowFilter = ref(false);
const userFiltered = computed(() => props.users?.filter(user => `${user.surname} ${user.name} ${user.patronymic}`.toLowerCase().includes(filter.value.toLowerCase())));

const usersWithDivider = computed(() => {
    const uniqLetter = _.sortBy(_.uniq(userFiltered.value?.map(user => user.surname ? user.surname.substring(0,1) : '_')))
    return uniqLetter.map((letter: string) => (
        {
            letter,
            users: _.sortBy(userFiltered.value?.filter(user => user.surname == undefined && letter == '_' || user.surname?.substring(0,1) == letter), 'surname')
        }
    ))
});

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
    initDropdowns()
    if (props.show) {
        modal?.show()
    } else {
        modal?.hide()
    }
});

const currentUserId = ref(0);
const isUserOnline = computed(() => props.users?.find(user => user.id == currentUserId.value)?.is_online);
// const isUserOnline = ref(true)
const addChat = () => {
    if (isUserOnline.value || !props.selectOnLine) {
        emit('add', currentUserId.value);
        emit( 'update:show', false);
        currentUserId.value = 0;
    }
};

</script>

<template>
    <div id="contactsModal"
         ref="modalElement"
         data-modal-backdrop="static"
         class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4
                overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]"
    >
        <div class="relative min-w-[450px]" >
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl py-2 font-semibold text-gray-900 dark:text-white" >
                        {{ $t('chat.selectContact') }}
                    </h3>
                    <FunnelIcon v-if="!isShowFilter" @click="isShowFilter=true" class="ml-4 h-6 w-6 cursor-pointer" />
                    <div v-else  class="ml-4 relative z-0">
                        <input v-model="filter" type="text" id="filter" class="block w-full px-0 py-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label for="filter" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ $t('common.filter')}}</label>
                        <XMarkIcon class="w-5 h-5 absolute top-2.5 right-0 cursor-pointer" @click="filter=''; isShowFilter=false"/>

                    </div>


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
                <div >
                    <div class="relative max-w-md mx-auto bg-white dark:bg-slate-800
                                h-[calc(60vh)] overflow-auto ring-1 ring-slate-900/5 -my-px">
                        <div class="relative"
                             v-for="(users, key) in usersWithDivider"
                             :key="key"
                        >
                            <div class="sticky -top-1 px-4 py-3 flex items-center font-semibold text-sm
                                        text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90
                                        backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10"
                            >
                                {{ users.letter }}
                            </div>
                            <div class="divide-y dark:divide-slate-200/5 mx-3" @dblclick="addChat">
                                <user-card v-for="(user, key) in <UserFull[]>users.users"
                                           :key="key"
                                           :current-user-id="currentUserId"
                                           :user-full="user"
                                           @on-click="currentUserId=$event"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button :disabled="currentUserId == 0 "
                            class="font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-gray-200 dark:border-gray-500"
                            :class="(isUserOnline && selectOnLine) || (!selectOnLine && currentUserId != 0) ?
                                'bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 text-white':
                                'bg-gray-100 border-gray-200 dark:bg-gray-700 text-gray-800 dark:border-gray-500'
                            "
                            @click="addChat"
                    >
                        {{ $t('common.select') }}
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
    </div>
</template>
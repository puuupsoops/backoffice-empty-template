<script setup lang="ts">
import svgSettings from '@/assets/img/icon/settings.svg';
import {PropType} from "@vue/runtime-core";
import {UserSelf} from "~/dto/chat";
const props = defineProps({
    userSelf: {
        type: Object as PropType<UserSelf|null>,
    },
});

</script>

<template>
    <header class="pt-6 pb-4 px-5 border-b border-gray-200" >
        <div class="flex justify-between items-center mb-3">
            <!-- Image + name -->
            <div class="flex items-center">
                <a class="inline-flex items-start mr-3">
                    <img v-if="props.userSelf?.user.avatar" class="rounded-full " :src="props.userSelf?.user.avatar" width="48" height="48" :alt="props.userSelf?.persona.full"/>
                    <img v-else class="rounded-full" src="@/assets/img/user.png" width="48" height="48" :alt="props.userSelf?.persona.full"/>
                </a>
                <div class="pr-1">
                    <a class="inline-flex text-base font-normal text-gray-700 rounded-lg dark:text-white" href="#">
                        <h2 class="text-xl leading-snug font-bold">
                            {{props.userSelf?.persona.surname}} {{props.userSelf?.persona.name}} {{props.userSelf?.persona.patronymic}}
                        </h2>
                    </a>
                    <a class="block lowercase text-sm font-medium hover:text-indigo-500" href="#0">{{props.userSelf?.user.nickname}}</a>
                </div>
            </div>
            <!-- Settings button -->
            <div class="relative inline-flex flex-shrink-0">
                <button

                    data-tooltip-target="tooltip-default" class="text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none">
                    <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        {{ $t('common.settings') }}
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <svgSettings class="w-5 h-5 fill-current"/>
                </button>
            </div>
        </div>
    </header>
</template>
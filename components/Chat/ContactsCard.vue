<script setup lang="ts">


</script>

<template>
    <div class=" max-h-[32rem] overflow-auto scroll-ml-6">
        <h3 class="absolute px-4 py-3 w-[calc(100%-5px)] font-semibold
                   text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90
                   dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10"
        >{{ $t('pages.chat.chats') }}</h3>

        <div class="py-3 px-4 mt-[3rem]">
                <!-- User -->
             <slot name="contact"></slot>
        </div>
    </div>
</template>
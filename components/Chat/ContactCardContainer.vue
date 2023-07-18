<script setup lang="ts">
import svgPencil from '@/assets/img/icon/pencil.svg';

</script>

<template>

    <div class="h-full">
        <!-- Card -->
        <div class="relative w-[340px] min-h-[500px] pb-5 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg">
            <!-- Card header -->
            <slot name="header">
            </slot>
            <!-- Card body -->
            <!-- Chat list -->

            <slot name="contacts"></slot>
            <button data-tooltip-target="tooltip-create-chat"
                    class="absolute bottom-10 right-5  h-10 w-10
                           inline-flex items-center justify-center rounded-full h-10 w-10
                           bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                           hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg
                           dark:shadow-blue-800/80"
                    @click="$emit('openContactsModal')"
            >
                <div id="tooltip-create-chat" role="tooltip" class="absolute z-10 whitespace-nowrap  invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    {{ $t('chat.createChat') }}
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                 <svgPencil class="w-5 h-5 stroke-white"/>
            </button>
        </div>

    </div>
</template>


<style scoped>

</style>
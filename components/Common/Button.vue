<script setup lang="ts">
const props = defineProps({
    disabled: { type: Boolean, default: false },
    alternative: { type: Boolean, default: false}
});
const emits = defineEmits(['click']);
</script>

<template>
    <button :disabled="disabled"
            @click="$emit('click')"
            class="inline-flex items-center py-2.5 px-4 rounded-lg text-xs font-medium text-center"
            :class="{ 'cursor-pointer bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600' : !disabled,
                      'bg-gray-100 border-gray-200 dark:bg-gray-700 text-gray-800 dark:border-gray-500': disabled,
                      'bg-white border text-gray-800 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700': alternative
            }"
    >
        <slot></slot>
    </button>
</template>

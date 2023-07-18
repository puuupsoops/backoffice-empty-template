<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String
    },
    buttonTitle: {
        type: String
    },
    rowCount: {
        type: Number,
        default: 2
    }
});
const emits = defineEmits(['update:modelValue', 'add']);
</script>

<template>
    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <textarea :value="modelValue"
                      @input="$emit('update:modelValue', $event.target.value)"
                      id="comment"
                      :rows="rowCount"
                      class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      :placeholder="placeholder ?? $t('common.inputPlaceholder')"></textarea>
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <common-button :disabled="modelValue === ''" @click="$emit('add')">
                {{ buttonTitle ?? $t('common.add') }}
            </common-button>
            <div class="flex pl-0 space-x-1 sm:pl-2">
                <slot name="buttons">
                </slot>
            </div>
        </div>
    </div>
</template>
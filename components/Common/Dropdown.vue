<script setup lang="ts">

import {Dropdown, DropdownInterface, } from "flowbite";
import type {DropdownOptions} from  "flowbite";
const props = defineProps({
    closeByClick: { type: Boolean, default: true },
    placement: { type: String as PropType<'top'|'right'|'bottom'|'left'>, default: 'bottom'},
    skidding: { type: Number, default: 0}
});
const triggerDropdownRef = ref<HTMLElement|null>(null);
const targetDropdownRef = ref<HTMLElement|null>(null);
let dropdown: DropdownInterface|undefined = undefined;

onMounted(()=>{
    const options: DropdownOptions = {
        placement: props.placement,
        offsetSkidding: props.skidding
    }
    dropdown = new Dropdown(targetDropdownRef.value, triggerDropdownRef.value, options)
})

const onClick = () => {
    if (props.closeByClick) {
        dropdown?.hide();
    }
}
</script>

<template>
    <div>
        <div ref="triggerDropdownRef">
            <slot></slot>
        </div>
        <div ref="targetDropdownRef"
             @click="onClick"
             class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
            <slot name="dropdown">
                <div class="tooltip-arrow" data-popper-arrow></div>
            </slot>
        </div>
    </div>
</template>
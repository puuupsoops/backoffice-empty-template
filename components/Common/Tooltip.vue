<script setup lang="ts">

import {Tooltip, TooltipInterface} from "flowbite";

const triggerTooltipRef = ref<HTMLElement|null>(null);
const targetTooltipRef = ref<HTMLElement|null>(null);
let tooltip: TooltipInterface|undefined = undefined;
onMounted(()=>{
    tooltip = new Tooltip(targetTooltipRef.value, triggerTooltipRef.value)
})

</script>

<template>
    <div ref="triggerTooltipRef">
        <slot></slot>
        <div ref="targetTooltipRef"
             role="tooltip"
             class="absolute z-10 invisible inline-block px-3 py-1 text-sm font-medium text-white transition-opacity
                    duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
            <slot name="tooltip">
            </slot>
        </div>
    </div>

</template>
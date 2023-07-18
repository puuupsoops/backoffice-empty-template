import { defineStore } from 'pinia'

export const useUiStore = defineStore('uiStore', () => {
    const sidebarExpand = ref(false);

    const setSidebarExpand = () => {
        sidebarExpand.value = !sidebarExpand.value;
    };

    return {
        sidebarExpand,
        isSidebarExpanded: computed(() => sidebarExpand.value),
        setSidebarExpand
    }
})
<script setup lang="ts">

</script>

<template>
    <div>
      <slot name="app-before" />
      <div id="app-before"></div>
      <div class="flex flex-col text-font-color dark:text-dark-font-color">
        <slot name="header">
          <PageNavbar />
        </slot>


        <div class="flex h-[calc(100vh-65px)]">
          <slot name="sidebar">
            <PageSidebar />
          </slot>
          <div class="flex-1 w-full h-full overflow-auto flex flex-col p-4">
            <div
              class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full"
            >
              <slot />
            </div>
            <slot name="footer">
              <PageFooter />
            </slot>
          </div>
        </div>

      </div>
      <slot name="app-after" />
      <div id="app-after"></div>
    </div>
  </template>
  
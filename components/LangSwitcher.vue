<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { locale,  onLanguageSwitched  } = useI18n()

</script>

<template>

  <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          @click="locale==='ru' ? locale = 'en' : locale = 'ru'"
  >
    <div class="w-5 h-5">
      {{ locale }}
    </div>

  </button>

</template>
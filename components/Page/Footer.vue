<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import svgLogoNegative from '@/assets/img/logo_negative.svg'

const app = useAppConfig() as AppConfigInput
</script>

<template>
  <footer class="m-0 p-1 md:p-4 md:m-2 shadow-inner bg-white md:rounded-lg md:flex md:items-center md:justify-between dark:bg-dark-bg-default">
    <div class="flex flex-col">
        <svgLogoNegative class="h-6 mr-3 sm:h-9 fill-black" alt="psk.expert"/>
      <span class="text-sm text-center ">© 2023 <a href="https://psk.expert/" class="hover:underline">«Эксперт Спецодежда»</a>.</span>
    </div>
    <ul class="flex flex-wrap items-center justify-end mt-0 text-sm">
      <li>
        <a href="https://psk.expert/sale/" class="mr-4 hover:underline md:mr-6 ">{{ $t('pages.footer.catalog') }}</a>
      </li>
      <li>
        <a href="https://psk.expert/o-kompanii/" class="mr-4 hover:underline md:mr-6">{{ $t('pages.footer.about') }}</a>
      </li>
      <li>
        <a href="https://psk.expert/clients/kak-kupit-spetsodezhdu.php" class="mr-4 hover:underline md:mr-6">{{ $t('pages.footer.for_clients') }}</a>
      </li>
      <li>
        <a href="https://psk.expert/info-tsentr/gosty.php" class="hover:underline">{{ $t('pages.footer.info') }}</a>
      </li>
    </ul>
  </footer>
</template>

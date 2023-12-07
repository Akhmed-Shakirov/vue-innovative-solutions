<template>
    {{ $t('hi') }}

    <div class="d-flex">
        <button @click="setLang('ru')">RU</button>
        <button @click="setLang('kz')">KZ</button>
        <button @click="setLang('en')">EN</button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

const { locale } = useI18n()
const language = useStorage('language', '')

const setLang = (value: string) => {
    locale.value = language.value = value
}
</script>

<style scoped lang="scss">

</style>

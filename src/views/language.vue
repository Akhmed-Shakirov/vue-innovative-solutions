<template>
    {{ $t('hi') }}

    <Select v-model="language" :selects="selects" />
</template>

<script setup lang="ts">
import { Select } from '../components'

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

const { locale } = useI18n()
const language = useStorage('language', '')

watch(language, () => locale.value = language.value )

const selects = ref<any[]>([
    { name: 'RU', value: 'ru' },
    { name: 'KZ', value: 'kz' },
    { name: 'EN', value: 'en' },
])
</script>

<style scoped lang="scss">

</style>

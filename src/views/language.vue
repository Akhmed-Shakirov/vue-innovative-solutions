<template>
    {{ $t('hi') }}

    <Select v-model="language" :options="options" />
</template>

<script setup lang="ts">
import Select from '../components/Select.vue'

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

const { locale } = useI18n()
const language = useStorage('language', '')

watch(language, () => locale.value = language.value )

const options = ref<any[]>([
    { name: 'RU', value: 'ru' },
    { name: 'KZ', value: 'kz' },
    { name: 'EN', value: 'en' },
])
</script>

<style scoped lang="scss">

</style>

<template>
    <Flap />

    <Button @click="isModal = !isModal" value="Modal" />

    <Modal v-model="isModal">
        <Input v-model="value" label="Name" style="width: 250px" isRequired />
    </Modal>

    <Icon icon="xmark"/>

    <Icon icon="vite.svg"/>

    <Icon icon="vue.svg"/>

    <Input v-model="value" label="Name" style="width: 250px" />

    <Datepicker v-model="date" label="Date" style="width: 250px" isActiveDay isMax />

    <Select v-model="select" :selects="selects" label="Name" style="width: 250px" />

	<Files v-model="file" :types="['png', 'jpg', 'jpeg']" />

    <img v-if="img" :src="img" alt="img">

	<Files v-model="files" limit="3" :types="['png', 'jpg', 'jpeg']" />

    <template v-for="item in imgs" :key="item">
        <img v-if="item" :src="item" alt="img">
    </template>
</template>

<script setup lang="ts">
import { Flap, Modal, Icon, Input, Select, Datepicker, Files, Button } from '../components'

import { ref, watch } from 'vue'
import { useFileLink } from '../composables'

const isModal = ref<boolean>(false)

const value = ref<string | null>(null)

const date = ref<string | null>(null)

const select = ref<string | null>(null)

const file = ref<any>(null)

const img = ref<any>(null)

const files = ref<any[]>([])

const imgs = ref<any[]>([])

const selects = ref<any[]>([
    { name: 'Alex', value: 1 },
    { name: 'Tom', value: 2 },
    { name: 'Max', value: 3 },
])

watch(file, async () => {
    img.value = await useFileLink(file.value)
})

watch(files, async () => {
    const data: any[] = []

    for (const item of files.value) {
        const url = await useFileLink(item)
        data.push(url)
    }

    imgs.value = data
}, { deep: true })

// date.value = '2024-12-20'
</script>

<style scoped lang="scss">
</style>

<template>
    <Flap />
    
    <button @click="isModal = !isModal">Modal</button>

    <Modal v-model="isModal">
        <Select />
        <Select />
        <Select />
        <Select />
        <Select />
        <Select />
    </Modal>

    <Icon icon="xmark"/>

    <Icon icon="vite.svg"/>

    <Icon icon="vue.svg"/>

    <Input v-model="value" label="Name" style="width: 250px" />

    <Datepicker v-model="date" label="Date" style="width: 250px" isActiveDay />

    <Select v-model="select" :options="options" label="Name" style="width: 250px" />
</template>

<script setup lang="ts">
import Flap from '../components/Flap.vue'
import Modal from '../components/Modal.vue'
import Icon from '../components/Icon.vue'
import Input from '../components/Input.vue'
import Select from '../components/Select.vue'
import Datepicker from '../components/Datepicker.vue'

import { ref } from 'vue'

const isModal = ref<boolean>(false)

const value = ref<string | null>(null)

const date = ref<string | null>(null)

const select = ref<string | null>(null)

const options = ref<any[]>([
    { name: 'Alex', value: 1 },
    { name: 'Tom', value: 2 },
    { name: 'Max', value: 3 },
])

// date.value = '2024-12-20'
</script>

<style scoped lang="scss">
</style>

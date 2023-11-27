<template>
    <Flap />
    
    <button @click="isModal = !isModal">Modal</button>

    <Modal v-model="isModal" />

    <Select />

    <Icon icon="xmark"/>

    <Icon icon="vite.svg"/>

    <Icon icon="vue.svg"/>

    <Input v-model="value" label="Name" placeholder="Alex" style="width: 250px" />

    <Datepicker v-model="date" label="Date" placeholder="__.__.____" style="width: 250px" />

    <div class="section" />
</template>

<script setup lang="ts">
import Flap from './components/Flap.vue'
import Modal from './components/Modal.vue'
import Select from './components/Select.vue'
import Icon from './components/Icon.vue'
import Input from './components/Input.vue'
import Datepicker from './components/Datepicker.vue'

import { ref } from 'vue'

const isModal = ref<boolean>(false)

const value = ref<string | null>(null)

const date = ref<string | null>(null)

// date.value = '2024-12-20'
</script>

<style scoped lang="scss">
.section {
    height: 5000px;
}
</style>

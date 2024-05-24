<template>
    <Select v-model="select" :selects="options" label="Name" isMulti style="width: 250px" />
    <Select v-model="value" :selects="options" label="Name" style="width: 250px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '../components'

const value = ref<any>(null)
const select = ref<any>([])
const options = ref<any[]>([
    { name: 'Alex', value: 1, options: [
        { name: 'Alex 1', value: 4 },
        { name: 'Alex 2', value: 5 },
        // { name: 'Alex 3', value: 6, options: [
        //         { name: 'Alex 3 - 1', value: 13 },
        //         { name: 'Alex 3 - 2', value: 14 },
        //         { name: 'Alex 3 - 3', value: 15 },
        // ] },
    ] },
    { name: 'Tom', value: 2, options: [
        // { name: 'Tom 1', value: 7 },
        // { name: 'Tom 2', value: 8 },
        // { name: 'Tom 3', value: 9 },
    ] },
    { name: 'Max', value: 3, options: [
        // { name: 'Max 1', value: 10 },
        // { name: 'Max 2', value: 11 },
        // { name: 'Max 3', value: 12 }
    ] },
])
</script>

<style scoped lang="scss">
</style>

<template>
    <Select v-model="select" :options="options" label="Name" style="width: 250px" isConcatenate />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '../components'

const select = ref<any>(null)
const options = ref<any[]>([
    { name: 'Alex', value: 1, options: [
        { name: 'Alex 1', value: 4 },
        { name: 'Alex 2', value: 5 },
        { name: 'Alex 3', value: 6, options: [
            { name: 'Alex 3 - 1', value: 13 },
            { name: 'Alex 3 - 2', value: 14 },
            { name: 'Alex 3 - 3', value: 15 },
            'awdawdawd'
    ] },
    ] },
    { name: 'Tom', value: 2, options: [
        { name: 'Tom 1', value: 7 },
        { name: 'Tom 2', value: 8 },
        { name: 'Tom 3', value: 9 },
    ] },
    { name: 'Max', value: 3, options: [
        { name: 'Max 1', value: 10 },
        { name: 'Max 2', value: 11 },
        { name: 'Max 3', value: 12 },
    'awdawdawd'
    ] },

    'awdawdawd'
])

const modelValue = [
    {
        value: 1,
        options: [
            {
                value: 6,
                options: [
                    { value: 13 },
                    { value: 14 }
                ]
            }
        ]
    }
]



modelValue

</script>

<style scoped lang="scss">
</style>

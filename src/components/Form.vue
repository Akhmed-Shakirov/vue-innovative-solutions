<template>
    <form @submit.prevent="submit" novalidate>
        <slot />
    </form>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'
import { storeToRefs, useStartValidator } from '../stores'
const { startValidator, isError } = storeToRefs(useStartValidator())

const modelValue = defineModel<any>()

const emit = defineEmits(['send', 'error'])

const submit = () => {
    startValidator.value++

    setTimeout(() => {
        if (isError.value) {
            modelValue.value.error()
        } else {
            modelValue.value.send()
        }

        isError.value = false
    })
}
</script>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>


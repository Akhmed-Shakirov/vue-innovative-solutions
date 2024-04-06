<template>
    <form @submit.prevent="submit" ref="form" novalidate>
        <slot />
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['send', 'error'])

const form = ref()

const submit = () => {
    if (!form.value.checkValidity()) {
        emit('error')
        return false
    } else {
        emit('send')
    }
}
</script>

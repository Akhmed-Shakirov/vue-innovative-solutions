<template>

    <h3>{{ count }}</h3>

    <div class="d-flex">
        <button @click="count--">Decrement</button>
        <button @click="count++">Increment</button>
    </div>

</template>

<script setup lang="ts">
import { useCountStore } from '../stores/count'
import { storeToRefs } from 'pinia'
const { count } = storeToRefs(useCountStore())
</script>

<style scoped lang="scss">

</style>

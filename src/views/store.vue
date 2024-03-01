<template>

    <h3>{{ count }}</h3>

    <div class="d-flex">
        <button @click="count--">Decrement</button>
        <button @click="count++">Increment</button>
    </div>

    <Rmb>
        <button @click="setNotification({ value: 'secondary', text: 'Secondary' })">Push</button>

        <template #body>
            <button @click="console.log('Option 1')">Option 1</button>
            <button @click="console.log('Option 2')">Option 2</button>
            <button @click="console.log('Option 3')">Option 3</button>
        </template>
    </Rmb>

</template>

<script setup lang="ts">
import { Rmb } from '../components'

import { useCountStore, useNotifications, storeToRefs } from '../stores'

const { count } = storeToRefs(useCountStore())
const { setNotification } = useNotifications()
</script>

<style scoped lang="scss">

</style>

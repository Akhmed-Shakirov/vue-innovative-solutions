<template>

    <h3>{{ count }}</h3>

    <div class="d-flex">
        <Button @click="count--" value="Decrement" />
        <Button @click="count++" value="Increment" />
    </div>

    <Rmb>
        <Button @click="setNotification({ value: 'secondary', text: 'Secondary' })" value="Push" />

        <template #body>
            <Button @click="console.log('Option 1')" value="Option 1" />
            <Button @click="console.log('Option 2')" value="Option 2" />
            <Button @click="console.log('Option 3')" value="Option 3" />
        </template>
    </Rmb>

</template>

<script setup lang="ts">
import { Rmb, Button } from '../components'
import { useCountStore, useNotifications, storeToRefs } from '../stores'

const { count } = storeToRefs(useCountStore())
const { setNotification } = useNotifications()
</script>

<style scoped lang="scss">

</style>

<template>
    <Form v-model="formHandler">
        {{count}}/3

        <Input
            v-model="item.login"
            :validator="validator.login"
            label="Login"
        />

        <Input
            v-model="item.password"
            :validator="validator.password"
            label="Password"
        />

        <Button value="Next" isSubmit isBlue />
    </Form>
</template>

<script setup lang="ts">
import { Input, Form, Button } from '../components'
import { ref } from 'vue'


const count = ref(1)

const item = ref<any>({
    login: '',
    password: ''
})
const validator = {
    login: ['required', 'min-3', 'max-6', 'email'],
    password: ['required']
}


const auch = async () => {
    if (count.value !== 3) {
        count.value++
    } else {
        console.log('Good')
    }
}
const close = () => {
    console.log('Method close')
}
const formHandler = ref({
    send: () => auch(),
    error: () => close()
})
</script>

<style scoped lang="scss">
</style>

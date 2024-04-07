<template>
    <ActionForm
        v-model="isAction"
        icon="trash"
        title="Удалить прибор учета?"
        description="После удаления прибора учета вернуть данные будет невозможно!"
        actions="Отменить Удалить"
        color="red"
        @send="console.log('Удалил')"
    />

    <Button value="Add" icon="user-plus-alt-1" is-blue />
    <Button value="Edit" icon="user-pen-alt-1" is-gray />
    <Button value="Delete" icon="user-xmark-alt-1" is-red />
    <Button value="Delete" icon="user-xmark-alt-1" color="red" />
    <Button value="Accept" icon="chart-network" is-disabled />
</template>

<script setup lang="ts">
import { ActionForm, Button } from '../components'
import { ref } from 'vue'

const isAction = ref<boolean>(false)

setTimeout(() => {
    isAction.value = true
}, 2000)
</script>

<style scoped lang="scss">
</style>

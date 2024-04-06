<template>
    <ActionForm 
        v-model="isAction"
        icon="trash"
        title="Удалить прибор учета?"
        description="После удаления прибора учета вернуть данные будет невозможно!"
        actions="Отменить Удалить"
        @send="console.log('Удалил')"
    />
</template>

<script setup lang="ts">
import { ActionForm } from '../components'
import { ref } from 'vue'

const isAction = ref<boolean>(false)

setTimeout(() => {
    isAction.value = true
}, 2000)
</script>

<style scoped lang="scss">
</style>

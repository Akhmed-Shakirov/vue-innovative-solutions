<template>
    <div class="triger">
        <div ref="triger" />
        <Icon icon="refresh-ccw" class="spin" />
    </div>
</template>

<script setup lang="ts">
import { Icon } from './index.ts'

import { ref, watch } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'

const props = defineProps<{
    timer?: string
}>()

const triger = ref<HTMLElement | null>(null)
const isSet = ref<boolean>(false)

const emit = defineEmits(['triger'])

watch(isSet, () => {
    if (isSet.value) {
        emit('triger')

        setTimeout(() => isSet.value = false, Number(props.timer) ?? 1000)
    }
})

useInfiniteScroll(triger, () => {
    isSet.value = true
})
</script>

<style scoped lang="scss">
.triger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    i {
        width: 50px;
        height: 50px;
    }
}
</style>


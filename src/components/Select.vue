<template>
    <div class="select" ref="select">
        <button class="select__head" @click="isShow = !isShow">Select</button>
        <teleport to="body">
            <Transition>
                <div class="select__body" ref="selectOutside" :style="styleObject" v-if="isShow">
                    <p v-for="item in 5" :key="item">{{ item }} awdwad</p>
                </div>
            </Transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onClickOutside, useMouseInElement, useWindowSize } from '@vueuse/core'

const isShow = ref<boolean>(false)

const select = ref<HTMLElement | null>(null)
const selectOutside = ref<HTMLElement | null>(null)

const { elementPositionX, elementPositionY, elementHeight } = useMouseInElement(select)
const { width } = useWindowSize()

const styleObject = computed<{top: string, left: string}>(() => {
    return {
        top: elementPositionY.value + elementHeight.value + 5 + 'px',
        left: elementPositionX.value + 'px'
    }
})

onClickOutside(selectOutside, (event: any) => {
    const list = [ ...event?.target?.classList ]
    if (!!isShow.value && !list?.includes('select__head')) isShow.value = false
})

watch(width, () => {
    if (!!isShow.value) isShow.value = false
})
</script>

<style scoped lang="scss">
.select {
    position: relative;
    
    &__body {
        z-index: 1;
        width: 200px;
        position: absolute;
        padding: 0.6em 1.2em;
        border-radius: 8px;
        border: 1px solid transparent;
        background-color: #1a1a1a;

        display: flex;
        flex-direction: column;
        gap: 12px;

        p {
            margin: 0;
            color: #ffffff;
        }
    }
}
</style>

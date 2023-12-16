<template>
    <div class="select" ref="select">
        <button class="select__head" @click="toggle">
            {{ modelValue ? options?.find(el => el[keys[1]] == modelValue)[keys[0]] : 'Select' }}
        </button>
        <teleport to="body">
            <Transition>
                <div class="select__body" ref="selectOutside" :style="styleObject" v-if="isShow">
                    <p v-for="item in options" :key="item[keys[1]]" @click="setValue(item)">{{ item[keys[0]] }}</p>
                </div>
            </Transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineModel } from 'vue'
import { onClickOutside, useMouseInElement, useWindowSize, watchDebounced } from '@vueuse/core'

const modelValue = defineModel<string | number | null>()

interface Props {
    options?: any[]
    keys?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    keys: () => ['name', 'value']
})

const setValue = (item: any) => {
    modelValue.value = item[props.keys[1]]
    isShow.value = false
}

const isShow = ref<boolean>(false)
const isTimer = ref<boolean>(true)

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

onClickOutside(selectOutside, () => {
    if (!!isShow.value) {
        isShow.value = false
		isTimer.value = false
    }
})

const toggle = () => {
    if (isTimer.value) {
        isShow.value = !isShow.value
    }
	isTimer.value = false
}

watchDebounced(isTimer,() => {
	isTimer.value = true
},{ debounce: 100, maxWait: 100 })

watch(width, () => {
    if (!!isShow.value) isShow.value = false
})

props
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

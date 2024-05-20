<template>
    <div class="select" ref="select">
        <label class="field__label" v-if="label">
            {{ label }}
        </label>

        <Button class="select__head" :class="{ 'select__head-value' : modelValue }" @click="toggle">
            {{ modelValue ? options?.find(el => el[keys[1]] == modelValue)?.[keys[0]] : 'Select data...' }}
            <Icon icon="chevron-down" :deg="isShow ? 'down' : ''" />
        </Button>
        <teleport to="body" v-if="options?.length">
            <Transition>
                <div class="select__body" ref="selectOutside" :style="styleObject" v-if="isShow">
                    <p
                        v-for="item in options"
                        :key="item[keys[1]]"
                        @click="setValue(item)"
                        :class="{ 'active' : item[keys[1]] == modelValue }"
                    >{{ item[keys[0]] }}</p>
                </div>
            </Transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { Icon, Button } from './index.ts'
import { ref, computed, watch, defineModel } from 'vue'
import { onClickOutside, useMouseInElement, useWindowSize, watchDebounced } from '@vueuse/core'

const modelValue = defineModel<string | number | null>()

const props = withDefaults(defineProps<{
    options?: any[]
    keys?: string[]
    label?: string
}>(), {
    keys: () => ['name', 'value']
})

const setValue = (item: any) => {
    if (modelValue.value == item[props.keys[1]]) {
        modelValue.value = null
    } else {
        modelValue.value = item[props.keys[1]]
    }

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
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;

    &__head {
        width: 100%;
        text-align: left;
        position: relative;
        transition: .2s;
        color: #757575;
        font-weight: 400;

        .icon {
            position: absolute;
            right: 12px;
            bottom: 11px;
            opacity: 0.7;
            color: white;
        }

        &-value {
            color: white;
        }

        &:hover .icon {
            opacity: 1;
            color: white;
        }
    }

    &__body {
        z-index: 1;
        width: 200px;
        position: absolute;
        padding: 6px 0;
        border-radius: 8px;
        border: 1px solid transparent;
        background-color: #1a1a1a;

        display: flex;
        flex-direction: column;
        gap: 4px;

        p {
            margin: 0;
            color: #ffffff;
            cursor: pointer;
            padding: 6px 18px;
            transition: .2s;
        }

        p:hover, .active {
            background: #000;
        }
    }
}
</style>

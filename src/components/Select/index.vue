<template>
    <div class="select" ref="select">
        <label class="field__label" v-if="label">
            {{ label }}
        </label>

        <Button class="select__head" :class="{ 'select__head-value' : value }" @click="toggle">
            {{ value ?? 'Select data...' }}
            <sup class="select__length" v-if="isMulti">{{ count > 1 ? `+${count - 1}` : '' }}</sup>
            <Icon icon="caret-down" :deg="isShow ? 'down' : ''" />
        </Button>

        <teleport to="body" v-if="selects?.length">
            <Transition>
                <div class="select__body" ref="selectOutside" :style="styleObject" v-if="isShow">
                    <Options v-model="modelValue" :isMulti="isMulti" :options="selects" :selects="selects" :keys="keys" :level="1" :isConcatenate="isConcatenate" />
                </div>
            </Transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { Icon, Button } from '../index'
import Options from './Options.vue'

import { ref, computed, watch, defineModel } from 'vue'
import { onClickOutside, useMouseInElement, useWindowSize, watchDebounced } from '@vueuse/core'

const modelValue = defineModel<any>()

const props = withDefaults(defineProps<{
    selects: any[]
    keys?: string[]
    label?: string
    isConcatenate?: boolean
    isMulti?: boolean
}>(), {
    keys: () => ['name', 'value']
})

let count = ref<number>(0)

const findNodeByValue = (data: any[], targetValue: string | null) => {
    function recursiveSearch(arr: any[]) {
        for (let item of arr) {
            if (item.value === targetValue) {
                return item
            }

            if (item.options) {
                let result: any = recursiveSearch(item.options)

                if (result) {
                    return result
                }
            }
        }
        return null
    }

    return recursiveSearch(data)
}
const getValue = (item: any) => {
    if (!item && !item?.length) {
        return null
    }

    let value: any

    if (props.isMulti) {
        value = typeof item[0] == 'object' ? item[0][props.keys[1]] : item[0]
        count.value = modelValue.value?.length
    } else {
        value = item
    }

    return findNodeByValue(props.selects, value)?.[props.keys[0]]
}
const value = computed(() => {
    return getValue(modelValue.value)
})

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

watch([width, modelValue], () => {
    if (!!isShow.value && !props.isMulti) isShow.value = false
})
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
        color: #757575 !important;
        font-weight: 400;

        .icon {
            position: absolute;
            right: 12px;
            bottom: 11px;
            opacity: 0.7;
            color: white;
        }

        &-value {
            color: white !important;
        }

        &:hover .icon {
            opacity: 1;
            color: white;
        }
    }

    &__length {
        color: #79aff6;
        font-size: 12px;
        transform: translateY(-4px);
    }

    &__body {
        z-index: 1;
        width: 200px;
        position: absolute;
        padding: 6px 0;
        border-radius: 8px;
        border: 1px solid transparent;
        background-color: #1a1a1a;
    }
}
</style>

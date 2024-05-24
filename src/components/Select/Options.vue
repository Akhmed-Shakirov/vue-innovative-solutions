<template>
    <div class="options">
        <div
            class="options__item"
            v-for="item in options"
            :key="item"
        >
            <div
                class="options__value"
                :class="{ 'active' : isActive(item) }"
                @click="setValue(item)"
                :style="`padding-left: ${paddingLeft}px`"
            >
                <span>
                    <Checkbox
                        :active="isActive(item)"
                        v-if="isMulti"
                    />

                    {{ getValue(item, isConcatenate) }}
                </span>

                <Icon
                    @click.stop="setShow(item)"
                    v-if="item.options?.length"
                    icon="caret-down"
                    :deg="isShow(item) ? 'up' : ''"
                />
            </div>

            <Options
                v-if="isShow(item)"
                v-model="modelValue"
                :options="item.options"
                :selects="selects"
                :isMulti="isMulti"
                :keys="keys"
                :level="level + 1"
                :isConcatenate="isConcatenate"
                :parent="getValue(item, isConcatenate)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Checkbox, Icon } from '../index'
import { ref, computed } from 'vue'

const modelValue = defineModel<any>()
const show = ref<any[]>([])

const props = withDefaults(defineProps<{
    selects: any[]
    options?: any[]
    keys?: string[]
    label?: string
    parent?: string
    isConcatenate?: boolean
    isMulti?: boolean
    level: number
}>(), {
    keys: () => ['name', 'value'],
    parent: ''
})

const paddingLeft = computed(() => {
    if (props.level == 1) {
        return 10
    }

    return props.level * 10
})

const isActive = (item: any): boolean => {
    const value = typeof item == 'object' ? item[props.keys[1]] : item

    if (!props.isMulti) {
        return modelValue.value == value
    }

    return !!modelValue.value?.find((el: any) => el == value)
}
const getValue = (item: any, isConcat?: boolean) => {
    const value = typeof item == 'object' ? item[props.keys[0]] : item

    return !isConcat ? value : props.parent + (props.parent ? '__' : '') + value
}
const setShow = (item: any) => {
    const value = typeof item == 'object' ? item[props.keys[1]] : item

    if (show.value.includes(value)) {
        show.value = show.value.filter((el: any) => el !== value)
    } else {
        show.value.push(value)
    }
}
const isShow = (item: any): boolean => {
    const value = typeof item == 'object' ? item[props.keys[1]] : item

    return show.value.includes(value) && item.options?.length
}

const findParentsAndChildren = (data: any[], targetValue: string | number) => {
    let result: any = {
        parents: [],
        children: []
    }

    function recursiveSearch(arr: any[], parents: any) {
        for (let item of arr) {
            if (item.value === targetValue) {
                result.parents = parents

                if (item.options) {
                    addChildren(item.options)
                }
                return true
            }

            if (item.options) {
                if (recursiveSearch(item.options, [...parents, item?.value])) {
                    return true
                }
            }
        }
        return false
    }

    function addChildren(options: any[]) {
        for (let option of options) {
            result.children.push(option?.value)
            if (option.options) {
                addChildren(option.options)
            }
        }
    }

    recursiveSearch(data, [])

    return result
}
const removeValue = (value: any) => {
    modelValue.value = modelValue.value.filter((el: any) => el !== value)
}
const addValue = (value: any) => {
    if (!modelValue.value.includes(value)) {
        modelValue.value.push(value)
    }
}
const setValue = async (item: any) => {
    const value = typeof item == 'object' ? item[props.keys[1]] : item

    if (props.isMulti) {
        const { parents, children } = findParentsAndChildren(props.selects, value)

        if (modelValue.value.includes(value)) {

            await removeValue(value)

            for (let el of parents) {
                await removeValue(el)
            }

            for (let el of children) {
                await removeValue(el)
            }
        } else {
            await addValue(value)

            for (let el of parents) {
                await removeValue(el)
            }

            for (let el of children) {
                await addValue(el)
            }
        }
    } else {
        if (modelValue.value !== value) {
            modelValue.value = value
        } else {
            modelValue.value = null
        }
    }
}
</script>

<style scoped lang="scss">
.options {
    &, &__item {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &__value, span {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    &__value {
        margin: 0;
        color: #ffffff;
        cursor: pointer;
        padding: 6px 10px;
        transition: .2s;
        justify-content: space-between;

        span {
            user-select: none;
        }

        .icon {
            opacity: .7;

            &:hover {
                opacity: 1;
            }
        }
    }

    &__value:hover, .active {
        background: #000;
    }
}
</style>

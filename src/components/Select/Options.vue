<template>
    <div class="options">
        <div
            class="options__item"
            v-for="item in options"
            :key="item[keys[1]]"
        >
            <span
                :class="{ 'active' : modelValue.find((el: any) => el?.value == item[keys[1]]) }"
                @click="setShow(item?.value)"
                :style="`padding-left: ${paddingLeft}px`"
            >
                <span @click.stop="setValue(item)"> {{ modelValue.find((el: any) => el?.value == item[keys[1]]) ? '-' : '+' }}</span>
                {{ typeof item == 'object' ? isConcatenate ? parent + (parent ? '__' : '') + item[keys[0]] : item[keys[0]] : item }}
            </span>

            <Options
                v-if="show.includes(item?.value) && item.options?.length"
                :options="item.options"
                :keys="keys"
                :level="level + 1"
                :isConcatenate="isConcatenate"
                :parent="isConcatenate ? parent + (parent ? '__' : '') + item[keys[0]] : ''"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
    options?: any[]
    keys?: string[]
    label?: string
    parent?: string
    isConcatenate?: boolean
    level: number
}>(), {
    keys: () => ['name', 'value'],
    parent: ''
})

const paddingLeft = computed(() => {
    if (props.level == 1) {
        return 6
    }

    return props.level * 10
})

const modelValue = ref<any[]>([])
const show = ref<any[]>([])

const setShow = (item: any) => {
    if (show.value.includes(item)) {
        show.value = show.value.filter((el: any) => el !== item)
    } else {
        show.value.push(item)
    }
}

const setValue = (item: any) => {
    if (modelValue.value.find((el: any) => el?.value == item[props.keys[1]])) {
        modelValue.value = modelValue.value.filter((el: any) => el.value !== item[props.keys[1]])
    } else {
        modelValue.value.push({ value: item[props.keys[1]], options: [] })
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

    span {
        margin: 0;
        color: #ffffff;
        cursor: pointer;
        padding: 6px 10px;
        transition: .2s;
    }

    span:hover, .active {
        background: #000;
    }
}
</style>

<template>
    <Input v-model="search" label="Search" placeholder="xmark" style="width: 250px" />

    <div class="icons">
        <template v-for="(value, key) in filter" :key="key">
            <div class="icons__type" v-if="value.length">
                <h4>{{ key }}</h4>
                <div class="icons__items">
                    <div class="icons__item" v-for="item in value" @click="copyIcon(item)">
                        <h5>{{ item.split('.')[0] }}</h5>
                        <Icon :icon="`${item.split('.')[0]}`" />
                    </div>
                </div>
            </div>
        </template>
    </div>

    <Triger @triger="count++" timer="200" v-if="isLength" />
</template>

<script setup lang="ts">
import Icon from '../components/Icon.vue'
import Input from '../components/Input.vue'
import Triger from '../components/Triger.vue'

import { ref, computed } from  'vue'
import { useClipboard } from '@vueuse/core'
import { icons } from '../assets/icons'

const search = ref<string | null>(null)

const count = ref<number>(3)

const filter = computed<any>(() => {
    let data: any = {}
    const value = JSON.parse(JSON.stringify(icons))

    const keys = Object.keys(JSON.parse(JSON.stringify(icons)))

    for (var i = 0; i < keys.length; i++) {
        const key = keys[i]
        const index = i + 1

        if (key && value[key].length && index <= count.value) {

            let arr: any = value[key]

            arr = arr.filter((el: string) => el.includes(search.value ? String(search.value) : ''))

            if (arr.length) {
                data[key] = arr.map((el: string) => el.split('.')[0])
            } else {
                data[key] = []
            }
        }
    }
    return data
})
const isLength = computed<boolean>(() => {
    return Object.keys(icons)?.length > count.value ? true : false
})

const { copy } = useClipboard()
const copyIcon = (value: string) => {
    copy(`<Icon icon="${value}" />`)
}
</script>

<style scoped lang="scss">
.icons {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 800px;

    &__type {

        h4 {
            text-align: left;
            text-transform: uppercase;
        }
    }

    &__items {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 16px;
    }

    &__item {
        cursor: pointer;
        transition: .2s;

        h5 {
            color: #7b7b7b;
            font-size: 12px;
        }

        i {
            color: #ffffff;
            width: 32px;
            height: 32px;
        }

        &:hover {
            opacity: .5;
        }
    }
}
</style>

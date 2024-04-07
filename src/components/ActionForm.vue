<template>
    <Modal
        v-model="modelValue"
        is-hide-head
        is-hide-footer
    >
        <div class="actions">
            <Icon v-if="icon" :icon="icon" />
            <h3 v-if="title">{{ $t(title ?? '') }}</h3>
            <p v-if="description">{{ $t(description ?? '') }}</p>

            <div class="actions__button" v-if="buttons">
                <Button
                    v-for="(item, index) in buttons"
                    :key="item" @click="toggle(index)"
                    :color="buttons?.length == 1 || index == 1 ? color : 'gray'"
                    :value="item"
                />
            </div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import { Modal, Icon, Button } from './index.ts'
import { defineModel, computed } from 'vue'

const modelValue = defineModel<boolean>()

const props = defineProps<{
    icon?: string
    title?: string
    description?: string
    actions?: string
    color?: string
}>()

const buttons = computed<string[]>(() => {
    return props.actions ? props.actions?.split(' ') : []
})

const emit = defineEmits(['cancel', 'send'])

const toggle = (index: number) => {
    let arr: any = ['cancel', 'send']

    if (buttons.value?.length == 1) {
        emit(arr[1])
    } else {
        emit(arr[index])
    }

    modelValue.value = false
}
</script>

<style scoped lang="scss">
.actions {
    padding: 16px;
    flex-direction: column;
    align-items: center;

    &, &__button {
        display: flex;
        gap: 12px;
    }

    .icon {
        width: 60px;
        height: 60px;
    }

    h3 {
        font-weight: 600;
        font-size: 20px;
    }

    p {
        text-align: center;
        font-weight: 500;
        font-size: 14px;
    }

    &__button {
        width: 100%;
        margin-top: 16px;

        button {
            width: 100%;
        }
    }
}
</style>

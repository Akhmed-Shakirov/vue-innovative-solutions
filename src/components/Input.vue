<template>
    <div
        class="field"
        :class="{
            'field-icon' : icon,
            'field__error': errorText
        }"
    >
        <label class="field__label" v-if="label">
            {{ label }}
        </label>

        <input
            class="field__main"
            v-model="modelValue"
            :type="types || 'text'"
            :placeholder="placeholder ?? 'Enter data...'"
            @keyup.enter="$emit('enter')"
            v-maska:[masks]
        >

        <p class="field__text" v-if="errorText">{{ $t(errorText ?? '') }}</p>

        <Icon
            class="field__icon"
            @click="$emit('icon')"
            :icon="icon"
            v-if="icon"
        />

        <Validator
            v-if="validator?.length"
            v-model="modelValue"
            v-model:errorText="errorText"
            :validator="validator"
        />
    </div>
</template>

<script setup lang="ts">
import { Icon, Validator } from './index.ts'
import { ref, defineModel, computed } from 'vue'
import { useFindItem } from '../composables'
import { vMaska } from 'maska'

const modelValue = defineModel<string | null>()

const emit = defineEmits(['icon', 'enter'])

const props = withDefaults(defineProps<{
    icon?: string
    label?: string
    placeholder?: string
    validator?: string[]
    name?: string
    type?: string
    mask?: string
}>(), {
    validator: () => []
})

const errorText = ref('')

const masks = computed<{ mask: string }>(() => {
    return {
        mask: props.mask ? props.mask : ''
    }
})

const types = computed<string>(() => {
    return props.type || useFindItem('number', props.validator)
})
</script>

<style scoped lang="scss">
</style>

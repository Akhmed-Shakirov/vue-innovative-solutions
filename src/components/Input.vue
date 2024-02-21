<template>
    <div class="field" :class="{ 'field-icon' : icon }">
        <label class="field__label" v-if="label">
            {{ label }}
        </label>

        <input 
            class="field__main"
            v-model="modelValue"
            type="text" 
            :placeholder="placeholder ?? 'Enter data...'"
            @keyup.enter="$emit('enter')"
            v-maska:[masks]
        >

        <Icon 
            class="field__icon" 
            @click="$emit('icon')" 
            :icon="icon" 
            v-if="icon" 
        />

        <input
            @invalid="validator"
            :value="modelValue"
            :required="isRequired"
            style="display: none"
        >
    </div>
</template>

<script setup lang="ts">
import { Icon } from './index.ts'

import { ref, defineModel, computed } from 'vue'
import { vMaska } from 'maska'

const modelValue = defineModel<string | number | null>()

const emit = defineEmits(['icon', 'enter'])

const props = defineProps<{
    isRequired?: boolean
    icon?: string
    label?: string
    placeholder?: string
    mask?: string
}>()

const isValidation = ref(false)
        
const validator = (e: any) => {
    if (!props.isRequired) return
    
    isValidation.value = false
    if (e.target.validity.valid) return

    for (const key in e.target.validity) {
        if (e.target.validity[key]) isValidation.value = true
    }
}

const masks = computed<{ mask: string }>(() => {
    return {
        mask: props.mask ? props.mask : '',
    }
})
</script>

<style scoped lang="scss">

</style>

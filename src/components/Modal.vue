<template>
    <teleport to="body">
        <Transition>
            <div class="modal" v-if="modelValue">
                <div class="modal__content" ref="modal">
                    <div class="modal__head" v-if="!isHideHead">
                        
                    </div>
                    <div class="modal__body">
                        <slot />
                    </div>
                    <div class="modal__footer" v-if="!isHideFooter">
                        <button @click="toggle('cancel')">Cansel</button>
                        <button @click="toggle('send')">OK</button>
                    </div>
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<script setup lang="ts">
import { ref, defineModel, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const modelValue = defineModel<boolean>()

const props = defineProps<{
    isHideHead?: boolean
    isHideFooter?: boolean
}>() 
props

const modal = ref<HTMLElement | null>(null)

onClickOutside(modal, (event: any) => {
    const list = [ ...event?.target?.classList ]
    if (!!modelValue.value && list?.includes('modal')) modelValue.value = false
})

watch(modelValue, () => {
    if (modelValue.value) {
        // document.body.classList.add('no-scroll')
    } else {
        // document.body.classList.remove('no-scroll')
    }
})

const emit = defineEmits(['cancel', 'send'])

const toggle = (type: any) => {
    emit(type)
    modelValue.value = false
}
</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000072;

    &__content {
        border-radius: 8px;
        background: #242424;
        color: #FFFFFF;
        min-width: 300px;
    }

    &__body {
        width: 400px;
        min-height: 100px;
        padding: 16px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;

        max-height: 80vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    &__footer {
        border-top: 1px solid #000;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 16px;
    }
}
</style>

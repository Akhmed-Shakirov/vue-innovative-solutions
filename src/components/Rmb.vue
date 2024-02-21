<template>
    <div class="rmb">
        <div class="rmb__head" @contextmenu="contextmenu">
            <slot />
        </div>
        <div class="rmb__body" v-if="isShow" :style="style">
            <slot name="body" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const isShow = ref<boolean>(false)
const isTimer = ref<boolean>(true)

const style = ref<{ left: string, top: string }>({
    left: '',
    top: ''
})

const contextmenu = (event: any) => {
    event.preventDefault()
    isShow.value = !isShow.value
    style.value.left = event.clientX + 5 + 'px'
    style.value.top = event.clientY + 5 + 'px'
    isTimer.value = false
}

document.addEventListener('contextmenu', () => {
    if (isTimer.value == true) {
        isShow.value = false 
    }
})

document.addEventListener('click', () => {
    if (isShow.value == true) {
        isShow.value = false 
    }
})

watchDebounced(isTimer,() => {
	isTimer.value = true
},{ debounce: 100, maxWait: 100 })
</script>

<style scoped lang="scss">
.rmb {
    &__body {
        display: flex;
        flex-direction: column;
        position: absolute;
    }
}
</style>

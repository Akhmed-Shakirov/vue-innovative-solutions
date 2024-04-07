<template>
    <div class="flap" ref="flap">
        <Button class="flap__head" @click="isShow = !isShow" value="Toggler" />
        <div class="animation-flap" :class="{ 'animation-flap__show' : isShow }">
            <div class="flap__body">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea molestiae, asperiores porro, dolores corporis aperiam error eius tenetur possimus nam ipsa. Explicabo similique non repudiandae earum ut laborum ipsum velit.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from './index.ts'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isShow = ref<boolean>(false)

const flap = ref<HTMLElement | null>(null)

onClickOutside(flap, () => {
    if (isShow.value) isShow.value = false
})
</script>

<style scoped lang="scss">
.flap {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    width: 600px;

    &__head {
        width: 200px;
    }

    &__body {
        min-height: 0;
    }
}
</style>

<template>
    <i :class="[icon, deg]" class="icon" :style="styleObject" v-if="!icon.includes('.')" />
    <img :class="[deg]" class="icon img" :src="`/icons/images/${icon}`" :alt="icon" v-else>
</template>

<script setup lang="ts">
import { StyleValue, computed } from 'vue'

const props = defineProps<{
    icon: string
    deg?: string
}>()

const styleObject = computed<StyleValue | undefined>(() => {
    return {
        '-webkit-mask-image': `url(/icons/${props.icon}.svg)`,
        'mask-image': `url(/icons/${props.icon}.svg)`
    }
})
</script>

<style scoped lang="scss">
i.icon, img.icon {
    display: inline-block;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: contain;

    transition: .2s;


    &.up {
        transform: rotate(-180deg);
    }

    &.down {
        transform: rotate(180deg);
    }

    &.left {
        transform: rotate(-90deg);
    }

    &.right {
        transform: rotate(90deg);
    }
}
i.icon {
    background: currentColor;
}

.icon {
    height: 20px;
    width: 20px;
}
</style>

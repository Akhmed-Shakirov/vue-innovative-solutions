<template>
    <div class="notification" :class="`notification__${getColor(item?.value)}`">
        <Icon icon="circle-information" />
        <p>{{ item?.text }}</p>
        <Icon icon="xmark" @click="removeNotification(item?.id)" />

        <div class="notification__timer" :style="`--timer: ${timer}s`" />
    </div>
</template>

<script setup lang="ts">
import { Icon } from '../index'
import { watchDebounced } from '@vueuse/core'
import { useColors, useNotifications } from '../../stores'

const props = defineProps<{
    item: any
    timer: number
}>()

const { getColor } = useColors()
const { removeNotification } = useNotifications()

watchDebounced(() => props.timer, () => {
    removeNotification(props.item?.id)
}, { debounce: props.timer * 1000, maxWait: 10000, immediate: true })
</script>

<style lang="scss">
.notification {
    position: relative;
    width: 326px;
    min-height: 64px;
    border-radius: 8px;
    padding: 22px 24px;
    display: flex;
    align-items: center;
    gap: 16px;

    p {
        flex: 1 1 auto;
        text-align: left;
        font-size: 16px;
        font-weight: 500;
    }

    .icon {
        width: 24px;
        height: 24px;
    }

    .xmark {
        cursor: pointer;

        &:hover {
            opacity: .5;
        }
    }

    &__orange {
        background: #ec4a0a;
    }

    &__red {
        background: #d92d20;
    }

    &__green {
        background: #027a48;
    }

    &__blue {
        background: #3a94cf;
    }

    &__gray {
        background: #667085;
    }

    &__timer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 6px;
        background: #0000003c;
        border-radius: 0 8px 8px 8px;
        animation: timer var(--timer) linear 0s;
    }
}
</style>

<template>
    <button
        class="button"
        :class="getColor, {
            'button__gray': isGray,
            'button__blue': isBlue,
            'button__red': isRed,
        }"
        :type="isSubmit ? 'submit' : 'button'"
        :disabled="isDisabled"
        @click="applyWaveEffect"
    >
        <Icon :icon="icon" v-if="icon" />

        <template v-if="value">
            {{ $t(value ?? '') }}
        </template>
		<div v-if="!value && $slots.default" style="width: 100%">
			<slot />
		</div>

        <Icon :icon="iconR" v-if="iconR" />
    </button>
</template>

<script setup lang="ts">
import { Icon } from './index.ts'
import { computed } from 'vue'

const props = defineProps<{
    value?: string
    icon?: string
    iconR?: string
    isSubmit?: boolean
    isDisabled?: boolean
    isGray?: boolean
    isBlue?: boolean
    isRed?: boolean
    color?: string
}>()

const getColor = computed<string>(() => {
    return props.color ? `button__${props.color}` : ''
})

const applyWaveEffect = (event: any) => {
    const button = event.currentTarget
    const ripple = document.createElement('span')
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    ripple.style.width = ripple.style.height = `${diameter}px`
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`
    ripple.classList.add('wave')

    const rippleContainer = button.getElementsByClassName('wave')[0]

    if (rippleContainer) rippleContainer.remove()

    button.appendChild(ripple)

    setTimeout(() => ripple.remove(), 500)
}
</script>

<style scoped lang="scss">
.button {
    position: relative;
    overflow: hidden;

    background: #1a1a1a;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 10px 18px;

    font-size: 16px;
    font-weight: 500;

    user-select: none;
    transition: .3s;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
        border-color: #646cff;
        opacity: .8;
    }

    &__gray {
        background: #6f6f6f;

        &:hover {
            border-color: #303135;
        }
    }

    &__blue {
        background: #0039d6;

        &:hover {
            border-color: #303034;
        }
    }

    &__red {
        background: #bd0a0a;

        &:hover {
            border-color: #550101;
        }
    }

    &:disabled {
        cursor: no-drop;

        &:hover {
            border-color: transparent;
        }
    }
}
</style>

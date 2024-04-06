<template>
    <div class="button__wrapper">
        <button
            class="button"
            :class="{
                button__gray: isGray,
                button__blue: isBlue,
                button__red: isRed,
            }"
            :type="isSubmit ? 'submit' : 'button'"
        >
            <UIIcon
                :icon="icon"
                v-if="icon"
            />

            <template v-if="value">
                {{ $t(value ?? '') }}
            </template>
            
            <UIIcon
                :icon="iconR"
                v-if="iconR"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
import { Icon } from './index.ts'

const props = defineProps<{
	value?: String
	icon?: String
	iconR?: String
	isSubmit?: Boolean
	isDisabled?: Boolean
	isGray?: Boolean
	isBlue?: Boolean
	isBlueOutside?: Boolean
	isRed?: Boolean
}>()
props
</script>

<style scoped lang="scss">
.button {



    &__wrapper {
        position: relative;
    }

    &__wave {
        border-radius: 50%;
        transform: scale(0);
        animation: wave .5s linear;
        pointer-events: none;
        position: absolute;

        &-red {
            background: rgba(198, 56, 56, 0.4);
        }
    }
}




</style>

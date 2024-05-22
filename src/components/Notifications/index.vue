<template>
    <TransitionGroup name="list" tag="div" class="notifications">
        <template v-for="item in notifications" :key="item?.id">
            <Notification :item="item" :timer="timer || 5" />
        </template>
    </TransitionGroup>
</template>

<script setup lang="ts">
import Notification from './Notification.vue'
import { useNotifications, storeToRefs } from '../../stores'

const { notifications } = storeToRefs(useNotifications())

const props = defineProps<{
    timer?: number
}>()

props
</script>

<style scoped lang="scss">
.notifications {
    position: fixed;
    top: 50px;
    right: 30px;

    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>

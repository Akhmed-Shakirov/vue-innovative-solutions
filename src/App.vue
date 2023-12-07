<template>
    <header class="menu">
        <router-link to="/">Home</router-link>
        <router-link to="/icons">Icons</router-link>
        <router-link to="/items">Items</router-link>
        <router-link to="/store">Store</router-link>
        <router-link to="/lang">Lang</router-link>

        <div class="store">{{ count }}</div>
    </header>

    <router-view />

    <!-- <div class="section" /> -->
</template>

<script setup lang="ts">
import { useCountStore } from './stores/count'
import { storeToRefs } from 'pinia'
const { count } = storeToRefs(useCountStore())
</script>

<style scoped lang="scss">
.menu {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    .store {
        position: absolute;
        right: -200px;
    }

    a {
        color: rgba(255, 255, 255, 0.87);
        transition: .2s;

        &:hover {
            opacity: .5;
        }
    }

    .router-link-active {
        color: #41b883;

        &:hover {
            opacity: 1;
        }
    }
}

.section {
    height: 5000px;
}
</style>

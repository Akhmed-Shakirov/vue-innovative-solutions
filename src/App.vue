<template>
    <header class="menu">
        <router-link to="/">Home</router-link>
        <router-link to="/icons">Icons</router-link>
        <router-link to="/items">Items</router-link>
        <router-link to="/store">Store</router-link>
        <router-link to="/language">Language</router-link>
        <router-link to="/fetch">Fetch</router-link>
        <router-link to="/kanban">Kanban</router-link>
        <router-link to="/files">Files</router-link>
        <router-link to="/test">Test</router-link>
        <router-link to="/prototype">Prototype</router-link>
        <router-link to="/select">Select</router-link>
        <router-link to="/validator">Validator</router-link>

        <div class="store" @click="access_token = '11133', refresh_token = '22233'">{{ count }}</div>
    </header>

    <router-view />

    <Notifications :timer="5" />

    <!-- <div class="section" /> -->
</template>

<script setup lang="ts">
import { Notifications } from './components'
import { useStorage } from '@vueuse/core'
import { useCountStore, useTokenStore, storeToRefs } from './stores'

const { count } = storeToRefs(useCountStore())
const { access_token, refresh_token } = storeToRefs(useTokenStore())

const access = useStorage('access_token', '')
const refresh = useStorage('refresh_token', '')

window.addEventListener('load', () => {
  access_token.value = access.value.slice()
  refresh_token.value = refresh.value.slice()
  access.value = ''
  refresh.value = ''
})

window.addEventListener('beforeunload', () => {
  access.value = access_token.value.slice()
  refresh.value = refresh_token.value.slice()
})
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

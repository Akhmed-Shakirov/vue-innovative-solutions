<template>
    <header class="menu">
        <router-link to="/">Home</router-link>
        <router-link to="/icons">Icons</router-link>
    </header>

    <router-view />
    
    <!-- <div class="section" /> -->
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

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
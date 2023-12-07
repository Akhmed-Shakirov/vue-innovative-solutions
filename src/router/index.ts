import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        component: () => import('../views/index.vue')
    },
    {
        path: '/icons',
        component: () => import('../views/icons.vue')
    },
    {
        path: '/store',
        component: () => import('../views/store.vue')
    },
    {
        path: '/items',
        component: () => import('../views/items.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// @ts-ignore
export default router

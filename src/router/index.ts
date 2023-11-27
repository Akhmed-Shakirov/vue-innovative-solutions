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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// @ts-ignore
export default router

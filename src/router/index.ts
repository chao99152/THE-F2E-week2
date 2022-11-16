import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Landingpage',
        component: () => import(/* webpackChunkName: "about" */ '../components/Landingpage.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
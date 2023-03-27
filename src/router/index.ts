import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Landingpage',
        component: () => import(/* webpackChunkName: "about" */ '../components/Landingpage.vue')
    },
    {
        path: '/uploadpage',
        name: 'Uploadpage',
        component: () => import(/* webpackChunkName: "about" */ '../components/uploadpage/Uploadpage.vue')
    },
    {
        path: '/pdfEditpage/:pdfID',
        name: 'PdfEditpage',
        component: () => import(/* webpackChunkName: "about" */ '../components/pdfpage/pdfEditpage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes
})

export default router
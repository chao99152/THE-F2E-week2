import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Landingpage',
        component: () => import(/* webpackChunkName: "about" */ '../components/Landingpage.vue')
    },
    {
        path: '/signature',
        name: 'Signature',
        component: () => import(/* webpackChunkName: "about" */ '../components/Signature.vue')
    },
    {
        path: '/pdfEditpage/:pdfindex',
        name: 'PdfEditpage',
        component: () => import(/* webpackChunkName: "about" */ '../components/pdfEditpage.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
<template>
    <div class="fixed top-0 left-0 w-screen h-[60px]
    flex justify-between items-center px-60
     bg-bg1 z-20">
        <div class="flex justify-between items-center w-56">
            <router-link to="/">
                <img src="../assets/img/LOGO.png" alt="" class="max-h-[25px] my-auto">
            </router-link>

            <span class="tracking-[3px] border-l-2 border-l-style4 pl-3 select-none"
                v-if="router.currentRoute.value.path != '/'">簽署新文件</span>
        </div>

        <div class="flex justify-center item-center gap-x-6
        font-bold tracking-[3.5px]">
            <div class="flex justify-center items-center text-style2 select-none -mb-1">邀請他人簽署</div>

            <router-link to="/Signature">
                <div class="flex justify-center items-center
                    bg-gradient-to-t from-gradbg2 to-gradbg1
                    bg-top hover:bg-bottom bg-bgtrans1 bg-clip-text
                    text-transparent font-notosans-light cursor-pointer
                    transition-color duration-200 select-none"
                    v-if="router.currentRoute.value.path == '/'">
                    簽署新文件
                </div>
            </router-link>

            <div class="flex justify-center items-center
                    bg-gradient-to-t from-gradbg2 to-gradbg1
                    bg-top hover:bg-bottom bg-bgtrans1 bg-clip-text
                    text-transparent font-notosans-light cursor-pointer
                    transition-color duration-200 select-none" @click="toggleloginmodal">
                登入
            </div>
        </div>

        <teleport to='#modal'>
            <transition @before-enter="gsap_anim.opacity.beforeEnter" @enter="gsap_anim.opacity.Enter"
                @leave="gsap_anim.opacity.Leave">
                <LoginmodalVue v-if="loginmodal_check" @toggleloginmodal="toggleloginmodal"></LoginmodalVue>
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import LoginmodalVue from './modal/Loginmodal.vue';

import { ref } from 'vue'
import _ from 'lodash'
import gsap_anim from '../composable/gsap'
import router from '../router';

const loginmodal_check = ref(false)
const toggleloginmodal = _.throttle(() => loginmodal_check.value = !loginmodal_check.value, 800, { 'trailing': false })
</script>
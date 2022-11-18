<template>
    <div class="relative w-screen h-heit1 px-60 pb-20 
    flex justify-center items-center bg-bg2">


        <div class="w-full h-[700px] rounded-px35
        flex flex-col justify-start bg-bg1">
            <div class="h-[60px] flex justify-start items-center tracking-[3px] ">
                <div class="w-full h-full flex justify-center items-center 
                    rounded-t-px35 transition-all duration-300"
                    :class="upload_newFile ? ['text-style5', 'bg-white', 'drop-shadow-shadow3', 'select-none'] : ['text-style1', 'cursor-pointer']"
                    @click="upload_newFile = true">上傳新文件</div>
                <div class="w-full h-full flex justify-center items-center 
                    rounded-t-px35 transition-all duration-300"
                    :class="upload_newFile ? ['text-style1', 'cursor-pointer'] : ['text-style5', 'bg-white', 'drop-shadow-shadow4']"
                    @click="upload_newFile = false">
                    選擇已上傳文件</div>
            </div>
            <uploadcompVue :upload_newFile="upload_newFile" />
        </div>

        <footer class="absolute bottom-0 left-0 w-screen h-20 
        flex justify-between items-center
        bg-bg1 px-60 font-notosans-light">
            <div>a</div>
            <div class="flex justify-center items-center">
                <div class="flex justify-center items-center w-44 h-14 mr-3.5
                    rounded-full bg-white drop-shadow-shadow2 cursor-pointer
                    text-style1 hover:text-style5 tracking-widest
                    transition-all duration-200">
                    取消</div>

                <div class="flex justify-center items-center w-44 h-14
                    bg-gradient-to-t from-gradbg2 to-gradbg1
                    bg-top hover:bg-bottom bg-bgtrans1
                    rounded-full drop-shadow-shadow1 cursor-pointer
                  text-white tracking-[3px] font-notosans-light
                    transition-all duration-200">
                    開啟文件
                </div>
            </div>
        </footer>

        <teleport to='#modal'>
            <NotificationmodalVue v-if="notification_check" @togglenotificationmodal="togglenotificationmodal" />
        </teleport>

    </div>
</template>

<script setup lang="ts">
import NotificationmodalVue from './modal/Notificationmodal.vue';
import uploadcompVue from './uploadcomp.vue';

import { ref } from 'vue'
import _ from 'lodash'
import gsap_anim from '../composable/gsap'
import router from '../router';


const upload_newFile = ref(true)


const notification_check = ref(false)
const togglenotificationmodal = _.throttle(() => notification_check.value = !notification_check.value, 800, { 'trailing': false })

</script>

<style>
#upload_field {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='35' ry='35' stroke='%23A5A39C7D' stroke-width='3' stroke-dasharray='5%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 35px;
}
</style>
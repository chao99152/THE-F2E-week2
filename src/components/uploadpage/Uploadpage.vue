<template>
    <div class="relative w-screen h-heit2 flex justify-center items-center bg-bg2">
        <div class="w-pc h-[700px] rounded-px35 flex flex-col justify-start bg-bg1">
            <div class="h-[60px] flex justify-start items-center tracking-[3px] ">
                <div class="w-full h-full flex justify-center items-center  rounded-t-px35 transition-all duration-300"
                    :class="upload_newFile ? ['text-style5', 'bg-white', 'drop-shadow-shadow3', 'select-none'] : ['text-style1', 'cursor-pointer']"
                    @click="upload_newFile = true, checkfileSelected = false">上傳新文件</div>
                <div class="w-full h-full flex justify-center items-center  rounded-t-px35 transition-all duration-300"
                    :class="upload_newFile ? ['text-style1', 'cursor-pointer'] : ['text-style5', 'bg-white', 'drop-shadow-shadow4']"
                    @click="upload_newFile = false, get_pdfdata_in_localstorage()">
                    選擇已上傳文件</div>
            </div>
            <uploadcompVue :upload_newFile="upload_newFile" :pdfData="pdfData" @compeleteload="compeleteload"
                @fileSelect="fileSelect" />
        </div>

        <footer class="fixed bottom-0 left-0 w-screen h-20 
            flex place-content-center bg-bg1 font-notosans-light">
            <div class="w-pc flex justify-between items-center">
                <div></div>
                <div class="w-44 h-14 grid place-items-center rounded-full bg-bg2 drop-shadow-shadow2 text-white tracking-[3px] font-notosans-light transition-all duration-200"
                    @click="toeditPDFpage"
                    :class="(checkfileSelected && !upload_newFile) ? ['bg-gradient-to-t', 'from-gradbg2',
                    'to-gradbg1', 'bg-top', 'hover:bg-bottom', 'bg-bgtrans1', 'drop-shadow-shadow1', 'cursor-pointer'] : ''">
                    開啟文件
                </div>
                <!-- <div class="flex justify-center items-center">
                    <div
                    class="flex justify-center items-center w-44 h-14 mr-3.5 rounded-full bg-white drop-shadow-shadow2 cursor-pointer text-style1 hover:text-style5 tracking-widest transition-all duration-200">
                    取消</div>
                    <div class="w-44 h-14 grid place-items-center rounded-full bg-bg2 drop-shadow-shadow2 text-white tracking-[3px] font-notosans-light transition-all duration-200"
                        @click="toeditPDFpage"
                        :class="(checkfileSelected && !upload_newFile) ? ['bg-gradient-to-t', 'from-gradbg2',
                        'to-gradbg1', 'bg-top', 'hover:bg-bottom', 'bg-bgtrans1', 'drop-shadow-shadow1', 'cursor-pointer'] : ''">
                        開啟文件
                    </div>
                </div> -->
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import NotificationmodalVue from './modal/Notificationmodal.vue';
import uploadcompVue from './uploadcomp.vue';

import { ref, watchEffect } from 'vue'
import _ from 'lodash'
import gsap_anim from '../../composable/gsap'
import router from '../../router';

const upload_newFile = ref(true)

const checkfileSelected = ref(false)
const fileSelect = () => checkfileSelected.value = true

const pdfData = ref([])
const get_pdfdata_in_localstorage = () => {
    let pdfinlocalStorage = localStorage.getItem('pdfDataArr')
    if (!pdfinlocalStorage) return
    pdfData.value = JSON.parse(pdfinlocalStorage)
}
get_pdfdata_in_localstorage()

const compeleteload = () => {
    get_pdfdata_in_localstorage()
    upload_newFile.value = false
}

const toeditPDFpage = async () => {
    if (!checkfileSelected.value) return
    let pdfdata_Arr = [...document.getElementsByName('pdf_Datas')]
    let openfile = await pdfdata_Arr.filter(data => data.checked)
    router.push({
        path: `/pdfEditpage/${openfile[0].value}`
    })
}
</script>
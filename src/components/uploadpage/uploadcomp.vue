<template>
    <div class="h-full bg-white z-10 rounded-b-px35 p-6 transition-all duration-300 overflow-hidden">
        <label for="upload_pdf_box" v-if="props.upload_newFile" id="upload_field"
            class="w-full h-full rounded-px35 bg-white hover:bg-bg1 flex flex-col justify-center items-center gap-8 cursor-pointer select-none text-style3 text-base font-notosans-light tracking-[5px] font-medium">
            <div>點擊此處上傳</div>
            <img src="../../assets/img/pdf_icon.png" alt="" class="w-36 h-36">
            <div>(限5MB以下PDF檔)</div>
            <input id="upload_pdf_box" type="file" class="hidden" accept="application/pdf"
                @change="savePDFtolocalStorage">
        </label>
        <div v-else class="w-full h-full bg-white select-none text-style3 text-sm font-notosans-light">
            <div v-if="!props.pdfData.length" class="w-full h-full flex justify-center items-center tracking-[3px]">
                尚未上傳任何文件!
            </div>
            <div v-else class="w-full h-full">
                <div
                    class="relative w-full h-12 border-bd1 border-bc1 rounded-px30 flex justify-start items-center pl-7">
                    <input type="text" placeholder="搜尋文件名稱" v-model="searchData"
                        class="w-11/12 outline-none font-inter placeholder:text-style6" />
                    <img src="../../assets/img/charm_search.png" alt=""
                        class="absolute right-4 bottom-2 max-w-[32.5px] max-h-[32.5px]">
                </div>
                <div class="grid grid-cols-2 text-xs my-5 tracking-[3px]">
                    <div class="pl-7">名稱</div>
                    <div class="grid grid-cols-2">
                        <div>上傳時間</div>
                        <div>上次開啟</div>
                    </div>
                </div>
                <div class="w-full h-2/4 overflow-scroll scrollbarnone">
                    <div v-for="(pdf_data, index) in props.pdfData.filter(pdf => pdf.name.includes(searchData))"
                        :key="pdf_data + index">
                        <input :id="pdf_data.name + index" type="radio" name="pdf_Datas" class="hidden peer"
                            @change="emits('fileSelect')" :value="pdf_data.pdf_id">
                        <label :for="pdf_data.name + index"
                            class="h-12 grid grid-cols-2 my-2 hover:bg-bg5 active:bg-bg1 rounded-px30 cursor-pointer text-sm font-inter peer-checked:bg-bg1">
                            <div class="flex justify-start items-center pl-7">{{ pdf_data.name }}</div>
                            <div class="grid grid-cols-2">
                                <div class="flex justify-start items-center">{{
                                    pdf_data.uploadtime ? moment(pdf_data.uploadtime).format('YYYY-MM-DD hh:mm:ss') :
                                        '-'
                                }}</div>
                                <div class="flex justify-start items-center">{{
                                    pdf_data.lastopentime ? moment(pdf_data.lastopentime).format('YYYY-MM-DD hh:mm:ss')
                                        :
                                        '-'
                                }}</div>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="w-full">
                    <div class="relative flex justify-center items-center text-xs 
                                before:w-[48%] before:h-[1px] before:bg-black before:mr-auto 
                                after:w-[48%] after:h-[1px] after:bg-black after:ml-auto">or
                    </div>
                    <div class="grid place-items-center">
                        <div class="my-5 tracking-[3px]">登入觀看更多歷史文件</div>
                        <div class="w-60 flex justify-between items-center">
                            <img src="../../assets/img/fb.png" alt="" class="max-w-[80px] max-h-[80x] cursor-pointer">
                            <img src="../../assets/img/google.png" alt=""
                                class="max-w-[80px] max-h-[80x] cursor-pointer">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <teleport to='#modal'>
            <transition @beforeEnter="gsap_anim.opacity.beforeEnter" @enter="gsap_anim.opacity.Enter"
                @leave="gsap_anim.opacity.Leave">
                <Notificationmodal v-if="notification_check" :notification_msg="notification_msg"
                    @togglenotificationmodal="togglenotificationmodal" />
            </transition>
        </teleport>
        <teleport to='#modal'>
            <transition @beforeEnter="gsap_anim.opacity.beforeEnter" @enter="gsap_anim.opacity.Enter"
                @leave="gsap_anim.opacity.Leave">
                <!-- <uploadProgress :uploading_percent="uploading_percent"
                    @toggleisUploading="toggleisUploading" /> -->
                <uploadProgress v-if="isUploading" :uploading_percent="uploading_percent"
                    @toggleisUploading="toggleisUploading" />
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import Notificationmodal from './modal/Notificationmodal.vue'
import uploadProgress from './modal/uploadProgress.vue'

import { ref } from 'vue'
import _ from 'lodash'
import gsap_anim from '../../composable/gsap'
import moment from 'moment'

const props = defineProps<{
    upload_newFile: Boolean,
    pdfData: Array<object>
}>()
const emits = defineEmits<{ (e: 'compeleteload'): void, (e: 'fileSelect'): void }>()

const searchData = ref('')
const isUploading = ref(false)
const uploading_percent = ref(0)
const toggleisUploading = () => isUploading.value = !isUploading.value

const savePDFtolocalStorage = async () => {
    let updatefile = document.getElementById("upload_pdf_box").files[0];
    const reader = new FileReader(); //建立FileReader 監聽 Load 事件
    reader.readAsDataURL(updatefile);
    if (updatefile.type != "application/pdf") return togglenotificationmodal('您的檔案不是PDF檔!')
    if (updatefile.size / 1024 / 1024 > 5) return togglenotificationmodal('檔案太大了!')
    reader.addEventListener('progress', () => {
        toggleisUploading()
        const countdown = setInterval(() => {
            if (uploading_percent.value < 100) { uploading_percent.value += 1 }
        }, 20)
        setTimeout(() => { clearInterval(countdown); toggleisUploading() }, 2000)
    })
    reader.addEventListener("load", event => {
        return new Promise((resolve) => {
            let pdf_inlocalStorage = localStorage.getItem('pdfDataArr')
            let new_pdfData = {
                pdf: event.target?.result,
                name: updatefile.name.slice(0, -4),
                uploadtime: new Date(),
                lastopentime: 0,
                pdf_id: 0
            }
            if (!pdf_inlocalStorage) {
                localStorage.setItem('pdfDataArr', JSON.stringify([new_pdfData]))
            } else {
                let pdf_arr = JSON.parse(pdf_inlocalStorage)
                new_pdfData['pdf_id'] = pdf_arr.length;
                pdf_arr.unshift(new_pdfData)
                localStorage.setItem('pdfDataArr', JSON.stringify(pdf_arr))
            }
            resolve(emits('compeleteload'))
        })
    }, false);
}

const notification_check = ref(false)
const notification_msg = ref('')
const togglenotificationmodal = _.throttle((msg: string) => {
    notification_check.value = !notification_check.value
    notification_msg.value = msg
}, 800, { 'trailing': false })
</script>

<style>
#upload_field {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='35' ry='35' stroke='%23A5A39C7D' stroke-width='3' stroke-dasharray='5%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 35px;
}
</style>
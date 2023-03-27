<template>
    <div class="fixed top-0 left-0 w-screen h-screen  grid justify-center items-center z-30 font-notosans-light">
        <div
            class="relative pc:w-[830px] pc:h-[297px] flex flex-col justify-center items-center gap-8 text-style3 text-base tracking-[3px] rounded-px35 bg-white z-10">
            <span>文件創建中...</span>
            <div class="relative w-36 h-36">
                <div class="absolute overflow-hidden h-full">
                    <img src="../../../assets/img/pdf_icon2.png" alt="">
                </div>
                <div class="absolute overflow-hidden animate-loading">
                    <img src="../../../assets/img/pdf_icon.png" alt="">
                </div>
            </div>
            <!-- {{ props.uploading_percent }} -->
        </div>

        <div class="absolute top-0 w-full h-full bg-black opacity-20"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const props = defineProps<{ uploading_percent: Number }>()

const num = ref(0)
setInterval(() => {
    if (num.value < 100) {
        num.value++
    } else {
        num.value = 0
    }
}, 20)
</script>
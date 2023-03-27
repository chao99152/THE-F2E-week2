<template>
    <div class="fixed top-0 left-0 w-screen h-screen 
                flex justify-center items-center 
                z-30 font-notosans-light">
        <div class="relative pc:w-[830px] pc:h-[550px] bg-white
                    flex flex-col justify-between items-center py-4 px-6
                  text-style3 rounded-px35 z-10 select-none">
            <div class="text-xs tracking-[5px] my-2">在框格內簽下大名!</div>
            <div id="upload_sigature_box" class="createsinature w-[760px] h-[360px] outline-none"></div>

            <div class="w-full flex justify-between items-center text-sm tracking-[5px] px-2">
                <div class="text-style1 tracking-[3px] cursor-pointer" @click="reset">清除</div>
                <div class="flex justify-start item-center">
                    <div class="pc:w-[180px] pc:h-[60px]
                    flex justify-center items-center                     
                    bg-bg1 rounded-full drop-shadow-shadow2
                    text-style1 hover:text-style5 active:text-style5 
                    cursor-pointer active:scale-95" @click="emits('togglecreatesignaturemodal')">取消</div>
                    <!-- <div class="pc:w-[180px] pc:h-[60px]
                    flex justify-center items-center ml-4 
                    rounded-full drop-shadow-shadow2 transition-all duration-200 bg-bg2 text-white
                     cursor-pointer active:scale-95" :class="checkSignature ? ['bg-gradient-to-t', 'from-gradbg2', 'to-gradbg1',
                     'bg-top', 'hover:bg-bottom', 'bg-bgtrans1', 'text-white'] : ''" @click="saveImage">簽好了</div> -->
                </div>
            </div>
        </div>
        <div class="absolute top-0 w-full h-full bg-black opacity-20"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emits = defineEmits<{
    (e: 'togglecreatesignaturemodal'): void
    (e: 'get_signature_in_localstorage'): void
}>()


// 重新設定畫布
const reset = () => {
    const canvas: any = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
</script>

<style>
.createsinature {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23A5A39CFF' stroke-width='2' stroke-dasharray='4%2c8' stroke-dashoffset='2' stroke-linecap='square'/%3e%3c/svg%3e");
}
</style>
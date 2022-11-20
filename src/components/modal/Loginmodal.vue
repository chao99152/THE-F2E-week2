<template>
    <div class="fixed top-0 left-0 w-screen h-screen 
    flex justify-center items-center 
    z-30 font-notosans-light">
        <div class="relative pc:w-[830px] pc:h-[650px]         
        flex flex-col justify-start items-center text-style3
        rounded-px35 bg-white z-10">
            <span class="pc:mt-[60px] pc:text-base tracking-[5px]">快速登入</span>
            <img src="../../assets/img/LOGO.png" alt="" class="pc:mt-5 pc:w-[326px] px:h-[81.5px]">
            <div class="mt-20 text-sm tracking-[3px]">請選擇登入點點簽的方式：</div>
            <div class="pc:w-64 pc:mt-10 flex justify-between items-center">
                <img src="../../assets/img/fb.png" alt="" class="max-w-[86.25px] max-h-[86.25px] cursor-pointer">
                <span>or</span>
                <img src="../../assets/img/google.png" alt="" class="max-w-[86.25px] max-h-[86.25px] cursor-pointer">
            </div>
            <div class="mt-auto mr-24 mb-[45px] text-xs tracking-[2px]">
                登入後即表示您接受我們的<span class="font-semibold underline cursor-pointer">服務條款</span>和<span
                    class="font-semibold underline cursor-pointer">隱私政策</span>。
            </div>
            <div class="absolute bottom-4 right-4
            flex justify-center items-center
            pc:w-[180px] pc:h-[60px]
            bg-bg1 rounded-full drop-shadow-shadow2
            text-style1 hover:text-style5 active:text-style5 text-sm tracking-[5px] cursor-pointer active:scale-95
            " @click="emits('toggleloginmodal')">取消</div>
        </div>

        <div class="absolute top-0 w-full h-full bg-black opacity-20"></div>
    </div>
</template>

<script setup lang="ts">

const emits = defineEmits<{ (e: 'toggleloginmodal'): void }>()
</script>
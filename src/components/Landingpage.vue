<template>
    <div class="relative w-screen h-heit1
    bg-[url('assets/img/bg-lg.png')] bg-no-repeat bg-cover bg-center">
        <div class="absolute top-[20%] left-[57.5%]">
            <img src="../assets/img/LOGO.png" alt="">
            <img src="../assets/img/logotext.png" alt="" class="mt-8">
        </div>

        <router-link to="/Signature">
            <!-- <div class="absolute top-[50%] left-[57.5%] w-[400px] h-[117px]
            flex justify-center items-center
            bg-gradient-to-r from-gradbg2 to-gradbg1
            bg-right-bottom hover:bg-left-bottom bg-bgtrans1

            drop-shadow-shadow1 cursor-pointer
            text-lg tracking-[15px] font-notosans-light
            transition-all duration-500">
                簽署新文件
            </div> -->

            <div class="group absolute top-[50%] left-[57.5%] w-[468px]
            drop-shadow-shadow1 cursor-pointer text-base tracking-[27px] font-notosans-light">
                <div class="absolute py-10 indent-28 bg-bg1
                overflow-hidden whitespace-nowrap text-black w-full">簽署新文件</div>
                <div class="absolute py-10 indent-28 bg-bg3
                overflow-hidden whitespace-nowrap text-white
                w-0 group-hover:w-full transition-all duration-500">簽署新文件</div>
            </div>
        </router-link>
    </div>
</template>
 
<script setup lang="ts">

</script>
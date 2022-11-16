<template>
    <div class="relative w-screen h-heit1 px-60 pb-20 bg-bg2 
    flex  justify-center items-center">

        <div class="w-full h-[700px] rounded-px35 bg-bg1
        flex flex-col justify-start ">
            <div class="h-[60px] flex justify-start items-center">
                <div class="w-full h-full flex justify-center items-center 
                tracking-[3px] rounded-t-px35  text-style5 bg-white drop-shadow-shadow3">上傳新文件</div>
                <div class="w-full h-full flex justify-center items-center tracking-[3px] text-style1">選擇已上傳文件</div>
            </div>
            <div class="h-full bg-white z-10 rounded-b-px35 p-[50px]">
                <div id="upload_field" class="w-full h-full rounded-px35 bg-white hover:bg-bg1
                flex-col justify-start items-center
                cursor-pointer">
                    <div>點擊此處上傳 或 直接拖曳檔案</div>
                    <img src="../assets/img/pdf_icon.png" alt="">
                </div>

            </div>
        </div>

        <footer class="absolute bottom-0 left-0 w-screen h-20 bg-bg1">

        </footer>
    </div>
</template>

<script setup lang="ts">

</script>

<style>
#upload_field {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='35' ry='35' stroke='%23A5A39C7D' stroke-width='3' stroke-dasharray='5%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 35px;
}
</style>
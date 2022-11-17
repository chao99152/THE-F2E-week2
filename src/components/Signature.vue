<template>
    <div class="relative w-screen h-heit1 px-60 pb-20 bg-bg2 
    flex  justify-center items-center">

        <div class="w-full h-[700px] rounded-px35 bg-bg1
        flex flex-col justify-start ">
            <div class="h-[60px] flex justify-start items-center">
                <div class="w-full h-full flex justify-center items-center 
                tracking-[3px] rounded-t-px35  text-style5 bg-white drop-shadow-shadow3">上傳新文件</div>
                <div class="w-full h-full flex justify-center items-center tracking-[3px] text-style1 cursor-pointer">
                    選擇已上傳文件</div>
            </div>
            <div class="h-full bg-white z-10 rounded-b-px35 p-[50px]">
                <div id="upload_field" class="w-full h-full rounded-px35 bg-white hover:bg-bg1
                flex flex-col justify-center items-center gap-8 cursor-pointer 
                text-style3 text-lg font-notosans-light tracking-[5px] font-medium">
                    <div->點擊此處上傳 或 直接拖曳檔案</div->
                    <img src="../assets/img/pdf_icon.png" alt="" class="w-36 h-36">
                    <div>(限10MB以下PDF檔)</div>
                </div>
            </div>
        </div>

        <footer class="absolute bottom-0 left-0 w-screen h-20 
        flex justify-between items-center
        bg-bg1 px-60">
            <div>a</div>
            <div class="flex justify-center items-center">
                <div class="flex justify-center items-center w-44 h-14 mr-3.5
                    rounded-full text-style1 bg-white drop-shadow-shadow2 cursor-pointer">
                    取消</div>
                <div class="flex justify-center items-center w-44 h-14 
                    rounded-full text-white bg-bg2 drop-shadow-shadow2 cursor-pointer">
                    開啟文件</div>
            </div>
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
<template>
    <div class="h-full bg-white z-10 rounded-b-px35 p-[50px] transition-all duration-300">
        <div v-if="props.upload_newFile" id="upload_field" class="w-full h-full rounded-px35 bg-white hover:bg-bg1
                flex flex-col justify-center items-center gap-8 cursor-pointer 
                text-style3 text-lg font-notosans-light tracking-[5px] font-medium
               ">
            <div->點擊此處上傳 或 直接拖曳檔案</div->
            <img src="../assets/img/pdf_icon.png" alt="" class="w-36 h-36">
            <div>(限10MB以下PDF檔)</div>
        </div>
        <div v-else>
            <div v-if="fileData.length">
                尚未上傳任何文件
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
    upload_newFile: Boolean
}>()

const fileData = ref([])
</script>
<template>
    <div class="fixed top-0 left-0 w-screen h-screen 
    flex justify-center items-center 
    z-30 font-notosans-light">
        <div class="relative pc:w-[830px] pc:h-[297px]         
        flex justify-center items-center 
        text-style3 text-base tracking-[3px]
        rounded-px35 bg-white z-10">
            <div class="">{{ props.notification_msg }}</div>
            <div class="absolute right-4 bottom-4 w-44 h-14
                        grid place-items-center text-white rounded-full cursor-pointer 
                        bg-gradient-to-t from-gradbg2 to-gradbg1 bg-top hover:bg-bottom bg-bgtrans1 
                        drop-shadow-shadow1 tracking-[3px] font-notosans-light transition-all duration-200"
                @click="emits('togglenotificationmodal')">
                我知道了
            </div>
        </div>

        <div class="absolute top-0 w-full h-full bg-black opacity-20"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ notification_msg: String, }>()
const emits = defineEmits<{ (e: 'togglenotificationmodal'): void }>()
</script>
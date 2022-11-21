<template>
    <div class="fixed top-0 left-0 w-screen h-screen 
    flex justify-center items-center 
    z-30 font-notosans-light">
        <div class="relative pc:w-[830px] pc:h-[297px]       
        flex justify-center items-center
        text-style3 text-sm tracking-[3px]
        rounded-px35 bg-white z-10">
            <div class="">是否確定刪除該簽名?</div>
            <div class="absolute right-4 bottom-4
            flex justify-center items-center">
                <div class="w-44 h-14 flex justify-center items-center
                bg-bg1 rounded-full drop-shadow-shadow2
            text-style1 hover:text-style5 active:text-style5 tracking-[5px] cursor-pointer active:scale-95"
                    @click="emits('toggledeletesignaturemodal')">
                    取消
                </div>
                <div class="w-44 h-14 ml-4
            flex justify-center items-center 
            text-white rounded-full drop-shadow-shadow2
            bg-gradient-to-t from-gradbg2 to-gradbg1
            bg-top hover:bg-bottom bg-bgtrans1 
            transition-all duration-200
            tracking-[5px] cursor-pointer" @click="delete_signature">
                    刪除
                </div>
            </div>
        </div>

        <div class="absolute top-0 w-full h-full bg-black opacity-20"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ indexinSinatureArr: Number }>()
const emits = defineEmits<{
    (e: 'get_signature_in_localstorage'): void,
    (e: 'toggledeletesignaturemodal'): void
}>()

const delete_signature = async () => {
    await new Promise((resolve, reject) => {
        let signinlocalStorage: any = localStorage.getItem('signature')
        let signArr = JSON.parse(signinlocalStorage)
        signArr.splice(props.indexinSinatureArr, 1)
        let str_signArr = JSON.stringify(signArr)
        localStorage.setItem('signature', str_signArr)
        resolve(
            emits('toggledeletesignaturemodal'),
            emits('get_signature_in_localstorage')
        )
    })
}
</script>
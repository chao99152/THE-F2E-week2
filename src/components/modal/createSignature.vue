<template>
    <div class="fixed top-0 left-0 w-screen h-screen 
    flex justify-center items-center 
    z-30 font-notosans-light">
        <div class="relative pc:w-[830px] pc:h-[550px] bg-white
        flex flex-col justify-between items-center py-4 px-6
        text-style3 rounded-px35 z-10 select-none">
            <div class="text-xs tracking-[5px] my-2">在框格內簽下大名!</div>
            <canvas id="canvas" class="createsinature w-[760px] h-[360px]"></canvas>

            <div class="w-full flex justify-between items-center text-sm tracking-[5px] px-2">
                <div class="text-style1 tracking-[3px] cursor-pointer" @click="reset">清除</div>
                <div class="flex justify-start item-center">
                    <div class="pc:w-[180px] pc:h-[60px]
                    flex justify-center items-center                     
                    bg-bg1 rounded-full drop-shadow-shadow2
                    text-style1 hover:text-style5 active:text-style5 
                    cursor-pointer active:scale-95" @click="emits('togglecreatesignaturemodal')">取消</div>
                    <div class="pc:w-[180px] pc:h-[60px]
                    flex justify-center items-center ml-4 
                    rounded-full drop-shadow-shadow2 transition-all duration-200 bg-bg2 text-white
                     cursor-pointer active:scale-95" :class="checkSignature ? ['bg-gradient-to-t', 'from-gradbg2', 'to-gradbg1',
                     'bg-top', 'hover:bg-bottom', 'bg-bgtrans1', 'text-white'] : ''" @click="saveImage">簽好了</div>
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

let checkSignature = ref(false)

onMounted(() => {
    const canvas: any = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    // 設定線條的相關數值
    ctx.lineWidth = 1;
    // ctx.lineCap = "round";

    // 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
    let isPainting = false;

    // 取得滑鼠 / 手指在畫布上的位置
    const getPaintPosition = (e: any) => {
        const canvasSize = canvas.getBoundingClientRect();

        if (e.type === "mousemove") {
            return {
                // 使用教學e.clientX - canvasSize.left會導致跑版
                // 用參數0.4可以完美解決問題，但尚未找到參數的計算方式
                x: (e.clientX - canvasSize.left) * 0.4,
                y: (e.clientY - canvasSize.top) * 0.4,
            };
        } else {
            // 手機
            return {
                x: (e.touches[0].clientX - canvasSize.left) * 0.4,
                y: (e.touches[0].clientY - canvasSize.top) * 0.4,
            };
        }
    }

    // 開始繪圖時，將狀態開啟
    const startPosition = (e: any) => {
        e.preventDefault();
        isPainting = true;
    }

    // 結束繪圖時，將狀態關閉，並產生新路徑
    const finishedPosition = () => {
        isPainting = false;
        ctx.beginPath();
    }

    const draw = (e: any) => {
        // 滑鼠移動過程中，若非繪圖狀態，則跳出
        if (!isPainting) return;

        // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
        const paintPosition = getPaintPosition(e);
        // 移動滑鼠位置並產生圖案
        ctx.lineTo(paintPosition.x, paintPosition.y);
        ctx.stroke();
        checkSignature.value = true
    }

    // event listener 電腦板
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mouseleave", finishedPosition);
    canvas.addEventListener("mousemove", draw);

    // event listener 手機板
    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", finishedPosition);
    canvas.addEventListener("touchcancel", finishedPosition);
    canvas.addEventListener("touchmove", draw);
})

// 重新設定畫布
const reset = () => {
    const canvas: any = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkSignature.value = false
}

const saveImage = () => {
    if (!checkSignature.value) return alert('請簽名!')
    // 圖片儲存的類型選擇 png ，並將值放入 img 的 
    const canvas: any = document.getElementById("canvas");
    const newImg = canvas.toDataURL("image/png");
    let img_inlocalStorage = localStorage.getItem('signature')
    if (!img_inlocalStorage) return localStorage.setItem('signature', JSON.stringify([newImg]))

    let img_arr = JSON.parse(img_inlocalStorage)
    img_arr.unshift(newImg)
    localStorage.setItem('signature', JSON.stringify(img_arr))
    emits('get_signature_in_localstorage')
    emits('togglecreatesignaturemodal')
}
</script>

<style>
.createsinature {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23A5A39CFF' stroke-width='2' stroke-dasharray='4%2c8' stroke-dashoffset='2' stroke-linecap='square'/%3e%3c/svg%3e");
}
</style>
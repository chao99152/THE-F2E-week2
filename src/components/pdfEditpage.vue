<template>
    <div class="relative w-screen h-heit1 pb-20 
    flex justify-start items-center bg-bg2
    text-style3">
        <aside class="h-full w-[400px]
        bg-white">
            <div class="h-[15%] px-[33px]
            flex flex-col justify-center item-start gap-2
             border-b-bd1 border-bc2">
                <b class="font-extrabold h-7 px-1">文件名稱</b>
                <div class="h-7 relative hover:border-bd1 border-bc1 cursor-pointer px-1">
                    <input id="edit_filename" type="text" class="peer outline-none" maxlength="20" value="編輯文件資料">
                    <img src="../assets/img/editmark.png" alt="" class="absolute right-2 top-1 max-w-[18px] max-h-[18px]
                        peer-focus:hidden">
                </div>
            </div>
            <div class="scrollbarnone overflow-scroll h-[85%] px-[35px]
            flex flex-col justify-start item-start gap-y-3">
                <div class="mt-5 font-extrabold">我的簽名</div>
                <div v-for="(img, index) in signature_in_localStorage" class="
                signature-bg relative h-14 flex justify-center items-center 
              border-dashed hover:bg-bg1 cursor-pointer">
                    <img :src="img" alt="" class="max-h-14">
                    <img src="../assets/img/cancelbtn.png" alt="" @click="toggledeletesignaturemodal(index)"
                        class="absolute right-2 bottom-4 z-10">
                </div>

                <div class="signature-bg h-14 flex justify-center items-center 
              border-dashed hover:bg-bg1 cursor-pointer" @click="togglecreatesignaturemodal">
                    創建簽名
                    <img src="../assets/img/createsign.png" alt="" class="ml-2 max-w-[21.37px] max-h-[21.37px]">
                </div>
                <div class="signature-bg h-14 flex justify-center items-center 
              border-dashed hover:bg-bg1 cursor-pointer">
                    上傳圖片
                    <img src="../assets/img/uploadimg.png" alt="" class="ml-2 max-w-[21.37px] max-h-[21.37px]">
                </div>

            </div>
        </aside>

        <div class="h-full w-full flex justify-center items-center">
            <div class="scrollbarnone w-3/4 h-full py-8 overflow-scroll">
                <canvas id="pdfcanvas"></canvas>
            </div>
        </div>

        <footer class="absolute bottom-0 left-0 w-screen h-20 
        flex justify-between items-center
        bg-bg1 px-60 font-notosans-light">
            <div>a</div>
            <div class="flex justify-center items-center">
                <div class="flex justify-center items-center w-44 h-14 mr-3.5
                    rounded-full bg-white drop-shadow-shadow2 cursor-pointer
                    text-style1 hover:text-style5 tracking-widest
                    transition-all duration-200">
                    取消</div>

                <div class="flex justify-center items-center w-44 h-14
                    bg-gradient-to-t from-gradbg2 to-gradbg1
                    bg-top hover:bg-bottom bg-bgtrans1
                    rounded-full drop-shadow-shadow1 cursor-pointer
                  text-white tracking-[3px] font-notosans-light
                    transition-all duration-200">
                    創建文件
                </div>
            </div>
        </footer>

        <teleport to='#modal'>
            <transition @before-enter="gsap_anim.opacity.Enter" @enter="gsap_anim.opacity.Enter"
                @leave="gsap_anim.opacity.Leave">
                <createSignature v-if="createsignature_modalcheck"
                    @togglecreatesignaturemodal="togglecreatesignaturemodal"
                    @get_signature_in_localstorage="get_signature_in_localstorage" />
            </transition>
        </teleport>

        <teleport to='#modal'>
            <transition @before-enter="gsap_anim.opacity.Enter" @enter="gsap_anim.opacity.Enter"
                @leave="gsap_anim.opacity.Leave">
                <deletesignaturemodal v-if="deletesignature_modalcheck" :indexinSinatureArr="indexinSinatureArr"
                    @toggledeletesignaturemodal="toggledeletesignaturemodal"
                    @get_signature_in_localstorage="get_signature_in_localstorage" />
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import createSignature from './modal/createSignature.vue'
import deletesignaturemodal from './modal/deletesignaturemodal.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import _ from 'lodash'
import gsap_anim from '../composable/gsap'
import router from '../router'

const signature_in_localStorage = ref([])
const get_signature_in_localstorage = () => {
    let datainlocalStorage = localStorage.getItem('signature')
    if (datainlocalStorage) signature_in_localStorage.value = JSON.parse(datainlocalStorage)
}
get_signature_in_localstorage()

onBeforeMount(() => {
    let pdfData_in_localstorage: any = JSON.parse(localStorage.getItem('pdfDataArr'))
    if (!pdfData_in_localstorage) router.push({ path: '/' })

})

onMounted(() => {
    const readBlob = (blob: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.addEventListener("load", () => resolve(reader.result));
            reader.addEventListener("error", reject);
        });
    }

    const printPDF = async (pdfData: any) => {
        const Base64Prefix = "data:application/pdf;base64,";
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

        // 將檔案處理成 base64
        // pdfData = await readBlob(pdfData);

        // 將 base64 中的前綴刪去，並進行解碼
        const data = window.atob(pdfData.substring(Base64Prefix.length));

        // 利用解碼的檔案，載入 PDF 檔及第一頁
        const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
        
        const pdfPage = await pdfDoc.getPage(10);

        // 設定尺寸及產生 canvas
        const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // 設定 PDF 所要顯示的寬高及渲染
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
            canvasContext: context,
            viewport,
        };
        const renderTask = pdfPage.render(renderContext);

        // 回傳做好的 PDF canvas
        return renderTask.promise.then(() => canvas);
    }

    const pdfToImage = async (pdfData) => {
        // 設定 PDF 轉為圖片時的比例
        const scale = 1 / window.devicePixelRatio
        // 回傳圖片
        return new fabric.Image(pdfData, {
            id: "renderPDF",
            scaleX: scale,
            scaleY: scale,
        });
    }

    const show_PDF = async () => {
        const canvas = new fabric.Canvas(document.getElementById('pdfcanvas'));
        canvas.requestRenderAll();

        let pdfData_in_localstorage: any = JSON.parse(localStorage.getItem('pdfDataArr'))
        let pdf_file_str = pdfData_in_localstorage[router.currentRoute.value.params.pdfindex].pdf
        const pdfData = await printPDF(pdf_file_str);
        const pdfImage = await pdfToImage(pdfData);

        // 透過比例設定 canvas 尺寸

        canvas.setWidth(pdfImage.width / window.devicePixelRatio);
        canvas.setHeight(pdfImage.height / window.devicePixelRatio + 100);

        // 將 PDF 畫面設定為背景
        canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
    }

    show_PDF()
})

const createsignature_modalcheck = ref(false)
const togglecreatesignaturemodal = _.throttle(() => createsignature_modalcheck.value = !createsignature_modalcheck.value, 500, { 'trailing': false })

const indexinSinatureArr = ref(0)
const deletesignature_modalcheck = ref(false)
const toggledeletesignaturemodal = _.throttle((index: number) => {
    deletesignature_modalcheck.value = !deletesignature_modalcheck.value;
    indexinSinatureArr.value = index
}, 500, { 'trailing': false })
</script>

<style>
.signature-bg {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23A5A39CFF' stroke-width='1.5' stroke-dasharray='3%2c6' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
}
</style>
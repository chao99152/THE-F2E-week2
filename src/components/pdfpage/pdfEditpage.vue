<template>
    <main class="relative w-screen h-heit1  flex justify-start items-center bg-bg2 text-style3">
        <aside class="h-full w-[400px] bg-white">
            <div class="h-[15%] px-[33px] border-b-bd1 border-bc2 flex flex-col justify-center item-start gap-2">
                <b class="font-extrabold h-7 px-1">文件名稱</b>
                <div class="h-7 relative hover:border-bd1 border-bc1 cursor-pointer px-1">
                    <input id="edit_filename" type="text" class="peer outline-none" maxlength="20" v-model="fileName">
                    <img src="../../assets/img/editmark.png" alt=""
                        class="absolute right-2 top-1 max-w-[18px] max-h-[18px] peer-focus:hidden">
                </div>
            </div>
            <div class="scrollbarnone overflow-scroll h-[85%] px-[35px] flex flex-col justify-start item-start gap-y-3">
                <div class="mt-5 font-extrabold">我的簽名</div>
                <div v-for="(img, index) in signature_in_localStorage" @click="addSigntoPDF(img)"
                    class="signature-bg relative h-14 flex justify-center items-center border-dashed hover:bg-bg1 cursor-pointer">
                    <img :src="img" alt="" class="signatureArr max-h-14">
                    <div class="h-full w-8 absolute right-0 bottom-0 grid justify-start items-center z-10 pointer-events-auto"
                        @click="toggledeletesignaturemodal($event, index)">
                        <img src="../../assets/img/cancelbtn.png" alt="" class="">
                    </div>
                </div>

                <div class="signature-bg h-14 flex justify-center items-center border-dashed hover:bg-bg1 cursor-pointer"
                    @click="togglecreatesignaturemodal">
                    創建簽名
                    <img src="../../assets/img/createsign.png" alt="" class="ml-2 max-w-[21.37px] max-h-[21.37px]">
                </div>
                <!-- <div
                    class="signature-bg h-14 flex justify-center items-center border-dashed hover:bg-bg1 cursor-pointer">
                    上傳圖片
                    <img src="../assets/img/uploadimg.png" alt="" class="ml-2 max-w-[21.37px] max-h-[21.37px]">
                </div> -->

            </div>
        </aside>

        <div class="canvas_box relative h-full w-full overflow-scroll">
            <div v-for="(item, index) in pdfArr" :key="'showpage' + index"
                class="canvas_list w-full h-full grid justify-center" v-show="(index + 1) == showPage">
                <canvas></canvas>
            </div>
        </div>

        <div class="absolute bottom-20 right-4 w-20 h-8
                    grid grid-cols-3 place-items-center
                  bg-white text-black select-none">
            <span @click="changePage(-1)" :class="showPage == 1 ? ['text-style3'] : ['cursor-pointer']">-</span>
            <span>{{ showPage }}</span>
            <span @click="changePage(1)" :class="showPage == maxPage ? ['text-style3'] : ['cursor-pointer']">+</span>
        </div>

        <footer class="absolute bottom-0 left-0 h-20 w-screen 
            flex justify-between items-center bg-bg1 px-60 font-notosans-light">
            <div></div>
            <div class="flex justify-center items-center">
                <router-link to="/uploadpage">
                    <div class="group grid place-items-center w-44 h-14 
                                mr-3.5 rounded-full bg-white drop-shadow-shadow2 cursor-pointer ">
                        <span class="bg-gradient-to-t from-gradbg2 to-gradbg1
                                     bg-top group-hover:bg-bottom bg-bgtrans1 bg-clip-text
                                     text-transparent font-notosans-light cursor-pointer
                                     transition-color duration-200">取消</span>
                    </div>
                </router-link>
                <div id="create_file" @click="downloadPDF" class="grid place-items-center w-44 h-14 
                    bg-gradient-to-t from-gradbg2 to-gradbg1 bg-top hover:bg-bottom bg-bgtrans1 
                    rounded-full drop-shadow-shadow1 cursor-pointer 
                    text-white tracking-[3px] font-notosans-light transition-all duration-200">
                    下載文件
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
                    @get_signature_in_localstorage="get_signature_in_localstorage"
                    @toggledeletesignaturemodal="toggledeletesignaturemodal" />
            </transition>
        </teleport>
    </main>
</template>

<script setup lang="ts">
import createSignature from './modal/createSignature.vue'
import deletesignaturemodal from './modal/deletesignaturemodal.vue'
import { ref, reactive, onMounted } from 'vue'
import _ from 'lodash'
import gsap_anim from '../../composable/gsap'
import router from '../../router'

const signature_in_localStorage = ref([])
const get_signature_in_localstorage = () => {
    let datainlocalStorage = localStorage.getItem('signature')
    if (datainlocalStorage) signature_in_localStorage.value = JSON.parse(datainlocalStorage)
}

const showPage = ref(1);
const maxPage = ref(0)
const changePage = (num: number) => {
    if (num > 0 && showPage.value < editCanvas.length) return showPage.value += num

    if (num < 0) {
        if (showPage.value === 1) return
        showPage.value += num
    }
}

const fileName = ref('')
const pdfArr = reactive([])
const editCanvas = reactive([])
onMounted(async () => {
    get_signature_in_localstorage()
    let pdfData_in_localstorage = await JSON.parse(localStorage.getItem('pdfDataArr'))
    if (!pdfData_in_localstorage) router.push({ path: '/' })
    let pdf_file = await pdfData_in_localstorage.filter(pdf => pdf.pdf_id == router.currentRoute.value.params.pdfID)[0]
    await printPDF(pdf_file.pdf);
    for (let i = 0; i < pdfArr.length; i++) {
        show_PDF(i)
    }
    fileName.value = pdf_file.name
})

const printPDF = async (pdfData: any) => {
    const Base64Prefix = "data:application/pdf;base64,";
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

    // 將檔案處理成 base64
    // pdfData = await readBlob(pdfData);
    // 將 base64 中的前綴刪去，並進行解碼
    const data = window.atob(pdfData.substring(Base64Prefix.length));

    // 利用解碼的檔案，載入 PDF 檔及所有頁數
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    const pdfPages = await pdfDoc.numPages;
    maxPage.value = pdfPages;
    for (let i = 1; i <= pdfPages; i++) {
        // 設定尺寸及產生 canvas
        const pdfData = await pdfToCanvas(pdfDoc, i)
        pdfArr.push(pdfData)
        // console.log(pdfArr)
    }
}

const pdfToCanvas = async (pdfDoc: any, index: number) => {
    const pdfPage = await pdfDoc.getPage(index);
    let viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
    const scale = 900 / viewport.viewBox[2];
    viewport = pdfPage.getViewport({
        scale: window.devicePixelRatio * scale,
    });
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


const pdfToImage = (pdfData) => {
    // 設定 PDF 轉為圖片時的比例
    const scale = 1 / window.devicePixelRatio
    // 回傳圖片
    return new fabric.Image(pdfData, {
        id: "renderPDF",
        scaleX: scale,
        scaleY: scale,
    });
}

const show_PDF = async (page: number) => {
    const canvasList = [...document.querySelectorAll('.canvas_list')]
    let canvas = new window.fabric.Canvas(canvasList[page].querySelector('canvas'));

    // 透過比例設定 canvas 尺寸
    const pdfImage = await pdfToImage(pdfArr[page]);
    canvas.setWidth(pdfImage.width * pdfImage.scaleX);
    canvas.setHeight(pdfImage.height * pdfImage.scaleY);

    // 將 PDF 畫面設定為背景
    canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
    editCanvas.push(canvas)
}

const downloadPDF = async () => {
    const pdf = new jsPDF();
    // 將每頁canvasList製作成圖片
    await editCanvas.forEach((item, index) => {
        const image = item.toDataURL("image/png");
        // 設定背景在 PDF 中的位置及大小
        const width = pdf.internal.pageSize.width;
        const height = pdf.internal.pageSize.height;
        pdf.addImage(image, "png", 0, 0, width, height);

        if (index == editCanvas.length - 1) return
        pdf.addPage()
    })

    // 將檔案取名並下載
    pdf.save(`${fileName.value}`);
}

const addSigntoPDF = (src: string) => {
    fabric.Image.fromURL(src, (image) => {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 200;
        image.scaleX = 0.75;
        image.scaleY = 0.75;
        editCanvas[showPage.value - 1].add(image);
    });
}

const createsignature_modalcheck = ref(false)
const togglecreatesignaturemodal = _.throttle(() => createsignature_modalcheck.value = !createsignature_modalcheck.value, 500, { 'trailing': false })

const indexinSinatureArr = ref(0)
const deletesignature_modalcheck = ref(false)
const toggledeletesignaturemodal = _.throttle((e: Event, index?: number) => {
    e.stopPropagation();
    if (!isNaN(<number>index)) { indexinSinatureArr.value = <number>index }
    deletesignature_modalcheck.value = !deletesignature_modalcheck.value
}
    , 500, { 'trailing': false })
</script>

<style>
.signature-bg {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23A5A39CFF' stroke-width='1.5' stroke-dasharray='3%2c6' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
}
</style>
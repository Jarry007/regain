<template>
  <div :class="mobile ? 'mobile' : 'pc'">
    <div v-if="codeUrl">
      <div class="neum-icon">
        <canvas id="qrcodes" class="canvas"> </canvas>
      </div>
      <div class="name">单款展示</div>

      <p></p>
      <p><span class="neum-btn" @click="downloadIt">点此下载</span></p>
    </div>

    <div v-else>
      <div class="neum-card" v-for="i in list" :key="i.id">
          <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import { isMobile } from "@/utils/util";
import { getListNoAuthor} from "@/api/list";
import QRcode from "qrcode";
import {message} from 'ant-design-vue'
const topic = 'http://localhost:5000'
// import avatar from "@/assets/1212.jpg";
export default {
  setup() {
    const route = useRoute();

    let codeUrl = ref("");
    let mobile = ref(false);

    onBeforeMount(() => {
      mobile.value = isMobile();
    });

    onMounted(() => {
      if (route.query.code) {
        codeUrl.value = route.query.code;
      } else {
          console.log('jiazai')
        getList();
      }
    });
    onUpdated(() => {
      if (codeUrl.value) newQr(codeUrl.value);
    });
    
    let page = ref(1)
    let pageSize = ref(10) 
    let list = ref([])
    const getList = async () => {
     const params = {
        page: page.value,
        pageSize: pageSize.value,
      };
      try {
        const list_ = await getListNoAuthor(params);
        console.log('list',list_)
        list.value = list_.data
      } catch (error) {
        message.error(error.msg || "获取列表失败");
      }
    };

    const newQr = (text) => {
      const canvas_ = document.querySelector("#qrcodes");
      QRcode.toCanvas(canvas_, text, {
        color: { dark: "#afb3b8", light: "#e0e5ec" },
        width: 130,
      });
    };

    const downloadIt = ()=>{
        console.log('下载')
        const url = `${topic}/download/${codeUrl.value}`
        const aTag = document.createElement("a")
        aTag.download = 'xx'
        aTag.href = url
        aTag.click()
    }
    return {
      codeUrl,
      mobile,
      downloadIt,
      list
      //  avatar_
    };
  },
};
</script>

<style scoped>
.mobile {
  height: 100%;
  padding-top: 30px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background: var(--main);
   text-align: center;
}
.pc {
  text-align: center;
  background: var(--main);
  padding-top: 30px;
  margin: 0;
  width: 375px;
  height: 660px;
  /* border: 1px solid; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.neum-btn {
  cursor: pointer;
  display: inline-block;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 60px;
  text-align: center;
  color: #4b4b4b;
  width: 80%;
  height: 60px;
  box-shadow: 2px 2px 7px var(--vice1), -2px -2px 7px var(--vice2);
}
.neum-btn:active {
  color: #a0a5a8;
  box-shadow: inset 2px 2px 7px var(--vice1), inset -2px -2px 7px var(--vice2);
}

.neum-icon {
  margin: 0 auto;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  position: relative;
  box-shadow: 4px 4px 8px var(--vice1), -4px -4px 8px var(--vice2);
}
.neum-icon::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;

  box-shadow: inset 4px 4px 8px var(--vice1), inset -4px -4px 8px var(--vice2);
}
.neum-icon .canvas {
  margin: 10px;
  z-index: -1;
  position: relative;
}

.name{
    font-weight: 700;
    font-size: 1.2rem;
    color: #222;
}
</style>
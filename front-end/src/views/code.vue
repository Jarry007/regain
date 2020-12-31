<template>
  <div :class="mobile ? 'mobile' : 'pc'">
    <div v-if="codeUrl">
      <div class="neum-icon">
        <canvas id="qrcodes" class="canvas"> </canvas>
      </div>
      <div class="name">单款展示</div>

      <p></p>
      <p>
        <span v-if="isBrowser" class="neum-btn" @click="downloadIt"
          >点此下载</span
        >
        <span v-else>使用浏览器扫码，或者点击右上角选择浏览器打开</span>
      </p>

      <div style="display:flex">
<div class="cricle-btn">a</div> <div class="cricle-btn active">b</div> <div class="cricle-btn">c</div>
      </div>
      

      <div >
        <input type='range'/>
      </div>
    </div>

    <div v-else>
      <div class="neum-card" v-for="i in list" :key="i.id">
        <div>{{ i.name }}</div>

        <div class="neum-btn mini" @click="toOne(i)">——></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import { isMobile, isWeXin } from "@/utils/util";
import { getListNoAuthor } from "@/api/list";
import QRcode from "qrcode";
import { message } from "ant-design-vue";
const topic = "http://localhost:5000";
// import avatar from "@/assets/1212.jpg";
export default {
  setup() {
    const route = useRoute();

    let codeUrl = ref("");
    let mobile = ref(false);
    let isBrowser = ref(false);
    const showList = () => {
      if (route.query.code || codeUrl.value) {
        if (route.query.code) {
          codeUrl.value = route.query.code;
        }
      } else {
        getList();
      }
    };
    onBeforeMount(() => {
      mobile.value = isMobile();
      isBrowser.value = !isWeXin();
    });

    onMounted(() => {
      showList();
    });
    onUpdated(() => {
      if (codeUrl.value) newQr(codeUrl.value);
    });

    let page = ref(1);
    let pageSize = ref(10);
    let list = ref([]);
    const getList = async () => {
      const params = {
        page: page.value,
        pageSize: pageSize.value,
      };
      try {
        const list_ = await getListNoAuthor(params);

        list.value = list_.data;
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

    const downloadIt = () => {
      console.log("下载");
      const url = `${topic}/download/${codeUrl.value}`;
      const aTag = document.createElement("a");
      aTag.download = "xx";
      aTag.href = url;
      aTag.click();
    };
    // const router = useRouter()
    const toOne = (row) => {
      codeUrl.value = row.code_url;
      showList();
    };
    return {
      isBrowser,
      toOne,
      codeUrl,
      mobile,
      downloadIt,
      list,
      //  avatar_
    };
  },
};
</script>

<style scoped>
.mobile {
  height: 100%;
  padding-top: 50px;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  background: var(--main);
  text-align: center;
}
.pc {
  text-align: center;
  background: var(--main);
  padding-top: 50px;
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
}

.name {
  font-weight: 700;
  font-size: 1.2rem;
  /* color: #222; */
  color: #5060ee;
  margin: 40px auto;
}

.neum-card {
  width: 90%;
  margin-bottom: 30px;
  margin-left: 5%;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 10px;
}

.mini {
  width: 70px;
  margin-left: auto;
  height: 40px;
  line-height: 40px;
}
.cricle-btn {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  color: #fff;
  border-radius: 5px;
  background: linear-gradient(145deg, #5667ff, #4856d6);
  box-shadow: 3px 3px 10px #4452ca, -3px -3px 10px var(--vice2);
}
.cricle-btn.active{
  background: linear-gradient(145deg, #4856d6, #5667ff);
  box-shadow: 3px 3px 10px #4452ca, -3px -3px 10px var(--vice2);
}
/* .cricle-btn::after{
  content: '';
  width: 40px;
  height: 40px;
  position: absolute;
  left: 5px;
  top: 5px;
  border-radius: 50%;
  background: linear-gradient(145deg, #4856d6, #5667ff);
  box-shadow:inset 3px 3px 10px #4452ca, inset -3px -3px 10px #5c6eff;
} */
</style>
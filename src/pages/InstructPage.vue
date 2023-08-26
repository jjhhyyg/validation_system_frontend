<template>
  <div class="container">
    <div class="upper-container">
      <div class="icon-container" @click="returnToLoginPage"></div>
      <div class="image-box"></div>
      <div class="text-box">
        <div class="markdown-body">
          <MarkdownRenderer :source="md"/>
        </div>
      </div>
    </div>
  </div>
  <div class="blur-overlay">
  </div>
</template>

<script setup lang="ts">
import MarkdownRenderer from 'components/MarkdownRenderer.vue';
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {baseURL} from '../js/globalVars';
import {useRouter} from 'vue-router';
import '../css/github-markdown.css';

// markdown字符串
let md = ref('');

onMounted(() => {
  axios.get(baseURL + '/instruction').then((res) => {
    md.value = res.data;
  }).catch((err) => {
    md.value = '获取说明失败！';
    console.log(err);
  })
});

const router = useRouter();
const returnToLoginPage = () => {
  router.push('/');
}

</script>

<style lang="scss" scoped>

@import "../css/app.scss";

// 将所有内部元素移至右侧
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../assets/images/login_bg.jpg") no-repeat center center;
  background-size: cover;
}

// 清晰显示内容
.upper-container {
  z-index: 2;
  opacity: 0.8;
}

// 模糊背景
.blur-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.image-box {
  box-sizing: border-box;
  background-color: lightblue;
  height: 100px;
  width: 80vw;
  margin: 0 10px;
}

// markdown格式的文本框
.markdown-body {
  box-sizing: border-box;
  height: 70vh;
  width: 80vw;
  margin: 0 auto;
  padding: 45px;
  overflow: auto;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

// 返回登录界面按钮
.icon-container {
  z-index: 3;
  position: fixed;
  left: 30px;
  top: 80px;
  width: 32px;
  height: 32px;
  background-image: url("../assets/icons/arrow_back.png");
  background-size: cover;
  cursor: pointer;
  filter: invert(100%);

  &:hover {
    opacity: 0.8;
    @include ease(0.3s);
  }
}
</style>

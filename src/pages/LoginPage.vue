<!--An electron login page-->

<template>
  <q-page>
    <div class="container">
      <div class="blur-overlay"/>
      <div class="login-form vertical-middle on-right shadow-24 shadow-up-24">
        <div class="title">登录</div>
        <q-input filled v-model="userLoginRequest.username" label="用户名" class="q-mb-md" color="teal-10"/>
        <q-input filled v-model="userLoginRequest.password" label="密码" type="password" class="q-mb-md"
                 color="teal-10"/>
        <div class="btn-box q-mb-md q-gutter-sm">
          <q-btn flat label="登录" @click="login" color="light-blue-9" class="button"/>
          <q-separator vertical/>
          <q-btn flat label="说明" @click="checkInstruction" color="light-green-8" class="button"/>
        </div>
      </div>
    </div>
  </q-page>

</template>

<script setup lang="ts">

import {onMounted, reactive} from 'vue';
import {api} from 'boot/axios';

/*------------------ 登录 ------------------*/
import {useQuasar} from 'quasar'

const $q = useQuasar();
let userLoginRequest = reactive<any>({
  username: '',
  password: ''
});
const login = () => {
  const request = {
    username: userLoginRequest.username,
    password: userLoginRequest.password
  }
  api.post('user/login',
    request,
    {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      // 登陆成功
      if (res.data.code === 0) {
        $q.notify({
          message: '登录成功',
          color: 'green-4',
          icon: 'check_circle',
          position: 'top',
          timeout: 1000
        });
        localStorage.setItem('token', res.data.data.token);
        router.push('/');
      } else {
        $q.notify({
          message: '登录失败，请检查用户名和密码是否正确',
          color: 'red-4',
          icon: 'error',
          position: 'top',
          timeout: 1000
        });
      }
    }).catch(err => {
    if (err.response) {
      // 服务器有响应，但是状态码不是200
      $q.notify({
        message: `服务器错误：${err.response.data.message}`,
        color: 'red-4',
        icon: 'error',
        position: 'top',
        timeout: 1000
      });
    } else if (err.request) {
      // 服务器无响应
      $q.notify({
        message: `服务器无响应：${err}`,
        color: 'red-4',
        icon: 'error',
        position: 'top',
        timeout: 1000
      });
    } else {
      // 其他错误
      $q.notify({
        message: `其他错误：${err}`,
        color: 'red-4',
        icon: 'error',
        position: 'top',
        timeout: 1000
      });
    }
  })
}

/*------------------ 说明 ------------------*/
import {useRouter} from 'vue-router';

const router = useRouter();
const checkInstruction = () => {
  router.push('/visitor/instruction');
}

/*------------------ 设置窗口大小 ------------------*/
onMounted(() => {
  // 设置窗口大小
  // window.resizeTo(800, 600);
});


</script>

<style lang="scss" scoped>

@import "../css/app.scss";
@import "../css/quasar.variables.scss";

// 将所有内部元素移至右侧
.container {
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  background: url("../assets/images/login_bg.jpg") no-repeat center center;
  background-size: cover;
  font-family: Helvetica, Tahoma, Arial, "Microsoft YaHei", "微软雅黑", sans-serif;
}

// 模糊背景
.blur-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.login-form {
  z-index: 1;
  height: 70vh;
  width: 35vw;
  border-radius: $generic-border-radius;
  margin-right: 5vw;
  background-color: $blue-grey-1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid $blue-grey-2;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #000000;
  margin: 20px 0 10px 0;
  opacity: 0.9;
}

.btn-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.button {
  width: 50%;
}

</style>

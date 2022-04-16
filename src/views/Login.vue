<template>
  <el-card id="login">
    <h2>{{ isCreateUser ? "用户注册" : "用户登陆" }}</h2>
    <h5>便签笔记</h5>
    <h4>{{ isCreateUser ? "手机号验证暂时用不了 直接注册就行" : "" }}</h4>
    <div class="input">
      <!-- 登录逻辑 -->
      <el-input
        v-model.trim="userData.username"
        v-show="!isCreateUser"
        :prefix-icon="User"
        clearable
        autofocus
        placeholder="Please input username"
      />
      <el-input
        v-model.trim="userData.password"
        v-show="!isCreateUser"
        :prefix-icon="SwitchButton"
        clearable
        show-password
        placeholder="Please input password"
      />
      <!-- 注册逻辑 -->
      <el-input
        v-model.trim="creareUserData.username"
        v-if="isCreateUser"
        :prefix-icon="User"
        clearable
        placeholder="Please input username"
      />
      <el-input
        v-model.trim="creareUserData.password"
        v-if="isCreateUser"
        :prefix-icon="SwitchButton"
        clearable
        show-password
        placeholder="Please input password"
      />
      <el-input
        disabled
        v-model.trim="creareUserData.phoneNumber"
        v-if="isCreateUser"
        :prefix-icon="Phone"
        clearable
        placeholder="Please input phone number"
      >
        <template #append>
          <el-button :icon="Select" @click="btnPIN"></el-button>
        </template>
      </el-input>
      <el-input
        disabled
        v-model.trim="creareUserData.PIN"
        v-if="isCreateUser"
        clearable
        placeholder="Please input PIN"
      >
        <template #prepend>PIN</template>
      </el-input>
    </div>

    <div class="button">
      <el-button @click="login" v-show="!isCreateUser" type="primary" plain
        >登录</el-button
      >
      <el-button
        @click="isCreateUser = false"
        v-show="isCreateUser"
        type="info"
        plain
        >返回</el-button
      >
      <el-button
        @click="isCreateUser = true"
        v-show="!isCreateUser"
        type="success"
        plain
        >注册</el-button
      >
      <el-button @click="createUser" v-show="isCreateUser" type="primary" plain
        >注册</el-button
      >
      <el-button @click="btnFind" v-show="!isCreateUser" type="danger" plain
        >忘记密码</el-button
      >
    </div>
  </el-card>

  <div class="vx">作者微信:Loveyless</div>

</template>

<script setup>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { User, SwitchButton, Phone, Select } from "@element-plus/icons-vue";
import router from "@/router";
import axios from "@/axios";
import { useStore } from "vuex";
const store = useStore();

//登录逻辑
const userData = reactive({
  username: "",
  password: "",
});
const login = async () => {
  const { status, username, token } = await axios.post("/login", userData);
  if (status == 200) {
    // userData.username = ""
    // userData.password = ""
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("token", token);
    router.push("/Home");
  }
};
// 自动登录
const autoLogin = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    login();
  }
};
autoLogin();

// 注册逻辑
let isCreateUser = ref(false);
const creareUserData = reactive({
  username: "",
  password: "",
  phoneNumber: "",
  PIN: "",
});

// 注册
const createUser = async () => {
  if (creareUserData.username == "" || creareUserData.password == "") {
    ElMessage({
      message: "请完整输入",
      type: "error",
    });
    return;
  }
  const { status } = await axios.post("/create_user", creareUserData);
  if (status == 200) {
    isCreateUser.value = false;
    creareUserData.username = "";
    creareUserData.password = "";
  }
};
// 发送验证码
const btnPIN = () => {};

// 忘记密码
const btnFind = () => {
  router.push("/Find");
};
</script>

<style lang="less" scoped>
#login {
  width: 700px;
  height: 400px;
  margin-left: calc(50% - 350px);
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  h2 {
    margin-bottom: 10px;
  }
  h5 {
    margin-bottom: 10px;
  }
  .input {
    width: 300px;
    margin-top: 10px;
    /deep/ .el-input {
      margin-bottom: 10px;
    }
  }
}
.vx{
  margin-top: 20px;
  font-size: 13px;
  text-align: center;
  width: 200px;
  margin-left: calc(50% - 100px);
  color: #ccc;
}
</style>
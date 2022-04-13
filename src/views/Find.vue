<template>
  <el-card id="login">

    <h2>忘记密码</h2>
    <h5>便签笔记</h5>
    <div class="input">
      <!-- 注册逻辑 -->
      <el-input v-model="forget.username" :prefix-icon="User" clearable placeholder="Please input username" />
      <el-input v-model="forget.phoneNumber" :prefix-icon="Phone" clearable placeholder="Please input phone number">
        <template #append>
          <el-button :icon="Select" @click="btnPIN"></el-button>
        </template>
      </el-input>
      <el-input v-model="forget.PIN" clearable placeholder="Please input PIN" >
         <template #prepend>PIN</template>
      </el-input>
      <el-input v-model="forget.password" :prefix-icon="SwitchButton" clearable placeholder="Please input phone password" />
    </div>

    <div class="button">
      <el-button @click="router.back()" type="info" plain>返回</el-button>
      <el-button type="primary" plain>修改</el-button>
    </div>
    
    <div style="width:300px;margin-top:10px;color:red">阿里云的那个短信不是企业用户一天只能弄10条还是几条 完全不够需求 所以此页作废 等于现在没有找回密码的功能!</div>
  </el-card>
  
</template>

<script setup>
import { defineComponent, ref,reactive, toRefs } from "vue";
import { User, SwitchButton,Phone,Select } from "@element-plus/icons-vue";
import router from "@/router";


// 忘记密码
const forget = reactive({
  username:"",
  password:"",
  phoneNumber:"",
  PIN:""
})
const btnPIN = () => {

}


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
    margin-bottom: 20px;
  }
  h5{
    margin-bottom: 20px;
  }
  .input {
    width: 300px;
    
    /deep/ .el-input{
      margin-bottom: 10px;
    }
  }
}
</style>
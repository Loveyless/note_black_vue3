<template>
  <div id="home">
    <el-card>
      <div class="top">
        <div class="left">
          <el-image
            style="width: 50px; height: 50px"
            :src="logoURL"
            :fit="fit"
          />
        </div>

        <div class="mid">笔记便签</div>

        <div class="right">
          <el-button type="primary" size="large" plain class="new_note"
            >新建笔记</el-button
          >
          <el-dropdown @command="handleCommand">
            <el-button type="primary" size="large" plain>
              分类&nbsp;<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>全部</el-dropdown-item>
                <el-dropdown-item>生活</el-dropdown-item>
                <el-dropdown-item>工作</el-dropdown-item>
                <el-dropdown-item>娱乐</el-dropdown-item>
                <el-dropdown-item>趣事</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-card>

    <el-input
    v-model="textarea2"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input"
    @blur="change"
    />

    <div class="main">
      <div class="item">
        <h3 class="title">美好一天</h3>
        <div class="date_type">
          <span>美好</span>
          <span>21/23/31</span>  
        </div>
        <div class="text">
          美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天
          美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天
          美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天
          美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好一天美好
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref,reactive, toRefs } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import logo from "../assets/logo.png";
import title from "../assets/title.png";
const store = useStore();
//图片
const logoURL = logo;
const titleURL = title;

// 下拉菜单
const handleCommand = (i) => {};


const textarea2 = ref("")

const change = ()=>{
    //在想样式怎么和逻辑更好的结合在一起
}

</script>

<style lang="less">
#home {
  .top {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      margin-left: 80px;
      margin-top: -9px;
    }
    .mid {
      font-size: 45px;
      font-family: "楷体";
      margin-top: -9px;
    }
    .right {
      margin-right: 60px;
      & .new_note {
        margin-right: 20px;
      }
    }
  }

  .main {
    width: 80%;
    margin-top: 25px;
    margin-left: 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 350px;
      height: 300px;
      margin: 20px;
      box-shadow: 0px 0px 6px rgb(211, 211, 211);
      background-color: rgb(250, 250, 250);
      border-radius: 9px;
      padding: 15px;
      overflow: auto;
      .title{
        margin-left: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .date_type{
        color: rgb(110, 110, 110);
        margin-left: 220px;
        span{
          margin-right: 5px;
        }
      }
      .text{
        margin-top: 10px;
        font-size: 17px;
      }
    }
  }
}
</style>
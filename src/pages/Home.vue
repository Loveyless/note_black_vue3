<template>
  <div id="home">
    <el-card>
      <div class="top">
        <div class="left">
          <el-image
            style="width: 50px; height: 50px"
            :src="logoURL"
          />
          <span>{{ store.state.username }}</span>
        </div>

        <div class="mid">笔记便签</div>

        <div class="right">
          <el-button
            @click="dialogFormVisible = true"
            type="primary"
            size="large"
            plain
            class="new_note"
            >新建笔记</el-button
          >
          <el-dropdown @command="handleCommand">
            <el-button type="primary" size="large" plain>
              分类&nbsp;<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="all">全部</el-dropdown-item>
                <el-dropdown-item command="life">生活</el-dropdown-item>
                <el-dropdown-item command="work">工作</el-dropdown-item>
                <el-dropdown-item command="play">娱乐</el-dropdown-item>
                <el-dropdown-item command="other">其他</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-card>

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

    <!-- 对话框 -->
    <el-dialog v-model="dialogFormVisible" title="编辑笔记">
      <div class="dialog">

        <div class="title">
          <el-input v-model="dialogForm.title" placeholder="标题" />
        </div>

        <div class="type">
          分类
          <el-select v-model="dialogForm.type" size="small" placeholder="分类">
            <el-option label="全部" value="all" />
            <el-option label="生活" value="life" />
            <el-option label="工作" value="work" />
            <el-option label="娱乐" value="play" />
            <el-option label="其他" value="other" />
          </el-select>
        </div>

        <div class="text">
          <el-input
            v-model="dialogForm.text"
            :autosize="{ minRows: 20 }"
            type="textarea"
            placeholder="输入笔记"
          />
        </div>

      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogCancel">取消</el-button>
          <el-button type="primary" @click="dialogEnter"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import axios from "@/axios"
import logo from "../assets/logo.png";
import title from "../assets/title.png";
const store = useStore();
//图片
const logoURL = logo;
const titleURL = title;

// 顶部展示下拉菜单
const handleCommand = (i) => {};


//对话框
let dialogFormVisible = ref(false);
const dialogForm = reactive({
  title: "",
  type: "all",
  text: "",
  date:null,
  dateNum:null,
  _id:store.state._id
});
//对话框取消
const dialogCancel = () => {
  dialogFormVisible = false
  dialogForm.title = ""
  dialogForm.type = "all"
  dialogForm.text = ""
}
//对话框确认
const dialogEnter = async () => {
  if(dialogForm.title == ""){
    ElMessage({
      message: '请输入标题',
      type: 'error',
    })
    return;
  }
  dialogFormVisible = false
  dialogForm.date = new Date().toLocaleString()
  dialogForm.dateNum = Date.now()
  await axios.post("/note",{...dialogForm})
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
      .title {
        margin-left: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .date_type {
        color: rgb(110, 110, 110);
        margin-left: 220px;
        span {
          margin-right: 5px;
        }
      }
      .text {
        margin-top: 10px;
        font-size: 17px;
      }
    }
  }

  .dialog{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .title{

    }
    .type{
      font-size: 15px;
      color: rgb(124, 124, 124);
      margin: 10px 0 10px 250px;
    }
    .text{
      width: 80%;
    }
  }
}
</style>
<template>
  <div id="home">
    <el-card>
      <div class="top">
        <div class="left">
          <el-image style="width: 50px; height: 50px" :src="logoURL" />
          <div>{{ username }}</div>
        </div>

        <div class="mid">笔记便签</div>

        <div class="right">
          <el-button
            @click="Create_note"
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
                <el-dropdown-item command="全部">全部</el-dropdown-item>
                <el-dropdown-item command="生活">生活</el-dropdown-item>
                <el-dropdown-item command="工作">工作</el-dropdown-item>
                <el-dropdown-item command="娱乐">娱乐</el-dropdown-item>
                <el-dropdown-item command="其他">其他</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button
            @click="quit"
            type="primary"
            size="large"
            plain
            class="quit"
            >退出登录</el-button
          >
        </div>
      </div>
    </el-card>

    <div class="main" v-show="noteData.length != 0">
      <!-- 笔记 -->
      <div class="item" v-for="item in noteData" :key="item.dateNum">
        <h3 class="title">
          <div class="text">{{ item.title }}</div>
          <!-- 编辑删除 -->
          <div class="icon">
            <el-icon @click="editNote(item.dateNum)"><edit /></el-icon>

            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="red"
              title="确认删除?"
              @confirm="deleteNote(item.dateNum)"
            >
              <template #reference>
                <el-icon><delete /></el-icon>
              </template>
            </el-popconfirm>
          </div>
        </h3>
        <div class="date_type">
          <div>分类:{{ item.type }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="text" v-text="item.text"></div>
      </div>
    </div>

    <!-- 空状态 -->
    <el-empty
      v-show="noteData.length == 0"
      :image-size="300"
      description="还没有笔记"
    >
      <el-button type="primary" @click="Create_note">新建笔记</el-button>
    </el-empty>

    <!-- 对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="编辑笔记"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <div class="dialog">
        <div class="title">
          <el-input
            v-model="dialogForm.title"
            placeholder="标题"
            maxlength="15"
          />
        </div>

        <div class="type">
          分类
          <el-select v-model="dialogForm.type" size="small">
            <el-option label="全部" value="全部" />
            <el-option label="生活" value="生活" />
            <el-option label="工作" value="工作" />
            <el-option label="娱乐" value="娱乐" />
            <el-option label="其他" value="其他" />
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
          <el-button type="primary" @click="dialogEnter">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  getCurrentInstance,
  watch,
} from "vue";
import { ArrowDown, Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import axios from "@/axios";
import logo from "../assets/logo.png";
import title from "../assets/title.png";
import router from "@/router";
const store = useStore();
//图片
const logoURL = logo;
const titleURL = title;
// ctx.$forceUpdate()
const { ctx } = getCurrentInstance();
console.log(ctx);
//用户名
const username = ref(window.localStorage.getItem("username"));
localStorage;

//初始便签数据
let _noteData = ref([]);
//加工后
let noteData = ref([]);

// 顶部展示下拉菜单
const handleCommand = (type) => {
  if (type == "全部") {
    noteData.value = _noteData.value;
  } else {
    noteData.value = _noteData.value.filter((v, i, arr) => {
      return v.type == type;
    });
  }
};

//获取便签
const getNote = async () => {
  const { data } = await axios.get("/note");
  _noteData.value = data.sort((a, b) => {
    return b.dateNum - a.dateNum;
  });
  noteData.value = _noteData.value;
};
getNote();

//删除便签
const deleteNote = async (dataNum) => {
  await axios.get(`/note_delete?dateNum=${dataNum}`);
  getNote();
};

//对话框
let dialogFormVisible = ref(false);
const dialogForm = reactive({
  title: "",
  type: "全部",
  text: "",
  date: null,
  dateNum: null,
});

// 打开对话框为了编辑还是新建?
let isCreate = ref(true);

//新建笔记
const Create_note = () => {
  isCreate = true;
  dialogFormVisible.value = true;
  dialogForm.title = "";
  dialogForm.type = "全部";
  dialogForm.text = "";
  dialogForm.date = new Date().toLocaleString();
  dialogForm.dateNum = Date.now();
};

//编辑笔记
const editNote = async (dateNum) => {
  isCreate = false;
  dialogFormVisible.value = true;
  const arr = noteData.value.filter((v, i, arr) => {
    return v.dateNum == dateNum;
  });
  dialogForm.title = arr[0].title;
  dialogForm.text = arr[0].text;
  dialogForm.type = arr[0].type;
  dialogForm.date = new Date().toLocaleString();
  dialogForm.dateNum = dateNum; //传回去对比
  dialogForm.dataNum_update = Date.now(); //传回去更新
};

//对话框取消
const dialogCancel = () => {
  dialogFormVisible.value = false;
  dialogForm.title = "";
  dialogForm.type = "全部";
  dialogForm.text = "";
  dialogForm.date = null;
  dialogForm.dateNum = null;
};

//对话框确认
const dialogEnter = async () => {
  if (dialogForm.title == "") {
    ElMessage({
      message: "请输入标题",
      type: "error",
    });
    return;
  }
  if (isCreate) {
    var { status } = await axios.post("/note", { ...dialogForm });
  } else {
    console.log("edit");
    console.log({ ...dialogForm });
    var { status } = await axios.post("/note_update", { ...dialogForm });
  }
  if (status == 200) {
    dialogFormVisible.value = false;
    dialogForm.title = "";
    dialogForm.type = "全部";
    dialogForm.text = "";
    dialogForm.date = null;
    dialogForm.dateNum = null;
    getNote();
  }
};

//退出登录
const quit = () => {
  dialogForm.title = "";
  dialogForm.type = "全部";
  dialogForm.text = "";
  dialogForm.date = null;
  dialogForm.dateNum = null;
  window.localStorage.clear();
  router.replace("/Login");
  ElMessage({
    message: "退出登录",
    type: "success",
  });
};
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
      display: flex;
      align-items: center;
      margin-right: 10px;
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
      .quit {
        margin-left: 18px;
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
      &::-webkit-scrollbar {
        width: 5px;
        height: 10px;

        background-color: #b5b1b1;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(247, 247, 247, 0.3);
        border-radius: 10px;
        background-color: rgb(247, 247, 247);
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(219, 219, 219, 0.3);
        background-color: #dfdfdf;
      }

      .title {
        margin-left: 25px;
        margin-top: 3px;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          margin-right: 20px;
          padding-top: 10px;
          * {
            padding-left: 2px;
          }
        }
      }
      .date_type {
        color: rgb(110, 110, 110);
        margin-left: 220px;
        font-size: 13px;
        .date {
          font-size: 12px;
        }
      }
      .text {
        margin-top: 10px;
        font-size: 17px;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }

  .dialog {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .title {
    }
    .type {
      font-size: 15px;
      color: rgb(124, 124, 124);
      margin: 10px 0 10px 250px;
    }
    .text {
      width: 80%;
    }
  }
}
</style>
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", redirect: "/Login" },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Find",
    name: "Find",
    component: () => import("../views/Find.vue"),
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("../pages/Home"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//拦截器
router.beforeEach((to, from, next) => {
  if (to.path == "/login" || "find") {
    next();
  }

  //获取token
  const token = window.localStorage.getItem("token");

  if (!token) {
    next("/login");
  }

  next();
});

export default router;

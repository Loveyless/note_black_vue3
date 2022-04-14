import axios from "axios";

axios.defaults.baseURL = "http://localhost:9999";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization = window.sessionStorage.getItem("token");   //token过期怎么办呢
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {

    response = response.data;
    if (response.status == 200) {
      ElMessage({
        message: response.message,
        type: "success",
        duration: 800,
        "show-close": true,
        center:true,
      });
    } else {
      ElMessage({
        message: response.message,
        type: "error",
        duration: 800,
        "show-close":true,
        center:true,
      });
    }

    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;

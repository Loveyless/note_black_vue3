import axios from "axios";

// axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.baseURL = "http://t.plmm.site:9000";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization = window.localStorage.getItem("token");   //token过期怎么办呢
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

    const {status,message} = response.data;
    if (status == 200) {
      ElMessage({
        message: message,
        type: "success",
        duration: 800,
        "show-close": true,
        center:true,
      });
    } else {
      console.log(message);
      ElMessage({
        message: message,
        type: "error",
        duration: 800,
        "show-close":true,
        center:true,
      });
    }

    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;

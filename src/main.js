import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import config from "./common/config/config";
import store from "./store";
import { Message } from "element-ui";
//导入拖拽排序的插件
// import VueDND from "awe-dnd";
// Vue.use(VueDND);
// 添加请求全局响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Message.error(error.response.data.msg);
    return Promise.reject(error);
  }
);
// 添加请求全局请求拦截器
axios.interceptors.request.use(
  (config) => {
    let token = window.sessionStorage.getItem("token");
    if (config.token === true) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
Vue.config.productionTip = false;
Vue.prototype.$config = config;
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

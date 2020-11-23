import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import config from "./common/config/config";
Vue.config.productionTip = false;
Vue.prototype.$config = config;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

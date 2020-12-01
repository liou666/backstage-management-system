import Vue from "vue";
import VueRouter from "vue-router";
import routes from "common/config/router";

Vue.use(VueRouter);
// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch((err) => err);
// };
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("token");
  console.log(token);
  if (token) {
    if (to.path === "/login") {
      Vue.prototype.$message.error("请不要重复登录");
      return next({ name: from.name ? from.name : "index" });
    }

    next();
  } else {
    if (to.path === "/login") {
      return next();
    }
    Vue.prototype.$message.error("请先登录");
    next({ path: "/login" });
  }
});

export default router;

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: { name: "index" },
    component: "layout",
    children: [
      { meta: { title: "后台首页" }, component: "index/index" },
      { meta: { title: "商品列表" }, component: "shops/goods/list" },
      { meta: { title: "相册管理" }, component: "image/index" },
    ],
  },
  { meta: { title: "登录" }, component: "login/index" },

  {
    path: "*",
    redirect: { name: "index" },
  },
];

const getRouter = () => {
  creatRouter(routes);
  return routes;
};
const creatRouter = (arr) => {
  arr.forEach((item) => {
    if (!item.component) return;
    //去除index
    let val = getValue(item.component);
    //生成name
    item.name = item.name || val.replace(/\//g, "-");
    //生成path
    item.path = item.path || `/${val}`;
    const fn = import(`views/${item.component}.vue`);
    item.component = () => fn;
    if (item.children && item.children.length != 0) {
      creatRouter(item.children);
    }
  });
};
function getValue(str) {
  if (/index$/.test(str)) {
    let val = str.replace(/\/index$/, "");
    return val;
  } else {
    return str;
  }
}

export default getRouter();

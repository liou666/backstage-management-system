export default {
  logo: "UNI-ADMIN",
  navBar: {
    active: "0",
    list: [
      {
        name: "首页",
        subAcitve: "0",
        subMenu: [
          {
            icon: "el-icon-s-home",
            name: "后台首页",
            pathname: "index",
          },
          {
            icon: "el-icon-s-claim",
            name: "商品列表",
            pathname: "shops-goods-list",
          },
          {
            icon: "el-icon-picture",
            name: "相册管理",
            pathname: "image",
          },
        ],
      },
      {
        name: "商品",
        subAcitve: "0",
        subMenu: [
          {
            icon: "el-icon-s-home",
            name: "ss首页",
            pathname: "shops-goods-list",
          },
        ],
      },
      { name: "订单" },
      { name: "会员" },
      { name: "设置" },
    ],
  },
};

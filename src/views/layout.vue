<template>
  <div>
    <el-container style="height:100vh;overflow:hidden">
      <!-- 头部区域 -->
      <el-header class="d-flex align-items-center" style="background:#545c64">
        <a class="h5 mb-0 mr-auto text-light">{{ $config.logo }}</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | changeToString"
            v-for="(item, index) in navBar.list"
            :key="index"
          >
            {{ item.name }}</el-menu-item
          >

          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                class="mr-2"
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />summer</template
            >
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height:100%">
        <!-- slide区域 -->
        <el-aside width="150px">
          <el-menu
            style="height:100%"
            @select="slideSelect"
            :default-active="slideMenusActive"
          >
            <el-menu-item
              :index="index | changeToString"
              :key="index"
              v-for="(item, index) in slideMenus"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- main区域 -->
        <el-main
          class="bg-light "
          style="padding-bottom:60px; position:relative"
        >
          <!-- 面包屑导航 -->
          <div
            v-if="bran[0]"
            class="bg-white border-bottom mb-3"
            style="padding:20px;margin:-20px;"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                :to="{ path: item.path }"
                v-for="(item, index) in bran"
                :key="index"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <!-- 主内容区域 -->
          <router-view></router-view>

          <!-- 返回顶部 -->
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
            >
              👆
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navBar: null,
      bran: [],
    };
  },
  created() {
    this.navBar = this.$config.navBar;
    this.getRouteBran();
    this._initNavBar();
  },
  filters: {
    changeToString(value) {
      return value.toString();
    },
  },
  watch: {
    $route(to, from) {
      this.getRouteBran();
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.navBar.active,
          left: this.slideMenusActive,
        })
      );
    },
  },
  computed: {
    slideMenus() {
      return this.navBar.list[this.navBar.active].subMenu || [];
    },
    slideMenusActive: {
      get() {
        return this.navBar.list[this.navBar.active].subAcitve || "0";
      },
      set(value) {
        this.navBar.list[this.navBar.active].subAcitve = value;
      },
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == "100-1") {
        return console.log("修改");
      }
      if (key == "100-2") {
        return console.log("退出");
      }
      this.navBar.active = key;
      this.slideMenusActive = "0";
      this.$router.push({
        name: this.slideMenus[this.slideMenusActive].pathname,
      });
    },
    slideSelect(key, keyPath) {
      this.slideMenusActive = key;
      // console.log(this.bran);
      this.$router.push({ name: this.slideMenus[key].pathname });
    },
    getRouteBran() {
      const routeMatch = this.$route.matched.filter((item) => item.name);
      const arr = [];
      routeMatch.forEach((item) => {
        if (item.name === "index" || item.name === "layout") return;
        arr.push({
          name: item.name,
          path: item.path,
          title: item.meta.title,
        });
      });
      if (arr.length > 0) {
        arr.unshift({ name: "index", path: "/index", title: "后台首页" });
      }
      this.bran = arr;
    },
    _initNavBar() {
      let r = localStorage.getItem("navActive");
      if (r) {
        r = JSON.parse(r);
        this.navBar.active = r.top;
        this.slideMenusActive = r.left;
      }
    },
  },
};
</script>

<style scoped></style>

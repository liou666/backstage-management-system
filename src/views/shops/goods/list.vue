<template>
  <div style="margin:-20px; margin-bottom:0; margin-top:-1rem">
    <!-- 标签栏 -->
    <div class="bg-white px-4 ">
      <el-tabs v-model="tabIndex" @tab-click="tabItemClick">
        <el-tab-pane
          v-for="(tab, tabI) in tabName"
          :key="tabI"
          :label="tab.name"
        >
          <!-- 顶部按钮|高级搜索 -->
          <button-search
            ref="buttonSearch"
            @search="searchEvent"
            placeholder="请输入搜索的商品名称"
          >
            <template #left>
              <el-button
                @click="$router.push({ name: 'shops-goods-create' })"
                size="mini"
                type="success"
                >发布商品</el-button
              >
              <el-button size="mini" type="danger">批量删除</el-button>
              <el-button size="mini">下架</el-button>
              <el-button size="mini">推荐</el-button>
            </template>
            <!-- 表单 -->
            <template #form>
              <el-form label-width="100px" inline :model="form">
                <el-form-item class="mb-0" label="商品名称">
                  <el-input
                    size="mini"
                    v-model="form.name"
                    placeholder="商品名称"
                  ></el-input>
                </el-form-item>
                <el-form-item class="mb-0" label="商品编码">
                  <el-input
                    size="mini"
                    v-model="form.code"
                    placeholder="商品编码"
                  ></el-input>
                </el-form-item>
                <el-form-item class="mb-0" label="商品类型">
                  <el-input
                    size="mini"
                    v-model="form.type"
                    placeholder="商品类型"
                  ></el-input>
                </el-form-item>
                <el-form-item class="mb-0" label="商品分类">
                  <el-input
                    size="mini"
                    v-model="form.category"
                    placeholder="商品分类"
                  ></el-input>
                </el-form-item>
                <el-form-item class="pl-4">
                  <el-button @click="searchEvent" size="mini" type="success"
                    >搜索</el-button
                  >
                  <el-button @click="clearSeach" size="mini"
                    >清空筛选内容</el-button
                  >
                </el-form-item>
              </el-form>
            </template>
          </button-search>

          <!-- 表格区域 -->
          <el-table
            @selection-change="handleSelectionChange"
            border
            :data="tableData[tabIndex].list"
            class="my-3"
            style="width: 100%"
          >
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>
            <el-table-column label="商品信息" width="400">
              <template slot-scope="scope">
                <div class="media">
                  <img
                    style="width:60px;height:60px"
                    :src="scope.row.titlePic"
                    class="mr-3"
                    alt=""
                  />
                  <div class="media-body">
                    <h6 class="text-primary my-0">{{ scope.row.title }}</h6>
                    <p class="my-0">分类：{{ scope.row.category }}</p>
                    <p class="my-0">时间：{{ scope.row.creat_time }}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="type"
              label="商品类型"
              width="110"
            >
            </el-table-column>
            <el-table-column
              width="110"
              align="center"
              prop="sell"
              label="实际销量"
            >
            </el-table-column>
            <el-table-column
              width="110"
              align="center"
              prop="order"
              label="商品排序"
            >
            </el-table-column>
            <el-table-column
              width="160"
              align="center"
              prop="status"
              label="商品状态"
            >
              <template slot-scope="scope">
                <el-button
                  type="success"
                  @click="scope.row.isCheck == 1"
                  plain
                  size="mini"
                  >审核通过</el-button
                >
                <el-button
                  @click="scope.row.isCheck == 2"
                  class="mt-2 ml-0"
                  type="danger"
                  plain
                  size="mini"
                  >审核未过</el-button
                >
                <!-- <el-button
                  plain
                  size="mini"
                  @click="changeStatus(scope.row)"
                  :type="scope.row.status === 1 ? 'success' : 'danger'"
                  >{{ scope.row.status === 1 ? "上架" : "下架" }}</el-button
                > -->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="110"
              prop="stock"
              label="总库存"
            >
            </el-table-column>
            <el-table-column
              align="center"
              width="110"
              prop="price"
              label="价格（元）"
            >
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="d-flex justify-content-center">
                  <el-button class="m-0" size="mini" type="success" plain
                    >编辑</el-button
                  >
                  <el-button
                    @click="deleteTable(scope.$index)"
                    class="m-0"
                    size="mini"
                    type="danger"
                    plain
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div style="height:60px"></div>
          <!--底部分页 -->
          <el-footer
            class="d-flex align-items-center bg-white position-fixed"
            style="bottom:0;left:150px;right:0;z-index:9999"
          >
            <el-pagination
              :current-page="tableData[tabIndex].currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </el-footer>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import buttonSearch from "components/common/buttonSearch.vue";
export default {
  components: { buttonSearch },
  data() {
    return {
      tabIndex: 0,
      tabName: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" },
      ],
      form: {
        name: "",
        cord: "",
        type: "",
        category: "",
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    //加载数据
    tabItemClick(tab, event) {
      console.log(tab.index);
    },
    //清空筛选条件
    clearSeach() {
      this.$refs.buttonSearch[this.tabIndex].isSuperSearchShow = false;
    },
    //搜索事件
    searchEvent(e) {
      if (typeof e == "string") {
        return console.log("普通搜索" + e);
      }
      console.log("高级搜索");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取商品列表数据
    _getData() {
      for (let i = 0; i < this.tabName.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: [],
        });
        for (let j = 0; j < 10; j++) {
          this.tableData[i].list.push({
            id: j,
            title: "荣耀 V10全网通 标配版 4GB+64GB 魅力红" + i + "-" + j,
            titlePic:
              "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cf7a05df86a858a1f391a0378d8c27d.jpg?thumb=1&w=250&h=250&f=webp&q=90",
            creat_time: "2019-07-17 18:34:14",
            category: "手机",
            type: "普通商品",
            sell: 20,
            order: 100,
            status: 1,
            stock: 200,
            price: 1000,
            isCheck: 1,
            //0未审核 1通过 2未通过
          });
        }
      }
    },
    //删除单个商品
    deleteTable(index) {
      this.tableData[this.tabIndex].list.splice(index, 1);
    },
    //改变上下架状态
    changeStatus(data) {
      data.status = data.status == 1 ? 0 : 1;
    },
    handleSizeChange(val) {
      console.log(`handleSizeChange每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`handleCurrentChange当前页: ${val}`);
    },
  },
  created() {
    this._getData();
  },
};
</script>

<style></style>

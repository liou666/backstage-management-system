<template>
  <el-dialog
    top="10vh"
    width="80%"
    title="商品规格选择"
    :visible.sync="imageModel"
  >
    <el-container style="position: relative;margin:-30px -20px">
      <el-container>
        <el-aside
          style="height: 400px;;position: relative; right:0;top:0px;left:0"
          width="200px"
          class="border-right"
        >
          <!-- 侧边区域 -->
          <ul style="cursor: pointer;" class="list-group list-group-flush">
            <li
              v-for="(item, index) in sku_card"
              :key="index"
              @click="tabClick(index)"
              :class="{ active: currentIndex === index }"
              class="list-group-item  list-group-item-action"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-aside>
        <el-container>
          <el-header style="line-height:60px" class=" border-top border-bottom">
            <el-button @click="chooseAll" size="mini" type="primary">{{
              isChooseAll ? "取消全选" : "全选"
            }}</el-button>
          </el-header>
          <el-main
            style="height:400px; position: relative; right:0;top:10px;left:0"
          >
            <!-- 内容 -->

            <span
              style="cursor: pointer;"
              :class="{ actived: item.isChecked }"
              @click="itemClick(item)"
              class="border rounded py-2 px-3 mr-2"
              v-for="(item, index) in skuListItem"
              :key="index"
              >{{ item.name }}</span
            >
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="imageModel = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      imageModel: false,
      callback: "",
      //图片管理的数据
      currentIndex: 0,
      chooseList: [],
      sku_card: [
        {
          name: "颜色",
          type: 0, //规格 0无 1颜色 2图片,
          list: [
            { id: 1, isChecked: false, name: "黄色", color: "", image: "" },
            { id: 2, isChecked: false, name: "红色", color: "", image: "" },
          ],
        },
        {
          name: "尺寸",
          type: 0, //规格 0无 1颜色 2图片,
          list: [
            { id: 3, isChecked: false, name: "XL", color: "", image: "" },
            { id: 4, isChecked: false, name: "XXL", color: "", image: "" },
          ],
        },
      ],
    };
  },
  created() {},
  computed: {
    skuListItem() {
      return this.sku_card[this.currentIndex].list;
    },
    isChooseAll() {
      return this.chooseList.length == this.skuListItem.length;
    },
  },
  methods: {
    showSkuDialog(callback) {
      this.callback = callback;
      this.imageModel = true;
    },
    hideSkuDialog() {
      this.imageModel = false;
      this.unChooseAll();
    },
    confirm() {
      const item = this.sku_card[this.currentIndex];
      this.callback({
        name: item.name,
        type: item.type,
        list: this.chooseList,
      });
      //-------------
      this.hideSkuDialog();
    },

    tabClick(index) {
      this.currentIndex = index;
      this.unChooseAll();
    },
    itemClick(item) {
      if (!item.isChecked) {
        this.chooseList.push(item);
        item.isChecked = true;
      } else {
        this.chooseList = this.chooseList.filter((v) => v.id !== item.id);
        item.isChecked = false;
      }
    },
    chooseAll() {
      let list = this.sku_card[this.currentIndex].list;
      if (!this.isChooseAll) {
        this.chooseList = list.map((v) => {
          v.isChecked = true;
          return v;
        });
      } else {
        this.unChooseAll();
      }
    },
    unChooseAll() {
      let list = this.sku_card[this.currentIndex].list;
      this.chooseList = [];
      list.forEach((v) => {
        v.isChecked = false;
      });
    },
  },
};
</script>

<style scoped>
.actived {
  background: rgb(0, 123, 255);
  color: #fff;
}
</style>

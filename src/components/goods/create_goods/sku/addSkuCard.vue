<template>
  <div class="mb-3 card" style="line-height:1.2">
    <div class="card-header d-flex align-items-center">
      规格项：
      <el-input
        style="width:200px"
        size="mini"
        placeholder="请输入内容"
        :value="item.name"
        @input="vModel('name', index, $event)"
      >
      </el-input
      ><el-button
        @click="showDialog"
        size="mini"
        icon="el-icon-more"
        style="background:#f4f4f4"
      ></el-button>
      <!-- 单选框的绑定要做el-radio-group中进行 -->
      <el-radio-group
        :value="item.type"
        @input="vModel('type', index, $event)"
        class="mr-auto"
      >
        <el-radio class="m-0  mx-3" :label="0">无</el-radio>
        <el-radio class="m-0 mr-3" :label="1">颜色</el-radio>
        <el-radio class="m-0" :label="2">图片</el-radio>
      </el-radio-group>
      <div>
        <el-button icon="el-icon-top" type="text"></el-button>
        <el-button icon="el-icon-bottom" type="text"></el-button>
        <el-button @click="deleteGoodsSku(index)" size="mini" type="danger"
          >删除</el-button
        >
      </div>
    </div>
    <div class="card-body">
      <sku-care-child :index="index" :type="item.type" />
      <el-button @click="addSkuValue(index)" type="text"
        >+ 增加规格值</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import skuCareChild from "./skuCareChild.vue";
export default {
  inject: ["app"],
  props: {
    index: { type: Number },
    item: { type: Object },
  },
  components: { skuCareChild },
  computed: {},
  methods: {
    ...mapMutations(["deleteGoodsSku", "vModelSku", "addSkuValue"]),
    vModel(key, index, value) {
      this.vModelSku({ key, index, value });
    },
    showDialog() {
      this.app.showSkuDialog((v) => {
        this.vModel("name", this.index, v.name);
        this.vModel("type", this.index, v.type);
        this.vModel("list", this.index, v.list);
      });
    },
  },
};
</script>

<style></style>

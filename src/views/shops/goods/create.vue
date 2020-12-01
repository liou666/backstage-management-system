<template>
  <div
    class="bg-white px-3"
    style="margin:-20px; margin-bottom:0; margin-top:-1rem"
  >
    <router-link to="/shops/goods/list">
      <el-button
        style="top:12px;left:180px"
        class="position-absolute"
        size="mini"
        >返回商品列表</el-button
      >
    </router-link>
    <!-- Tab标签页 -->
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="基础设置">
        <base-create />
      </el-tab-pane>

      <el-tab-pane label="商品规格">
        <el-form>
          <el-form-item label="商品规格">
            <!-- -----------------------------不懂这里的$event ------------------------->
            <el-radio-group
              :value="sku_type"
              @input="vModel('sku_type', $event)"
            >
              <el-radio-button size="mini" :label="0">单一规格</el-radio-button>
              <el-radio-button size="mini" :label="1">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 单一规格 -->
        <template v-if="sku_type === 0">
          <single-attrs />
        </template>
        <!-- 多规格 -->
        <template v-else>
          <!-- 添加规格卡片 -->

          <el-form ref="form" label-width="80px">
            <el-form-item label="添加规格">
              <add-sku-card
                :item="item"
                :index="index"
                :key="index"
                v-for="(item, index) in sku_card"
              />
              <el-button @click="addGoodsSku" size="mini" type="success"
                >添加规格</el-button
              >
            </el-form-item>
          </el-form>
          <el-form label-width="80px">
            <el-form-item label="批量设置">
              <el-button type="text">销售价</el-button>
              <el-button type="text">市场价</el-button>
              <el-button type="text">成本价</el-button>
              <el-button type="text">库存</el-button>
              <el-button type="text">体积</el-button>
              <el-button type="text">重量</el-button>
            </el-form-item>
            <el-form-item label="规格设置">
              <sku-table />
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
      <el-tab-pane label="商品详情">商品详情</el-tab-pane>
      <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BaseCreate from "components/goods/create_goods/base_create.vue";
import SingleAttrs from "components/goods/create_goods/singleAttrs.vue";
import AddSkuCard from "components/goods/create_goods/sku/addSkuCard.vue";
import SkuTable from "components/goods/create_goods/sku/skuTable.vue";
export default {
  data() {
    return {
      tabIndex: 0,
    };
  },
  components: {
    BaseCreate,
    SingleAttrs,
    AddSkuCard,
    SkuTable,
  },
  computed: {
    ...mapState({
      sku_card: (state) => state.goods_create.sku_card,
      inputFormat: (state) => state.goods_create.inputFormat,
      radioFormat: (state) => state.goods_create.radioFormat,
      sku_type: (state) => state.goods_create.sku_type,
      market_price: (state) => state.goods_create.market_price,
      sell_price: (state) => state.goods_create.sell_price,
      deal_price: (state) => state.goods_create.deal_price,
      weight: (state) => state.goods_create.weight,
      volume: (state) => state.goods_create.volume,
    }),
  },
  methods: {
    ...mapMutations(["vModelState", "addGoodsSku"]),
    vModel(key, value) {
      this.vModelState({ key, value });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleChange(value) {
      // console.log(value);
    },
  },

  mounted() {},
};
</script>

<style></style>

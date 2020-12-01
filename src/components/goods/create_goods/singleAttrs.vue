<template>
  <el-form>
    <el-form-item label="市场价格">
      <el-input
        :value="market_price"
        @input="vModel('market_price', $event)"
        style="width:200px"
        placeholder="0"
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input
        :value="sell_price"
        @input="vModel('sell_price', $event)"
        style="width:200px"
        placeholder="0"
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="成本价格">
      <el-input
        :value="deal_price"
        @input="vModel('deal_price', $event)"
        style="width:200px"
        placeholder="0"
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input
        :value="weight"
        @input="vModel('weight', $event)"
        style="width:200px"
        placeholder="0"
      >
        <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品体积">
      <el-input
        :value="volume"
        @input="vModel('volume', $event)"
        style="width:200px"
        placeholder="0"
      >
        <template slot="append">立方米</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      market_price: (state) => state.goods_create.market_price,
      sell_price: (state) => state.goods_create.sell_price,
      deal_price: (state) => state.goods_create.deal_price,
      weight: (state) => state.goods_create.weight,
      volume: (state) => state.goods_create.volume,
    }),
  },
  methods: {
    ...mapMutations(["vModelState"]),
    vModel(key, value) {
      this.vModelState({ key, value });
    },
  },
};
</script>

<style></style>

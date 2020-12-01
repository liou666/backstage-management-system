<template>
  <table class="table text-center table-sm table-bordered">
    <thead>
      <tr>
        <th
          v-for="(th, index) in tableThs"
          :key="index"
          scope="col"
          :colspan="th.colspan"
          :rowspan="th.rowspan"
          style="vertical-align: middle;"
        >
          {{ th.name }}
        </th>
      </tr>
      <tr>
        <th
          scope="col"
          colspan="1"
          rowspan="1"
          style="vertical-align: middle;"
          v-for="(th, index) in skuLable"
          :key="index"
        >
          {{ th.name }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <th v-for="(sku, skuI) in item.skus" :key="skuI" scope="row">
          {{ sku.name }}
        </th>
        <td>
          <i class="btn btn-light el-icon-plus"> </i>
        </td>
        <td>
          <input
            class="text-center p-0 form-control"
            style="width:80px;font-size:14px"
            :value="item.sell_price"
          />
        </td>
        <td>{{ item.market_price }}</td>
        <td>{{ item.deal_price }}</td>
        <td>{{ item.stock }}</td>
        <td>{{ item.volume }}</td>
        <td>{{ item.weight }}</td>
        <td>{{ item.code }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters(["tableThs", "tableData", "skuLable"]),
    ...mapState({
      sku_card: (state) => state.goods_create.sku_card,
    }),
  },
};
</script>

<style></style>

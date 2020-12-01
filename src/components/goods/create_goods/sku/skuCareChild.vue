<template>
  <div class="d-flex">
    <div
      v-for="(item, indey) in sku_card[index].list"
      :key="indey"
      style="width:150px ;height:50px"
      class="d-flex  mr-2 py-2 justify-content-center border position-relative align-items-center"
    >
      <div class="mr-2" v-if="type !== 0">
        <!-- 颜色 选择器-->
        <el-color-picker v-if="type == 1" size="mini"></el-color-picker>
        <!-- 图片选择器 -->
        <template v-if="type == 2">
          <span
            v-if="!item.image"
            @click="chooseImage(index, indey)"
            style="width:30px;height:30px"
            class="d-flex align-items-center justify-content-center btn btn-light "
            ><i class="el-icon-plus"> </i
          ></span>
          <img
            class="rounded"
            v-else
            @click="chooseImage(index, indey)"
            style="cursor: pointer;;width:30px;height:30px"
            :src="item.image"
            alt=""
          />
        </template>
      </div>

      <input
        type="text"
        class="text-center form-control"
        style="width:80px;font-size:14px"
        @input="
          editSkuValue({
            index,
            indey,
            key: item.name,
            value: $event.target.value,
          })
        "
        :value="item.name"
      />

      <span
        @click="deleteSkuValue({ index, indey })"
        class="p-0  position-absolute btn btn-light "
        style="line-height:1rem;right:-10px;top:-10px"
      >
        <i class="el-icon-circle-close"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  inject: ["app"],
  props: {
    type: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sku_card: (state) => state.goods_create.sku_card,
    }),
  },
  methods: {
    ...mapMutations(["deleteSkuValue", "editSkuValue"]),
    chooseImage(index, indey) {
      this.app.show((v) => {
        this.editSkuValue({
          index,
          indey,
          key: "image",
          value: v[0].url,
        });
      });
    },
  },
};
</script>

<style></style>

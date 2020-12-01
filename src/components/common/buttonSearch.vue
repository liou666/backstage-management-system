<template>
  <div>
    <!-- 左边 -->
    <div class="d-flex">
      <slot name="left"></slot>
      <!-- 右边 -->
      <slot name="right">
        <div v-show="!isSuperSearchShow" class="ml-auto">
          <el-input
            class=" mr-2"
            style="width:200px"
            size="mini"
            v-model="keyword"
            :placeholder="placeholder"
          ></el-input>
          <el-button
            @click="$emit('search', keyword)"
            size="mini"
            type="success"
            >搜索</el-button
          >
          <el-button @click="isSuperSearchShow = true" size="mini"
            >高级搜索</el-button
          >
        </div>
        <!-- 高级搜索 -->
      </slot>
    </div>
    <el-card v-show="isSuperSearchShow" class="my-3 bg-light box-card">
      <div slot="header" class="clearfix">
        <span>高级搜索</span>
        <el-button
          @click="isSuperSearchShow = false"
          style="float: right; padding: 3px 0"
          type="text"
          >收起
        </el-button>
      </div>
      <slot name="form"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      keyword: "",
      isSuperSearchShow: false,
    };
  },
  methods: {},
};
</script>

<style></style>

<template>
  <div id="app">
    <router-view></router-view>
    <image-dialog :max="1" ref="imageDialog" />
    <sku-dialog ref="skuDialog" />
  </div>
</template>

<script>
import imageDialog from "components/Dialog/imageDialog.vue";
import SkuDialog from "components/Dialog/skuDialog.vue";
export default {
  components: { imageDialog, SkuDialog },
  name: "app",
  provide() {
    return { app: this };
  },
  created() {
    this.$store.commit("init");
  },
  methods: {
    show(callback) {
      this.$refs.imageDialog.show(callback);
    },
    showSkuDialog(callback) {
      this.$refs.skuDialog.showSkuDialog(callback);
    },
  },
};
</script>

<style></style>

<template>
  <li
    style="cursor:pointer"
    :class="{ ' album-active': actived }"
    class=" list-group-item d-flex align-items-center"
    @click="$emit('changed', index)"
  >
    {{ item.name }}
    <span v-if="!showOptions" class="border ml-auto btn-sm btn btn-light">
      {{ item.num }}
    </span>
    <el-dropdown v-else class="ml-auto">
      <span class="border btn-sm btn btn-light">
        {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.stop.native="$emit('edit', { index, item })"
          >编辑</el-dropdown-item
        >
        <el-dropdown-item @click.stop.native="$emit('delete', index)"
          >删除</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </li>
</template>

<script>
export default {
  props: {
    actived: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: {},
    },
    index: {
      type: Number,
      default: 0,
    },
    showOptions: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>

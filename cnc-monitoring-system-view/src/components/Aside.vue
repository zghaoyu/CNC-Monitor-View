<template>
  <!-- <el-button class="toggle" :icon="isCollapse ? ArrowRightBold : ArrowLeftBold" @click="toggleCollapse" /> -->
  <el-menu default-active="dashboard" class="el-menu-vertical" :collapse="isCollapse" @open="handleOpen"
    @close="handleClose" :router="true" :collapse-transition="false">
    <!-- <el-menu-item> -->
    <div class="toggle-button" @click="toggleCollapse">
      <el-icon>
        <ArrowRightBold v-if="isCollapse"></ArrowRightBold>
        <ArrowLeftBold v-else></ArrowLeftBold>
      </el-icon>
    </div>
    <!-- </el-menu-item> -->

    <el-menu-item index="dashboard">
      <el-icon>
        <House />
      </el-icon>
      <template #title>Dashboard</template>
    </el-menu-item>

    <el-menu-item index="analytics">
      <el-icon>
        <Histogram />
      </el-icon>
      <template #title>Analytics</template>
    </el-menu-item>

    <el-menu-item index="settings">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>Setting</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Setting,
  Histogram,
  House,
  ArrowRightBold,
  ArrowLeftBold
} from '@element-plus/icons-vue'

// 默认折叠
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// 切换折叠
function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}

//向父组件传递事件
const emit = defineEmits(['collapse'])

emit('collapse', isCollapse.value)
</script>

<style scoped>
/* .el-menu-vertical:not(.el-menu--collapse) {
  width: auto;
} */
.el-menu-vertical {
  background-color: var(--aside-bg-color);
  height: 100%;
}

.toggle-button {
  display: flex;
  align-items: center;
  height: var(--el-menu-item-height);
  line-height: var(--el-menu-item-height);
  font-size: var(--el-menu-item-font-size);
  color: var(--el-menu-text-color);
  padding: 0 var(--el-menu-base-level-padding);
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration), color var(--el-transition-duration);
  box-sizing: border-box;
  white-space: nowrap;
}
</style>

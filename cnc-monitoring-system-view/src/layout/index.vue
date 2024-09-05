<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="isCollapse?'0':'100'">
          <Aside @collapse="(res) => isCollapse = res"></Aside>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';
import {ref} from 'vue'
const isCollapse = ref(true)
</script>

<!-- 全局 -->
<style>
html,
body,
#app,
.common-layout,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}

</style>

<style scoped>

.common-layout .el-header {
  height:7%;
  background-color: var(--header-bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.common-layout .el-main{
  overflow: hidden;
  height: 100%;
  background-color: var(--theme-color);
}

</style>

  
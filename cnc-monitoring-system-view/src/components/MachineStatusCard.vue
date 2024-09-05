<template>
  <div class="card">
    <el-row>
      <el-col :span="8">
        <el-statistic title="Total" :value="total"/>
      </el-col>
      <el-col :span="8">
        <el-statistic title="Working" :value="working"/>
      </el-col>
      <el-col :span="8">
        <el-statistic title="Idle" :value="idle" >
        </el-statistic>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
const props = defineProps({
  total: {},
  working: {},
  idle:{}
})

</script>

<style scoped>
.card {
  /* background-color: white; */
  background-color: var(--status-card-bg-color);
  border-radius: 10px 10px 10px 10px;
}

.card .el-col {
  text-align: center;
}

.card .el-statistic {
  --el-statistic-content-font-size:3em;
  --el-statistic-content-color:var(--status-card-content-color);
  --el-statistic-content-font-weight:bold;
  --el-statistic-title-font-size: 1.2em;
  --el-statistic-title-color:var(--status-card-title-color);
  margin: 15%;

}
</style>

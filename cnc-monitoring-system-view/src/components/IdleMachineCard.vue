<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="card-1" shadow="never">
        <template #header>
          <div class="card-header">
            <span>Machine Idle Time</span>
          </div>
        </template>

        <div class="idle-table" v-for="data in cnc_data">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-tag>{{ data.idleMachine }}</el-tag>
            </el-col>
            <el-col :span="16">
              <span class="idle-time">{{ formatTime(data.idleTime) }}</span>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
const props = defineProps({
  cnc_data: {}
})
function formatTime(time) {
  const hour = parseInt(time / 1000 / 60 / 60)
  const min = parseInt(time / 1000 / 60 % 60)
  return hour + ' hours ' + min + ' minutes'
}
</script>


<style scoped>
.card-1 {
  width: 100%;
  height: 100%;
  align-items: center;
  border: 0px;
  color: var(--idle-card-text-color);
  border-radius: 10px 10px 10px 10px;

}

.card-header {
  display: flex;
  justify-content: space-between;
  font-size: x-large;
  color: var(--idle-card-header-text-color);
  font-weight: bold;
}


.idle-table .el-tag {
  --el-tag-font-size: 1em;
}

.idle-table .idle-time {
  font-size: 1.1em;
}

.idle-table .el-row {
  margin: 5px;
}
</style>

<style>
.el-card__header {
  border-bottom: none;
}
</style>
  
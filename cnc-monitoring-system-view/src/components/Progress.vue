<template>
    <div class="circle-progress">
        <el-progress type="circle" :percentage=90 :stroke-width="10" :width="180" :color="colors">
            <template #default="{ percentage }">
                <span class="percentage-label">CNC-077</span>
                <span class="percentage-time">00:10:20</span>
                <span class="percentage-value">{{ percentage }}%</span>
            </template>
        </el-progress>
        <el-progress type="circle" :percentage=80 :stroke-width="10" :width="180" :color="colors">
            <template #default="{ percentage }">
                <span class="percentage-label">CNC-078</span>
                <span class="percentage-time">00:20:20</span>
                <span class="percentage-value">{{ percentage }}%</span>
            </template>
        </el-progress>
        <el-progress type="circle" :percentage=70 :stroke-width="10" :width="180" :color="colors">
            <template #default="{ percentage }">
                <span class="percentage-label">CNC-079</span>
                <span class="percentage-time">00:30:20</span>
                <span class="percentage-value">{{ percentage }}%</span>
            </template>
        </el-progress>
        <el-progress type="circle" :percentage=50 :stroke-width="10" :width="180" :color="colors">
            <template #default="{ percentage }">
                <span class="percentage-label">CNC-080</span>
                <span class="percentage-time">00:40:20</span>
                <span class="percentage-value">{{ percentage }}%</span>
            </template>
        </el-progress>
        <el-progress type="circle" :percentage=30 :stroke-width="10" :width="180" :color="colors">
            <template #default="{ percentage }">
                <span class="percentage-label">CNC-081</span>
                <span class="percentage-time">00:50:20</span>
                <span class="percentage-value">{{ percentage }}%</span>
            </template>
        </el-progress>
        <el-progress type="circle" :percentage=0 :stroke-width="10" :width="180" :color="colors">
            <template #default="{ percentage }">
                <span class="percentage-label">CNC-082</span>
                <span class="percentage-time">00:00:00</span>
                <span class="percentage-value">{{ percentage }}%</span>
            </template>
        </el-progress>
    </div>
</template>

<script setup>
const colors = [
    { color: '#5cb87a', percentage: 90 },
    { color: '#e6a23c', percentage: 85 },
    { color: '#f56c6c', percentage: 60 },
]
</script>

<style scoped>
.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 23px;
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 23px;
}

.percentage-time {
    display: block;
    margin-top: 10px;
    font-size: 28px;
    color: royalblue
}

.circle-progress .el-progress--circle {
    /* margin-right: 50px; */
    margin: 40px;
    /* margin-bottom: 30px; */
}
.circle-progress{
    background-color: white;
}
</style>
  
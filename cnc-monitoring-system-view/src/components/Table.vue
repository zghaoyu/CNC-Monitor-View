<template>
    <el-table class="machine-status-table" :data="cnc_data" style="width: 100%">
        <template v-slot:empty>
            <div>Empty</div>
        </template>
        <el-table-column prop="brand" label="Brand" width="140" />
        <el-table-column prop="name" label="Name" width="120">
            <template #default="scope">
                <el-tag>{{ scope.row.name }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="140" />
        <el-table-column prop="statusStartTime" label="Start time" width="170" />
        <el-table-column prop="percentage" label="Progress">
            <template #default="scope">
                <el-progress class="processing-progress" :text-inside="true" :stroke-width="21" :color="colors"
                    :percentage="scope.row.percentage" />
            </template>
        </el-table-column>
        <el-table-column prop="simulationTime" label="Count down" width="120">
            <template #default="scope">
                <el-countdown :value="scope.row.simulationTime + Date.parse(scope.row.statusStartTime)" />
            </template>
        </el-table-column>

    </el-table>
</template>
  

<script setup>

// progress colors
const colors = [
    // { color: '#5cb87a', percentage: 90 },
    // { color: '#e6a23c', percentage: 85 },
    // { color: '#f56c6c', percentage: 60 },

    { color: '#F70044', percentage: 90 },
    { color: '#F6D600', percentage: 85 },
    { color: '#11CD86', percentage: 60 },
]

const props = defineProps({
    cnc_data: {}
})


</script >

<style scoped>
.machine-status-table {
    border-radius: 10px 10px 10px 10px;
}

.machine-status-table .el-tag {
    --el-tag-font-size: 1.1em
}

.machine-status-table {
    --el-table-border: none;
    font-size: 1em;
    color: var(--cnc-table-text-color);
    --el-table-tr-bg-color: var(--cnc-table-bg-color);
    --el-table-header-text-color: var(--cnc-table-header-text-color);
    --el-table-header-bg-color: var(--cnc-table-bg-color);
}
</style>
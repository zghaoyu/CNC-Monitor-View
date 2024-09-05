<template>
    <div class="Analytics">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="function-button">
                    <ExcelShow></ExcelShow>
                </div>
                
            </el-col>
        </el-row>
        
    </div>
</template>
<script lang="ts" setup>
    import{onActivated} from "vue"
    import ExcelShow from "../components/ExcelShow.vue";


</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.function-button {
  border-radius: 4px;
  min-height: 36px;
}
</style>
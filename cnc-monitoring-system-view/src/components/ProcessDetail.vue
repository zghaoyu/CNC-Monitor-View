<template>
  <el-table
    class="process-detail-table"
    :data="cnc_process_detail"
    style="width: 100%"
    :row-style="{height:'60px'}"
  >
    <template v-slot:empty>
      <div>Empty</div>
    </template>
    <el-table-column prop="brand" label="Brand" width="140" />
    <el-table-column prop="name" label="Name" width="120">
      <template #default="scope">
        <el-tag round type="success">{{ scope.row.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="process_detail" label="Process Detail" :formatter="cnc_process_detail.process_detail">
      <template #default="scope">



        <!-- 上下滚动效果 -->
          <!-- <i class="el-alert__icon el-icon-warning"></i>
          <div class="msg__content">
            <el-carousel
              height="24px"
              direction="vertical"
              indicator-position="none"
              :autoplay="true"
            >
              <el-carousel-item v-for="item in  scope.row.process_detail " :key="item.id" >
                <div>{{ item }}</div>
                
              </el-carousel-item>
            </el-carousel>
          </div> -->
        <!--  -->
          <TextScroll :val="scope.row.process_detail">
            <!-- <span class="roll-text" >{{ scope.row.process_detail }}</span> -->
          </TextScroll>
        
        
      </template>
    </el-table-column>
  </el-table>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getCncProcessDetail } from "../api/cnc";
import { AxiosResponse } from "axios";
import  TextScroll from "./TextScroll.vue";

const cnc_process_detail = ref([] as any[]);
const cnc_data = ref([] as any[]);
const props = defineProps({
  cnc_process_detail: {},
});

// 转换为process detail表格数据
async function loadAllProcessDetailData() {
  let data = [] as any[];

  let raw_data: never[] | AxiosResponse<any, any>;
  try {
    raw_data = await getCncProcessDetail();
  } catch {
    raw_data = [];
  }
  for (let i in raw_data) {
    let detail = [] as any[];
    detail = raw_data[i].processDetail.split(";");
    let new_data = {
      brand: raw_data[i].brand,
      name: raw_data[i].name,
      process_detail: detail,
    };
    data.push(new_data);
  }
  
  return data;
}

// 更新数据
async function updateData() {
  cnc_process_detail.value = await loadAllProcessDetailData();
  // console.log(cnc_process_detail.value)
}
onMounted(async () => {
  updateData();
  setInterval(() => {
    updateData();
  }, 1000);
});
</script >

<style scoped>
.process-detail-table {
  border-radius: 10px 10px 10px 10px;
}

.process-detail-table .el-tag {
  --el-tag-font-size: 1.1em;
}

.process-detail-table {
  --el-table-border: none;
  font-size: 1em;
  color: var(--cnc-table-text-color);
  --el-table-tr-bg-color: var(--cnc-table-bg-color);
  --el-table-header-text-color: var(--cnc-table-header-text-color);
  --el-table-header-bg-color: var(--cnc-table-bg-color);
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: rgb(200, 240, 231);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: rgb(200, 240, 231);
}

/*轮翻消息*/
.bs-sysMsg {
    position: relative;
    display: flex;
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 10px;
    border-radius: 2px;
    color: #e6a23c;
    background-color: #125aa3;
    overflow: hidden;
    opacity: 1;
    align-items: center;
    transition: opacity .2s;
}
.bs-sysMsg .msg__content {
    display: table-cell;
    padding: 0 8px;
    width: 100%;
}
.bs-sysMsg .msg__content a.item {
    color: #e6a23c;
    font-size: 18px;
    opacity: 0.75;
}
.bs-sysMsg .msg__content a.item:hover{text-decoration: underline;}

</style>
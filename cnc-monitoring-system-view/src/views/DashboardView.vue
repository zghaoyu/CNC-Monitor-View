<template>
  <div class="dashboard">
    <el-row :gutter="20">

      <el-col :span="18" class="dashboard-left">
        
            <!-- table -->
            <el-col :span="24">
              <div class="grid-content">
                <Table :cnc_data="cnc_data"></Table>
              </div>
            </el-col>
            <!-- ProcessDetail -->
            <el-col :span="24">
              <div class="grid-content-process-detail">
                <ProcessDetail :cnc_process_detail="cnc_process_detail"></ProcessDetail>
              </div>
            </el-col>
          
      </el-col>

      <!-- summary -->
      <el-col :span="6" class="dashboard-right">
        <!-- count -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content">
              <MachineStatusCard
                :total="total_machine_count"
                :working="working_machine_count"
                :idle="idle_machine_count"
              >
              </MachineStatusCard>
            </div>
          </el-col>
        </el-row>
        <!-- Idle machine list -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content">
              <IdleMachineCard :cnc_data="idle_machine_list"></IdleMachineCard>
            </div>
          </el-col>
        </el-row>
        <!-- Timeline -->
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content">
              <Timeline></Timeline>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script lang="ts" setup>
import Table from "../components/Table.vue";
import MachineStatusCard from "../components/MachineStatusCard.vue";
import IdleMachineCard from "../components/IdleMachineCard.vue";
import Timeline from "../components/Timeline.vue";
import ProcessDetail from "../components/ProcessDetail.vue";

import { ref, onMounted } from "vue";
import { getCncList ,getCncProcessDetail } from "../api/cnc";
import { AxiosResponse } from "axios";

//Testing data
// import raw_data from '../cnc.json'
const cnc_data = ref([] as any[]);
const total_machine_count = ref(0);
const working_machine_count = ref(0);
const idle_machine_count = ref(0);
const idle_machine_list = ref([] as any[]);
const cnc_process_detail = ref([] as any[]);

// 转换为表格数据
async function loadAllData() {
  let count = 0;
  let data = [] as any[];
  let raw_data: never[] | AxiosResponse<any, any>;
  try {
    raw_data = await getCncList();
  } catch {
    raw_data = [];
  }
  if (Object.keys(raw_data || []).length === 0) {
    total_machine_count.value = 0;
    working_machine_count.value = 0;
    idle_machine_count.value = 0;
  } else {
    for (let i in raw_data) {
      let new_data = {
        brand: raw_data[i].brand,
        name: raw_data[i].name,
        status: raw_data[i].status,
        statusStartTime: raw_data[i].statusStartTime,
        percentage: calculatePercentage(
          raw_data[i].statusStartTime,
          raw_data[i].simulationTime
        ),
        simulationTime: raw_data[i].simulationTime,
      };
      data.push(new_data);

      if (raw_data[i].status === "WORKING") {
        count++;
      }
    }
    total_machine_count.value = data.length;
    working_machine_count.value = count;
    idle_machine_count.value = data.length - count;
  }
  return data;
}


function calculatePercentage(statusStartTime: string, simulationTime: number) {
  let result = 0;
  //有预计时间
  if (simulationTime > 0) {
    let passTime = Date.now() - Date.parse(statusStartTime);

    if (passTime < 0) {
      result = 0;
    } else if (passTime <= simulationTime) {
      result = (passTime / simulationTime) * 100;
    } else {
      //testing
      result = 95;
    }
  }

  return Math.round(result);
}

onMounted(async () => {
  updateData();
  setInterval(() => {
    updateData();
  }, 5000);
});

// 更新数据
async function updateData() {
  cnc_data.value = await loadAllData();
  if (cnc_data.value.length > 0) {
    cnc_data.value.sort((a, b) => {
      return b.status.charCodeAt(0) - a.status.charCodeAt(0);
    });
    cnc_data.value.sort((a, b) => {
      return b.percentage - a.percentage;
    });
    let idle = [] as any[];
    for (let i in cnc_data.value) {
      if (cnc_data.value[i].status != "WORKING") {
        idle.push({
          idleMachine: cnc_data.value[i].name,
          idleTime: Date.now() - Date.parse(cnc_data.value[i].statusStartTime),
        });
      }
    }
    idle_machine_list.value = idle;
    if (idle_machine_list.value.length > 0) {
      idle_machine_list.value.sort((a, b) => {
        return b.idleTime - a.idleTime;
      });
    }
  } else {
    idle_machine_list.value = [];
  }
}

// 转换为process detail表格数据
async function loadAllProcessDetailData() {
  let count = 0;
  let data = [] as any[];
  let raw_data: never[] | AxiosResponse<any, any>;
  try {
    raw_data = await getCncProcessDetail();
  } catch {
    raw_data = [];
  }
  for (let i in raw_data) {
    let new_data = {
      brand: raw_data[i].brand,
      name: raw_data[i].name,
      process_detail: raw_data[i].process_detail.split(";"),
    };
    data.push(new_data);
  }
  console.log(data)
  return data;
}
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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.dashboard-right {
  min-width: 20vh;
}
.grid-content-process-detail {
  margin-top: 20px;
  border-radius: 4px;
  min-height: 36px;
}
</style>
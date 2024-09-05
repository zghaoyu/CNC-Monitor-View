<template>
    <el-card class="timeline-card" shadow="never">
        <template #header>
            <div class="timeline-card-header">
                <span>History</span>
            </div>
        </template>
        <el-scrollbar max-height="30vh" ref="scrollbarRef">
            <div ref="innerRef">
                <el-timeline>
                    <el-timeline-item v-for="data in timeline_data" :timestamp="data.statusStartTime" placement="top">
                        <el-tag>{{ data.name }}</el-tag>
                        {{ data.status }}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-scrollbar>
    </el-card>
</template>

<script setup lang="ts">
import { nextTick, ref, onMounted } from 'vue';
import { ElScrollbar as ElScrollbarType } from 'element-plus';
import { getCncHistoryList } from '../api/cnc'

const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbarType>>()
const timeline_data = ref([] as any[])

function scrollToBottom() {
    nextTick(() => {
        if (innerRef.value!.clientHeight > 200) {
            scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
        }

    })
}

async function updateTimelineData() {
    //更新数据
    let raw_data = await getCncHistoryList()
    let data = [] as any[]
    if (Object.keys(raw_data || []).length != 0) {
        for (let i in raw_data) {
            let new_data = {
                name: raw_data[i].name,
                status: raw_data[i].status,
                statusStartTime: raw_data[i].statusStartTime,
            }
            data.push(new_data)
        }
    }
    if (data.length > 0) {
        data.sort((a, b) => {
            return Date.parse(a.statusStartTime) - Date.parse(b.statusStartTime)
        })
    }
    timeline_data.value = data
    //滚动至底部
    scrollToBottom()

}
onMounted(() => {
    updateTimelineData()
    setInterval(() => {
        updateTimelineData()
    }, 5000)

})

</script>
  

<style scoped>
.timeline-card {
    width: 100%;
    height: 100%;
    align-items: center;
    border: 0px;
    color: var(--idle-card-text-color);
    border-radius: 10px 10px 10px 10px;
}

.timeline-card-header {
    display: flex;
    justify-content: space-between;
    font-size: x-large;
    color: var(--idle-card-header-text-color);
    font-weight: bold;
}

.timeline-card .el-timeline {
    --el-timeline-node-color: #dfe6e9
}

.timeline-card .el-tag {
    --el-tag-font-size: 1em;
    margin: 3px;
}
</style>
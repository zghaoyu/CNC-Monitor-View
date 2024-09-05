<template>
    <div>
      <div style="height: 10px;position: absolute">
        <el-upload
            ref="upload"
            class="upload-demo"
            action="https://www.baidu.com"
            :limit="1"
            :on-change="handleFileChange"
            :auto-upload="false"
            accept=".xlsx"
        >
          <template #trigger>
            <el-button type="primary">select file</el-button>
          </template>
        </el-upload>
      </div>
      <div v-if="isShow" id="luckysheet" class="luckysheet-wrap"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import LuckyExcel from 'luckyexcel';
  import {ElMessage} from "element-plus";
  import {useRouter } from 'vue-router';
  
  const isShow = ref(false)
  const router = useRouter();

  function handleFileChange(file, newFileList) {
    const selectedFile = file.raw;
    if (!(selectedFile instanceof File)) {
      console.error('传入了非文件对象');
      return;
    }
  
    if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      console.log('文件是xlsx类型');
    } else {
      console.error('不是xlsx文件');
      ElMessage.error('请选择xlsx类型文件')
      return;
    }
  
    let filename = selectedFile.name.replace(/\.[^/.]+$/, ""); // 去除文件扩展名
    let reader = new FileReader();
  
    reader.onload = async (e) => {
      let fileData = e.target.result;
      try {
        isShow.value = true
        LuckyExcel.transformExcelToLucky(fileData, async (exportJson, luckysheetfile) => {
        //   console.log(exportJson.sheets)
          creatExcel(filename, JSON.stringify(exportJson.sheets))
        });
      } catch (e) {
        console.error(e);
      }
    };
  
    reader.onerror = function() {
      console.error("File could not be read! Code " + reader.error.code);
    };
  
    reader.readAsArrayBuffer(selectedFile);
  }
  
  function creatExcel(title, content){
    const options = {
      container: 'luckysheet', // 设定DOM容器的id
      title: 'excel 表格', // 设定表格名称
      lang: 'zh', // 设定表格语言
      myFolderUrl : "http://localhost:5173/analytics",
      hook: {
        updated: (e) => {
          //监听更新,并在1s后自动保存
          $('#luckysheet_info_detail_save').text("已修改")
          let title = $('#luckysheet_info_detail_input').val();
          let content = luckysheet.getAllSheets();
          //去除临时数据,减小体积
          
          for (let i in content)
          
            content[i].data = undefined
        //   console.log(title)
        //   console.log(content)
        }
      },
  
    }
    options.data = JSON.parse(content)
    options.title = title;
  
    window.luckysheet.create(options)
  }
  
  onMounted(() => {
    
  });
  </script>
  
  <style scoped>
  .luckysheet-wrap {
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }
  </style>
  
  
  
<!-- This page has been disabled -->

<template>
    <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 90px;top: 80px;">
    </div>
</template>
    
<script setup lang="ts">
    import LuckyExcel from 'luckyexcel'
    import { onMounted, ref, nextTick ,reactive ,watch} from "vue";

    declare global{
        interface window{
            luckysheet : number;
        }
    }    
        //父组件传递参数
    const props = defineProps({
        fileUrl: {
            type: String,
            default: '',
        },
        fileName: {
            type: String,
            default: '',
        },
    })
    const state = reactive({
        fileUrl: '',
        fileName: '',
    })

    //监听重新渲染组件
    watch(
        () => props.fileUrl,
        () => {
            openExcel( props.fileUrl,props.fileName )
        },
        {immediate : true}
    )
    // 动态计算高度
    const totalHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const contentHeight = totalHeight - 230
    //渲染excel
    function openExcel(url, name)  {
        nextTick(() => {
            LuckyExcel.transformExcelToLuckyByUrl(url, name, (exportJson, luckysheetfile) => {
                if (exportJson.sheets == null || exportJson.sheets.length === 0) {
                    console.log('无法读取excel的内容')
                    return
                }
                const firstData = []
                const secondData = {}
                for (let i = 0; i < exportJson.sheets.length; i++) {
                    firstData[i] = {
                        name: exportJson.sheets[i].name,
                        index: exportJson.sheets[i].index,
                        order: exportJson.sheets[i].order,
                        status: exportJson.sheets[i].status,
                        config: exportJson.sheets[i].config,
                    }
                    firstData[i].config.row = 10
                    parseInt(exportJson.sheets[i].status) === 1 ? (firstData[i].celldata = exportJson.sheets[i].celldata) : 0 == 0
                    secondData[exportJson.sheets[i].index] = exportJson.sheets[i].celldata
                }
                // luckysheet生成网页excel
                window.luckysheet.destroy()
                window.luckysheet.create({
                    lang: 'zh',
                    container: 'luckysheet', // 设定DOM容器的id
                    showtoolbar: false, // 是否显示工具栏
                    showinfobar: false, // 是否显示顶部信息栏
                    showstatisticBar: true, // 是否显示底部计数栏
                    sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
                    allowEdit: false, // 是否允许前台编辑
                    enableAddRow: false, // 是否允许增加行
                    enableAddCol: false, // 是否允许增加列
                    sheetFormulaBar: false, // 是否显示公式栏
                    data: exportJson.sheets, //表格内容
                    enableAddBackTop: true, //返回顶部
                    title: exportJson.info.name, //表格标题
                    sheetRightClickConfig: {
                        delete: false, // 删除
                        copy: false, // 复制
                        rename: false, //重命名
                        color: false, //更改颜色
                        hide: false, //隐藏，取消隐藏
                        move: false, //向左移，向右移
                    },
                    showsheetbarConfig: {
                        add: false,
                    },
                    devicePixelRatio: window.devicePixelRatio, //分辨率
                    defaultFontSize: 20, //默认字体大小
                    cellRightClickConfig: {
                        copy: false, // 复制
                        copyAs: false, // 复制为
                        paste: false, // 粘贴
                        insertRow: false, // 插入行
                        insertColumn: false, // 插入列
                        deleteRow: false, // 删除选中行
                        deleteColumn: false, // 删除选中列
                        deleteCell: false, // 删除单元格
                        hideRow: false, // 隐藏选中行和显示选中行
                        hideColumn: false, // 隐藏选中列和显示选中列
                        rowHeight: false, // 行高
                        columnWidth: false, // 列宽
                        clear: false, // 清除内容
                        matrix: false, // 矩阵操作选区
                        sort: false, // 排序选区
                        filter: false, // 筛选选区
                        chart: false, // 图表生成
                        image: false, // 插入图片
                        link: false, // 插入链接
                        data: false, // 数据验证
                        cellFormat: false, // 设置单元格格式
                    },
                })
            })
        })
    }
</script>
    
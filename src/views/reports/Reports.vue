<template>
  <div class="reports">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <div id="main" style="width: 800px;height: 400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import Breadcrumb from "components/Breadcrumb.vue";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      list: ["首页", "数据统计", "数据报表"],
    };
  },
  mounted() {
    this.$nextTick(function() {
      var myChart = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option ={
    title: {
        text: '用户来源'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['华东', '华南', '华北', '西部', '其他']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['2017-12-27', '2017-12-28', '2017-12-29', '2017-12-30', '2018-1-1', '2018-1-2', '2018-1-3']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '华东',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '华南',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '华北',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '西部',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '其他',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
};
</script>

<style></style>

<template>
  <div class="reports">
    <Breadcrumb :list="list"></Breadcrumb>
    <el-card class="box-card">
      <div id="main" style="width: 800px;height: 400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 这里可以采用lodash来进行优化
import echarts from "echarts";
import Breadcrumb from "components/Breadcrumb.vue";
import { getTimeLine } from "network/api";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      list: ["首页", "数据统计", "数据报表"],
    };
  },
  async mounted() {
      const data = await getTimeLine();
      console.log(data);
      var myChart = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
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
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }

      for(let value in data.data){
          if(!option.value){
              option[value] = data.data[value];
          }else{
              option[value] = [];
              option[value].push(data.data[value]);
          }
      }
    //   console.log(option);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  },
};
</script>

<style></style>

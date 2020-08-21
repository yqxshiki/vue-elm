<template>
  <div>
    <div id="myChart" :style="{ width: '100%', height: '500px', marginTop: '3rem' }"></div>
  </div>
</template>

<script>
export default {
  name: "mainchart",
  data() {
    return {
      options: {
        //放数据
        title: {
          text: "走势图",
          subtext: "用户",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"],
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            data: this.chartData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "新注册用户",
            type: "line",
            stack: "总量",
            data: this.chartCount[0],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "新增订单",
            type: "line",
            stack: "总量",
            data: this.chartCount[2],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "新增管理员",
            type: "line",
            stack: "总量",
            data: this.chartCount[1],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      },
      myChart: "",
    };
  },
  props: {
    chartData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    chartCount: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    drawLine() {
      //初始化化Echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      //配置图表数据和配置项
      this.myChart.setOption(this.options, true);
    },
  },
  watch: {
    options: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.myChart.setOption(newValue);
        } else if (oldValue) {
          this.myChart.setOption(oldValue);
        }
      },
      deep: true,
    },
  },
  mounted() {
    console.log(this.chartCount);
    this.drawLine();
  },
};
</script>
<style></style>

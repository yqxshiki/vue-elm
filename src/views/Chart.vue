<template>
  <div>
    <div id="userChart"
         :style="{width: '900px', height: '500px'}"></div>
  </div>
</template>

<script>
import { userCity } from '../api/chart'
export default {
  data () {
    return {
      options: {
        title: {
          text: '用户分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['北京', '上海', '深圳', '杭州', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { name: "北京", value: "" },
              { name: "上海", value: "" },
              { name: "深圳", value: "" },
              { name: "杭州", value: "" },
              { name: "其他", value: "" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    drawLine () {
      //初始化化Echarts实例
      let myChart = this.$echarts.init(document.getElementById("userChart"))
      //配置图表数据和配置项
      myChart.setOption(this.options)
    },
    getUserCityCount () {
      userCity().then(res => {
        for (let i = 0; i < 5; i++) {
          this.options.series[0].data[i].value = Object.values(res.data.user_city)[i]
        }
        this.drawLine()
      })
    }
  },
  mounted () {
    this.getUserCityCount()

  }
}

</script>
<style>
</style>
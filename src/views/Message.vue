<template>
  <div>
    <div class="tag">
      <el-tag type="warning" effect="dark">当日数据</el-tag>
      <el-tag
        type="info"
        v-for="(nowItem, index) in nowdate"
        :key="'nowitem' + index"
      >
        <span class="tag-value">
          {{ nowItem.value }}
        </span>
        {{ nowItem.name }}
      </el-tag>
    </div>
    <div class="tag">
      <el-tag effect="dark">总数据</el-tag>
      <el-tag
        type="info"
        v-for="(countItem, index) in countdate"
        :key="'countItem' + index"
      >
        <span class="tag-value">
          {{ countItem.value }}
        </span>
        {{ countItem.name }}
      </el-tag>
    </div>

    <div
      id="myChart"
      :style="{ width: '100%', height: '500px', marginTop: '3rem' }"
    ></div>
  </div>
</template>

<script>
import * as api from '../api/message'
import dayjs from 'dayjs'
export default {
  name: 'message',
  data() {
    return {
      countdate: [
        {
          value: '',
          name: '注册用户',
        },
        {
          value: '',
          name: '管理员',
        },
        {
          value: '',
          name: '订单',
        },
      ],
      nowdate: [
        {
          value: '',
          name: '新增用户',
        },
        {
          value: '',
          name: '新增管理员',
        },
        {
          value: '',
          name: '新增订单',
        },
      ],
      dateValue: dayjs(new Date()).format('YYYY-MM-DD'),
    }
  },
  methods: {
    drawLine() {
      //初始化化Echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      //配置图表数据和配置项
      myChart.setOption({
        //放数据
        title: {
          text: '走势图',
          subtext: '用户',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员'],
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '新注册用户',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: '新增订单',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: '新增管理员',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
        ],
      })
    },
    NowData() {
      api.nowUser(this.dateValue).then((res) => {
        this.nowdate[0].value = res.data.count
      })
      api.nowAdmin(this.dateValue).then((res) => {
        this.nowdate[1].value = res.data.count
      })
      api.nowOrder(this.dateValue).then((res) => {
        this.nowdate[2].value = res.data.count
      })
    },
    AllCount() {
      api.getAlluserCount().then((res) => {
        this.countdate[0].value = res.data.count
      })

      api.getAlladminCount().then((res) => {
        this.countdate[1].value = res.data.count
      })

      api.getAllordersCount().then((res) => {
        this.countdate[2].value = res.data.count
      })
    },
  },
  mounted() {
    this.drawLine()
    this.AllCount()
    this.NowData()
  },
}
</script>
<style lang="scss">
.tag {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin: 1rem;
  .el-tag {
    width: 200px;
    .tag-value {
      color: #110;
      font-size: 20px;
    }
  }
}
</style>

<template>
  <div>
    <div class="tag">
      <el-tag type="warning" effect="dark">当日数据</el-tag>
      <el-tag type="info" v-for="(nowItem, index) in nowdate" :key="'nowitem' + index">
        <span class="tag-value">{{ nowItem.value }}</span>
        {{ nowItem.name }}
      </el-tag>
    </div>
    <div class="tag">
      <el-tag effect="dark">总数据</el-tag>
      <el-tag type="info" v-for="(countItem, index) in countdate" :key="'countItem' + index">
        <span class="tag-value">{{ countItem.value }}</span>
        {{ countItem.name }}
      </el-tag>
    </div>
    <MainChart :chartData="chartData" :chartCount="chartCount"></MainChart>
  </div>
</template>

<script>
import MainChart from "../components/MainChart";
import * as api from "../api/message";
import dayjs from "dayjs";
export default {
  name: "message",
  data() {
    return {
      countdate: [
        {
          value: "",
          name: "注册用户",
        },
        {
          value: "",
          name: "管理员",
        },
        {
          value: "",
          name: "订单",
        },
      ],
      nowdate: [
        {
          value: "",
          name: "新增用户",
        },
        {
          value: "",
          name: "新增管理员",
        },
        {
          value: "",
          name: "新增订单",
        },
      ],
      dateValue: dayjs(new Date()).format("YYYY-MM-DD"),
      //一周
      chartData: [],
      //每周数据
      chartCount: [[], [], []],
    };
  },
  components: {
    MainChart,
  },
  methods: {
    NowData(value, type = "") {
      api.nowUser(value).then((res) => {
        if (type == "chart") {
          this.chartCount[0].push(res.data.count);
        } else {
          this.nowdate[0].value = res.data.count;
        }
      });
      api.nowAdmin(value).then((res) => {
        if (type == "chart") {
          this.chartCount[1].push(res.data.count);
        } else {
          this.nowdate[1].value = res.data.count;
        }
      });
      api.nowOrder(value).then((res) => {
        if (type == "chart") {
          this.chartCount[2].push(res.data.count);
        } else {
          this.nowdate[2].value = res.data.count;
        }
      });
    },
    AllCount() {
      api.getAlluserCount().then((res) => {
        this.countdate[0].value = res.data.count;
      });

      api.getAlladminCount().then((res) => {
        this.countdate[1].value = res.data.count;
      });

      api.getAllordersCount().then((res) => {
        this.countdate[2].value = res.data.count;
      });
    },
    async getChart() {
      let arrData = [[], [], []];
      this.chartData.map(async (item) => {
        this.NowData(item, "chart");
      });
    },
  },
  mounted() {
    let data;
    for (let i = 0; i <= 6; i++) {
      data = dayjs(new Date().getTime() - 86400000 * i).format("YYYY-MM-DD");
      this.chartData.push(data);
    }
    this.AllCount();
    this.NowData(this.dateValue);
    this.getChart();
  },
};
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

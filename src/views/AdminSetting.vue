<template>
  <div>
    <div class="contaner">
      <el-card class="box-card" shadow="hover">
        <h2 style="textAlign:center">管理员信息</h2>
        <div>
          <div v-for="(item, index) in label" :key="'item' + index">
            {{ item.name }}
            <span class="info">{{
              isValue(Object.keys(info), item.keys)
            }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAdminInfo } from '../api/adminSetting'
export default {
  data() {
    return {
      label: [
        {
          name: '姓名:',
          keys: 'user_name',
        },
        {
          name: '注册时间:',
          keys: 'create_time',
        },
        {
          name: '管理员权限:',
          keys: 'admin',
        },
        {
          name: '管理员 ID:',
          keys: 'id',
        },
      ],
      info: {},
    }
  },
  computed: {},
  methods: {
    async getInfo() {
      const data = await getAdminInfo()
      this.info = data.data.data
    },
    isValue(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
          return this.info[value]
        }
      }
    },
  },
  mounted() {
    this.getInfo()
  },
}
</script>
<style scoped>
.box-card {
  min-width: 300px;
  margin: 14rem;
}
.info {
  margin-left: 1rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #f40;
}
</style>

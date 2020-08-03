<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="listTable"
      @expand-change="open"
    >
      <!-- 多行展示 -->
      <el-table-column v-if="isExpand" type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
            v-for="(expand_lable, index) in lable_expand"
            :key="'lable_expand' + index"
          >
            <el-form-item :label="expand_lable.column_key">
              <span>{{ props.row.ExpandData[expand_lable.prop] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 主要展示栏 -->
      <el-table-column
        v-for="(item, index) in lable_column"
        :key="'lable_column' + index"
        :label="item.column_key"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ isZero(scope.row[item.prop]) }}
          </span>
        </template>
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column v-if="operation" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
            <el-form :model="Foodform" label-width="100px">
              <el-form-item label="食品名称">
                <el-input v-model="Foodform.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="食品介绍">
                <el-input
                  v-model="Foodform.description"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="食品分类">
                <el-select
                  v-model="Foodform.region"
                  placeholder="请选择活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上传餐饮服务许可证">
                <el-upload
                  class="avatar-uploader"
                  action="https://elm.cangdu.org/v1/addimg/shop"
                  :show-file-list="true"
                  :on-success="afterUpload_3"
                >
                  <img
                    v-if="Foodform.image_path"
                    :src="Foodform.image_path"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <!-- <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">新增</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:1rem">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getuserList,
  getadminList,
  getordersnList,
  getaddresse,
  getshopDetail,
  getuserinfo,
  getCity,
  getShoplist,
  getFoodList,
  DeleteFood,
  UpdateFood,
} from '../api/list'
import * as api from '../api/message'
import { shopCount, foodCount } from '../api/count'
export default {
  name: 'list',
  props: {
    path: {
      type: String,
    },
    lable_column: {
      type: Array,
      default: function() {
        return []
      },
    },
    lable_expand: {
      type: Array,
      default: function() {
        return []
      },
    },
    // 操作栏
    operation: {
      type: Boolean,
      default: false,
    },
    // 多行展示
    isExpand: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableData: [],
      // 分页设置
      currentPage: 1,
      pagesize: 10,
      config: {
        offset: 0,
        limit: 1,
      },
      total: 0,
      dialogFormVisible: false,
      Foodform: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  computed: {
    ...mapState({
      list: (state) => state.list,
    }),
  },
  methods: {
    afterUpload_3(res) {
      this.$set(this.Foodform, 'image_path ', imgUrl() + res.image_path)
    },
    isZero(value) {
      return value != 0 ? value : '支付超时'
    },
    // 点击展开栏
    open(row, expandedRows) {
      if (row.isShow) {
        return
      } else {
        row.isShow = true
        let length = expandedRows.length
        this.newExpandedRows = expandedRows[length - 1]
        this.getExpand(
          {
            address: row.address_id,
            user: row.user_id,
            restaurant: row.restaurant_id,
            row,
          },
          this.newExpandedRows
        )
      }
    },
    // 设置每页多少个数据
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getinfo(
        this.config.offset + (val - 1) * this.pagesize,
        this.config.limit * this.pagesize
      )
    },
    foreachData(tableData) {
      for (let i = 0; i < tableData.length; i++) {
        tableData[i].ExpandData = []
      }
    },

    handleEdit(index, row) {
      this.dialogFormVisible = true
      console.log(index, row)
    },
    async handleDelete(index, row) {
      const data = await DeleteFood(row.item_id)
      if (data.data.type == 'HAS_NO_ACCESS') {
        this.$message.error(data.data.message)
      }
    },
    // 获取数据
    async getExpand(obj, $data) {
      if (this.isExpand) {
        switch (this.path) {
          case 'shop_list':
            $data.ExpandData = $data
            break
          case 'order_list':
            const addresse = await getaddresse(obj.address)
            const restaurant = await getshopDetail(obj.restaurant)
            const user = await getuserinfo(obj.user)
            $data.ExpandData.user_address = addresse.data.address
            $data.ExpandData.name = user.data.username
            $data.ExpandData.shop_address = restaurant.data.address
            $data.ExpandData.shop_name = restaurant.data.name
            $data.ExpandData.shop_id = obj.restaurant
            this.$refs.listTable.toggleRowExpansion(obj.row, false)
            this.$refs.listTable.toggleRowExpansion(obj.row, true)
            break
          case 'food_list':
            $data.ExpandData = $data
            break
          default:
            break
        }
      } else {
        return
      }
    },
    async getinfo(offset, limit) {
      switch (this.path) {
        case 'admin_list':
          getadminList({ offset, limit }).then((res) => {
            this.tableData = res.data.data
          })
          var count = await api.getAlladminCount()
          this.total = count.data.count
          break
        case 'user_list':
          getuserList({ offset, limit }).then((res) => {
            this.tableData = res.data
          })
          var count = await api.getAlluserCount()
          this.total = count.data.count
          break
        case 'order_list':
          getordersnList({ offset, limit }).then((res) => {
            this.tableData = res.data
            this.foreachData(this.tableData)
          })
          var count = await api.getAllordersCount()
          this.total = count.data.count
          break
        case 'shop_list':
          const city = await getCity()
          const { latitude, longitude } = city.data
          getShoplist({ latitude, longitude, offset, limit }).then((res) => {
            this.tableData = res.data
            this.foreachData(this.tableData)
          })
          var count = await shopCount()
          this.total = count.data.count
          break
        case 'food_list':
          getFoodList({ offset, limit }).then((res) => {
            this.tableData = res.data
          })
          var count = await foodCount()
          this.total = count.data.count
          break
        default:
          break
      }
    },
  },
  created() {
    this.getinfo(0, 10)
  },
}
</script>
<style scoped>
.el-table__expanded-cell {
  background: rgb(251, 253, 255);
  height: 40px;
}
.el-form-item {
  margin-bottom: 0px;
}

.el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

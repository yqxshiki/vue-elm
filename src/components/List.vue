<template>
  <div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column :label="lable_column[0].column_key"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ isAdmin?scope.row.user_name:scope.$index+1}}</span>
        </template>

      </el-table-column>
      <el-table-column :label="lable_column[1].column_key">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ isAdmin?scope.row.create_time:scope.row.registe_time}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="lable_column[2].column_key">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ isAdmin?scope.row.city:scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="lable_column[3].column_key">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ isAdmin?scope.row.admin:scope.row.city }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="姓名"
                     width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover"
                    placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column> -->
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">新增</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="margin:1rem">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-sizes="[10,15,20]"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getuserList, getadminList, getordersnList } from '../api/list'
export default {
  name: "list",
  props: {
    path: {
      type: String
    },
    lable_column: {
      type: Array,
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      config: {
        offset: 0,
        limit: 1
      }
    }
  },
  methods: {
    // 设置每页多少个数据
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getinfo(this.config.offset + (val - 1) * this.pagesize, this.config.limit * this.pagesize)
    },
    // handleEdit (index, row) {
    //   console.log(index, row);
    // },
    // handleDelete (index, row) {
    //   console.log(index, row);
    // },
    // 获取数据
    getinfo (offset, limit) {
      switch (this.path) {
        case 'admin_list':
          getadminList({ offset, limit }).then(res => {
            this.tableData = res.data.data
            console.log(this.tableData)
          })
          break;
        case 'user_list':
          getuserList({ offset, limit }).then(res => {
            this.tableData = res.data
            console.log(this.tableData)
          })
          break;
        case 'shop_list':
          getuserList({ offset, limit }).then(res => {
            this.tableData = res.data
            console.log(this.tableData)
          })
          break;
        default:
          break;
      }
    }
  },
  created () {
    this.getinfo(0, 10)
  }
}

</script>
<style>
</style>
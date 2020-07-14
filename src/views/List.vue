<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="#"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.registe_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册地址">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.city }}</span>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">新增</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
import { getuserList } from '../api/list'
export default {
  name: "list",
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
      console.log(this.pagesize)
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
      getuserList({ offset, limit }).then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
    }
  },
  created () {
    this.getinfo(0, 10)
  }
}

</script>
<style>
</style>
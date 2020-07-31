<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(50,64,87)">
      <el-menu router unique-opened :default-active="$route.path">
        <el-menu-item index="/message">
          <i class="el-icon-s-home"></i>
          首页</el-menu-item
        >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>数据管理</template>
          <el-menu-item-group>
            <el-menu-item index="/user_list">用户列表</el-menu-item>
            <el-menu-item index="/shop_list">商家列表</el-menu-item>
            <el-menu-item index="/food_list">食品列表</el-menu-item>
            <el-menu-item index="/order_list">订单列表</el-menu-item>
            <el-menu-item index="/admin_list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-folder-add"></i>添加数据</template
          >
          <el-menu-item-group>
            <el-menu-item index="/add_shop">添加商铺</el-menu-item>
            <el-menu-item index="/add_food">添加食品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-star-on"></i>图表</template>
          <el-menu-item-group>
            <el-menu-item index="/chart">用户分布</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>设置</template>
          <el-menu-item-group>
            <el-menu-item index="/adminSetting">管理员设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title"><i class="el-icon-info"></i>说明</template>
          <el-menu-item-group>
            <el-menu-item index="/explain">说明</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px;color:#000" class="header">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="line-height:60px"
        >
          <el-breadcrumb-item :to="{ path: `/` }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in $route.meta.title"
            :key="'item' + index"
            >{{ item }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <el-dropdown>
          <img src="../assets/13.jpg" alt="图像" class="tuxiang" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="Gohome">首页</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="quit">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Singout } from '../api/login'
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['getCityInfo']),
    Gohome() {
      this.$router.push('/')
    },
    async quit() {
      const data = await Singout()
    },
  },
  created() {
    this.getCityInfo()
  },
}
</script>

<style lang="scss">
.el-header {
  background-color: rgb(239, 242, 247);
  color: #fff;
  line-height: 60px;
}

.el-aside {
  .el-menu {
    background-color: rgb(50, 64, 87);
    .el-submenu__title {
      color: #fff;
    }
    .el-menu-item {
      color: #fff;
    }
    .el-menu-item-group {
      background-color: #1f2d3d;
    }
  }
}
.tuxiang {
  width: 70px;
  border-radius: 50%;
  margin-top: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
}
</style>

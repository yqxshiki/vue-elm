<template>
  <div>
    <list :path="'admin_list'"
          :lable_column="column"
          :isAdmin=true></list>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  name: "admin_list",
  data () {
    return {
      column: [
        { column_key: "姓名" },
        { column_key: "注册日期" },
        { column_key: "地址" },
        { column_key: "权限" },
      ]
    }
  },
  components: {
    list
  }
}

</script>
<style>
</style>
<template>
  <div>
    <list :path="'admin_list'"
          :lable_column="column"></list>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  name: "admin_list",
  data () {
    return {
      column: [
        { column_key: "姓名", prop: 'user_name' },
        { column_key: "注册日期", prop: 'create_time' },
        { column_key: "地址", prop: 'city' },
        { column_key: "权限", prop: 'admin' },
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
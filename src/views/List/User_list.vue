<template>
  <div>
    <list :path="'user_list'"
          :lable_column="column"></list>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  name: "user_list",
  data () {
    return {
      column: [
        { column_key: "#" },
        { column_key: "注册日期" },
        { column_key: "姓名" },
        { column_key: "注册地址" },
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
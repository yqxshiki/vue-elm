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
        // { column_key: "#", prop: '$index' },
        { column_key: "注册日期", prop: 'registe_time' },
        { column_key: "姓名", prop: 'username' },
        { column_key: "注册地址", prop: 'city' },
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
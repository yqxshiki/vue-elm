<template>
  <div>
    <list :path="'shop_list'"
          :lable_column="column"
          :operation=true></list>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  name: "shop_list",
  data () {
    return {
      column: [
        { column_key: "店铺名称" },
        { column_key: "店铺地址" },
        { column_key: "店铺介绍" },
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
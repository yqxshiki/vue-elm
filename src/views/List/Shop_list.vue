<template>
  <div>
    <list :path="'shop_list'"
          :lable_column="column"
          :lable_expand="lable_expand"
          :operation=true
          :isExpand=true></list>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  name: "shop_list",
  data () {
    return {
      column: [
        { column_key: "店铺名称", prop: "name" },
        { column_key: "	店铺地址", prop: "address" },
        { column_key: "	店铺介绍", prop: "description" },
      ],
      lable_expand: [
        { column_key: "店铺名称", prop: "name" },
        { column_key: "店铺地址", prop: "address" },
        { column_key: "店铺介绍", prop: "description" },
        { column_key: "店铺 ID", prop: "id" },
        { column_key: "联系电话", prop: "phone" },
        { column_key: "评分", prop: "rating" },
        { column_key: "销售量", prop: "recent_order_num" },
        { column_key: "分类", prop: "category" },
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
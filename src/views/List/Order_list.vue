<template>
  <div>
    <list :path="'order_list'"
          :lable_column="column"
          :lable_expand="lable_expand"
          :isExpand=true></list>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  name: "order_list",
  data () {
    return {
      column: [
        { column_key: "	订单 ID", prop: "id" },
        { column_key: "	总价格", prop: "total_amount" },
        { column_key: "	订单状态", prop: "operation_confirm" },
      ],
      lable_expand: [
        { column_key: "	用户名", prop: "name" },
        { column_key: "	 店铺名称", prop: "shop_name" },
        { column_key: "	收货地址", prop: "user_address" },
        { column_key: "	 店铺 ID", prop: "shop_id" },
        { column_key: "	 店铺地址", prop: "shop_address" },
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
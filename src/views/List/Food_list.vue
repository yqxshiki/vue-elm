<template>
  <div>
    <list :path="'food_list'"
          :lable_column="column"
          :lable_expand="lable_expand"
          :isExpand=true></list>
  </div>
</template>

<script>
import list from '../../components/List'
export default {
  name: "food_list",
  data () {
    return {
      column: [
        { column_key: "	食品名称", prop: "name" },
        { column_key: "	食品介绍", prop: "description" },
        { column_key: "	评分", prop: "rating" },
      ],
      lable_expand: [
        { column_key: "	食品名称", prop: "name" },
        { column_key: "	食品ID", prop: "item_id" },
        { column_key: "	 食品介绍", prop: "description" },
        { column_key: "	食品评分", prop: "rating" },
        { column_key: "	 餐馆名称", prop: "city_id" },
        { column_key: "	 餐馆ID", prop: "restaurant_id" },
        { column_key: "	 餐馆地址", prop: "address" },
        { column_key: "	 餐馆分类", prop: "category" },
        { column_key: "	 月销量", prop: "month_sales" },
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
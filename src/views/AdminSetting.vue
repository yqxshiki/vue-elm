<template>
  <div>AdminSetting</div>
</template>

<script>
import { getAdminInfo } from '../api/adminSetting'
export default {
  data () {
    return {

    }
  },
  methods: {
    getInfo () {
      getAdminInfo().then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getInfo()
  }
}

</script>
<style>
</style>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getCity } from '../api/list'
import { localGetItem } from '../lib/util'

export default new Vuex.Store({
  state: {
    cityInfo: ""
  },
  mutations: {
  },
  actions: {
    // 获取用户位置信息
    async getCityInfo (commit) {
      const data = await getCity()
      this.state.cityInfo = data.data
      localGetItem(data.data)
    }
  },
  modules: {
  }
})

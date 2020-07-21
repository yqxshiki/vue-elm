import axios from './index'
// 食品数量
export const foodCount = () => {
  return axios.requset({
    url: "/shopping/v2/foods/count",
    method: "get"
  })
}

// 商家数量
export const shopCount = () => {
  return axios.requset({
    url: "/shopping/restaurants/count",
    method: "get"
  })
}

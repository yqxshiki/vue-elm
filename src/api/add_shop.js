import axios from './index'

export const foodCategory = () => {
  return axios.requset({
    url: "/shopping/v2/restaurant/category",
    method: "get"
  })
}

export const addShop = (data) => {
  return axios.requset({
    url: "shopping/addshop",
    method: "post",
    data: data
  })
}

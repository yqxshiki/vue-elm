import axios from './index'

export const foodCategory = () => {
  return axios.requset({
    url: "/shopping/v2/restaurant/category",
    method: "get"
  })
}

export const addShop = (form) => {
  return axios.requset({
    url: "/shopping/addshop",
    method: "POST",
    data: form
  })
}

export const search_address = (id, keyword) => {
  return axios.requset({
    url: `/v1/pois?city_id=${id}&keyword=${keyword}&type=search`,
    method: "get",
  })
}

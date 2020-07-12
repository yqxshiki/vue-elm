import axios from './index'

export const userCity = () => {
  return axios.requset({
    url: "/v1/user/city/count",
    method: "get"
  })
} 
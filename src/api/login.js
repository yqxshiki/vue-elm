import axios from './index'

export const Submit = (options) => {
  return axios.requset({
    url: "/admin/login",
    method: "post",
    data: options
  })
}
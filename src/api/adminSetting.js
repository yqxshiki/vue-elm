import axios from './index'

export const getAdminInfo = () => {
  return axios.requset({
    url: "/admin/info",
    method: "get"
  })
}
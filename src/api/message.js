import axios from './index'

// 获取总数据
export const getAlladminCount = () => {
  return axios.requset({
    url: "/admin/count",
    method: "get"
  })
}
export const getAlluserCount = () => {
  return axios.requset({
    url: "/v1/users/count",
    method: "get"
  })
}
export const getAllordersCount = () => {
  return axios.requset({
    url: "/bos/orders/count",
    method: "get"
  })
}

// 获取当日数据

export const nowUser = (date) => {
  return axios.requset({
    url: "/statis/user/" + date + "/count",
    method: "get"
  })
}

export const nowOrder = (date) => {
  return axios.requset({
    url: "/statis/order/" + date + "/count",
    method: "get"
  })
}

export const nowAdmin = (date) => {
  return axios.requset({
    url: "/statis/admin/" + date + "/count",
    method: "get"
  })
}
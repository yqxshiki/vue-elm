import axios from './index'

// 用户列表
export const getuserList = ({ offset, limit }) => {
  return axios.requset({
    url: `/v1/users/list?offset=${offset}&limit=${limit}`,
    method: "get"
  })
}
// 管理员列表
export const getadminList = ({ offset, limit }) => {
  return axios.requset({
    url: `/admin/all?offset=${offset}&limit=${limit}`,
    method: "get"
  })
}

// 订单列表
export const getordersnList = ({ offset, limit }) => {
  return axios.requset({
    url: `/bos/orders?offset=${offset}&limit=${limit}`,
    method: "get"
  })
}
// 获取地址信息
export const getaddresse = (addresse) => {
  return axios.requset({
    url: `/v1/addresse/${addresse}`,
    method: "get"
  })
}

// 获取餐馆详情
export const getshopDetail = (shop) => {
  return axios.requset({
    url: `/shopping/restaurant/${shop}`,
    method: "get"
  })
}
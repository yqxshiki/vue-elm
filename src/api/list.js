import axios from './index'

export const getuserList = ({ offset, limit }) => {
  return axios.requset({
    url: `/v1/users/list?offset=${offset}&limit=${limit}`,
    method: "get"
  })
}

export const getadminList = ({ offset, limit }) => {
  return axios.requset({
    url: `/admin/all?offset=${offset}&limit=${limit}`,
    method: "get"
  })
}

export const getordersnList = ({ offset, limit }) => {
  return axios.requset({
    url: `/bos/orders?offset=${offset}&limit=${limit}`,
    method: "get"
  })
}
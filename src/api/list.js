import axios from './index'

export const getuserList = ({ offset, limit }) => {
  return axios.requset({
    url: `/v1/users/list?offset=${offset}&limit=${limit}`,
    method: "get"
  })
}
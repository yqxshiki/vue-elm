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

// 获取订单餐馆详情
export const getshopDetail = (shop) => {
  return axios.requset({
    url: `/shopping/restaurant/${shop}`,
    method: "get"
  })
}


// 获取用户信息
export const getuserinfo = (id) => {
  return axios.requset({
    url: `/v1/user/${id}`,
    method: "get"
  })
}

// 获取所在城市
export const getCity = () => {
  return axios.requset({
    url: `/v1/cities?type=guess`,
    method: "get"
  })
}

// 获取商铺列表
export const getShoplist = ({ latitude, longitude, offset, limit }) => {
  return axios.requset({
    url: `/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=${limit}`,
    method: "get"
  })
}



// 获取食品列表
export const getFoodList = ({ offset, limit }) => {
  return axios.requset({
    url: `/shopping/v2/foods?offset=${offset}&limit=${limit}&restaurant_id=undefined`,
    method: "get"
  })
}

export const DeleteFood = (food_id) => {
  return axios.requset({
    url: `/shopping/v2/food/${food_id}`,
    method: "delete"
  })
}

export const UpdateFood = () => {
  return axios.requset({
    url: `/shopping/v2/updatefood`,
    method: "post"
  })
}

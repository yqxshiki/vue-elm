import axios from './index'

export const add_food = (data) => {
  return axios.requset({
    url: "/shopping/addfood",
    method: "POST",
    data: data
  })
}

export const add_food_category = (data) => {
  return axios.requset({
    url: "/shopping/addcategory",
    method: "POST",
    data: data
  })
}
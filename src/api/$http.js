import axios from 'axios'

// const http = axios.create({
//   // baseURL: process.env.VUE_APP_URL
//   baseURL: 'https://elm.cangdu.org'
// })


axios.defaults.withCredentials = true

class HttpRequest {
  constructor(baseUrl = process.env.VUE_APP_URL) {
    this.baseUrl = baseUrl
  }
  getConfig () {
    const config = {
      baseURL: this.baseUrl
    }
    return config
  }

  interceptors (instance) {
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })

    instance.interceptors.response.use(res => {
      const { data, status } = res
      return res
    }, error => {
      return Promise.reject(error)
    })
  }
  requset (options) {
    const instance = axios.create()
    options = Object.assign(this.getConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default HttpRequest
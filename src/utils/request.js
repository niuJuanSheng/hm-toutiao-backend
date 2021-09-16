import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.baseURL = 'http://157.122.54.189:6002'
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('hm-token-backend')
    config.headers.Authorization = token
    return config
  },
  error => Promise.reject(error)
)

export default axios

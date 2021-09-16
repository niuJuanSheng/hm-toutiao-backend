import axios from '@/utils/request.js'
// 登录接口
export const login = data =>
  axios({
    url: '/login',
    method: 'post',
    data
  })
// 用户详情
export const user = id =>
  axios({
    url: '/user/' + id
  })

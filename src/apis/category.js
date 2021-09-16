import axios from '@/utils/request'
// 获取栏目数据
export const category = () =>
  axios({
    url: '/category'
  })
// 添加栏目
export const addCategory = data =>
  axios({
    url: '/category',
    method: 'post',
    data
  })

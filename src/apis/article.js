import axios from '@/utils/request.js'
// 文章列表
export const post = params =>
  axios({
    url: '/post',
    params
  })
// 发布文章
export const publisherArticle = data =>
  axios({
    url: '/post',
    method: 'post',
    data
  })
// 文章详情
export const articleDetail = id =>
  axios({
    url: '/post/' + id
  })
// 文章编辑
export const articleEditor = (id, data) =>
  axios({
    url: '/post_update/' + id,
    method: 'post',
    data
  })

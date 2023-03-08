// 文章相关的api
import request from '@/utils/request.js'

export const getArticleListAPI = function(_page, _limit) {
  return request.get('/articles',{
    params: {
      _page,
      _limit
    }
  })
}
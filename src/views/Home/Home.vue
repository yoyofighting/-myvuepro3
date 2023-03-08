<template>
<div class="home-container">
  <!-- 头部区域 -->
  <van-nav-bar title="每日热点" fixed/>
  <!-- 导入注册并使用ArticleInfo组件 -->
  <!-- 使用组件时如果组件的某个属性是小驼峰形式，则绑定属性的时候建议改为连字符格式，例如:cmt-count -->
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ArticleInfo 
        v-for="item in artList" 
          :key="item.id" 
          :title="item.title" 
          :author="item.aut_name" 
          :cmt-count="item.comm_count"
          :pubtime="item.pubdate"
          :cover="item.cover"
      ></ArticleInfo>
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
// 导入api接口
import { getArticleListAPI } from '@/api/articleAPI.js'

// 导入组件
import ArticleInfo from '@/components/Article/ArticleInfo.vue'

export default {
  name: 'Home',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页显示多少行数据
      limit: 10,
      // 文章的数组
      artList: [],
      // loading是否正在加载下一页 加载中为true，节流
      loading: true,
      // 所有数据是否加载完毕 完毕则为true
      finished: false,
      // 是否正在下拉刷新，刷新中为true 刷新完毕改为false
      isLoading: false,
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      const {data: res} = await getArticleListAPI(this.page, this.limit)
      if(isRefresh) {
        // 如果是下拉刷新更多应该是 新数据在前 旧数据在后
        this.artList = [...res, ...this.artList]
        this.isLoading = false

      } else {
        // 如果是上拉加载更多应该是 旧数据在前 新数据在后
        this.artList = [...this.artList, ...res]
        // 当第一页数据拿到后再将loading改为false
        this.loading = false
      }
      if(res.length === 0) {
          // 没有数据了
          this.finished = true
        }

      

    },
    // 调用时请求下一页数据
    onLoad() {
      // 异步更新数据
      // 1.页码值加1
      this.page++
      // 2.重新请求接口获取数据
      this.initArticleList()

    },
    // 下拉刷新的处理函数
    onRefresh() {
      // 让页码值加1
      this.page++
      // 重新请求接口数据
      this.initArticleList(true)

    }
  },

  components: {
    ArticleInfo
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  .van-nav-bar {
    background-color: pink;
  }
  /deep/ .van-nav-bar__title {
    color: white;
  }
}

</style>

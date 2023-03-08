<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ title }}</span>
          <!-- 单张图片 -->
          <img :src="cover.images[0]" alt="" class="thumb" v-if="cover.type === 1" />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="cover.type === 3">
          <!-- <img :src="cover.images[0]" alt="" class="thumb">
          <img :src="cover.images[1]" alt="" class="thumb">
          <img :src="cover.images[2]" alt="" class="thumb"> -->
          <img :src="item" alt="" class="thumb" v-for="(item, index) in cover.images" :key = index />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>{{ author }} &nbsp;&nbsp; {{ cmtCount }} 评论 &nbsp;&nbsp; 发布日期 {{ pubtime }}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
  export default {
    name: 'ArticleInfo',
    props: {
      // 文章标题
      title: {
        default: '',
        type: String
      },
      // 作者的名字
      author: {
        default: '',
        type: String
      },
      // 评论数
      cmtCount: {
        default: 0,
        type: [Number, String]
      },
      // 发布时间
      pubtime: {
        default: '',
        type: String
      },
      // 封面信息
      cover: {
        type: Object,
        // 通过default函数返回cover属性的默认值
        default: function() {
          return {type: 0}
        }
      }

    }
  }
</script>

<style lang="less" scoped>
  .label-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .thumb {
    // 矩形黄金比例：0.618
    width: 113px;
    height: 70px;
    background-color: #f8f8f8;
    object-fit: cover;
  }

  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .thumb-box {
    display: flex;
    justify-content: space-between;
  }
</style>

<template>
<div>
  <router-view></router-view>

  <van-tabbar v-model="active">
    <van-tabbar-item to='/' icon="home-o">้ฆ้กต</van-tabbar-item>
    <van-tabbar-item to='/user' icon="user-o">ๆ็</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: 0,
    };
  },
}
</script>

<style lang="less" scoped>
</style>

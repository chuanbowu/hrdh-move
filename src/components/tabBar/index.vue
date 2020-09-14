<template>
  <div class="tabBar">
    <div class="tab-item" :class="$route.path==='/'||$route.path==='/Search'?'active':''" @click="go('/')">
      <div><img :src="$route.path==='/'||$route.path==='/Search'?require('@assets/tabbar/tab1-active.png'):require('@assets/tabbar/tab1.png')" alt=""></div>
      <div class="title">首页</div>
    </div>
    <div class="tab-item" :class="$route.path==='/Sensations'||$route.path==='/SensationSearch'?'active':''" @click="go('/Sensations')">
      <div><img :src="$route.path==='/Sensations'||$route.path==='/SensationSearch'?require('@assets/tabbar/tab2-active.png'):require('@assets/tabbar/tab2.png')" alt=""></div>
      <div class="title">红人</div>
    </div>
    <div class="tab-item" :class="$route.path==='/ShakeData'||$route.path==='/SearchShakeData'?'active':''" @click="go('/ShakeData')">
      <div><img :src="$route.path==='/ShakeData'||$route.path==='/SearchShakeData'?require('@assets/tabbar/tab3-active.png'):require('@assets/tabbar/tab3.png')" alt=""></div>
      <div class="title">网红爆款</div>
    </div>
    <div class="tab-item" :class="$route.path==='/TipGoods'?'active':''" @click="go('/TipGoods')">
      <div><img :src="$route.path==='/TipGoods'?require('@assets/tabbar/tab4-active.png'):require('@assets/tabbar/tab4.png')" alt=""></div>
      <div class="title">快抖数据</div>
    </div>
    <div class="tab-item" :class="$route.path==='/PersonalData'?'active':''" @click="go('/PersonalData')">
      <div><img :src="$route.path==='/PersonalData'?require('@assets/tabbar/tab5-active.png'):require('@assets/tabbar/tab5.png')" alt=""></div>
      <div class="title">我的</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    go (url) {
      if (url !== this.activeUrl) {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .tabBar {
    height: 1rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    .tab-item {
      flex: 1;
      text-align: center;
      font-size: 0.24rem;
      color: #666;
      transition: all 0.2s;
      div:nth-child(1) {
        height: 0.44rem;
      }
      img {
        width: 0.44rem;
      }
      div.title {
        margin-top: 0.03rem;
        line-height: 0.3rem;
      }
      &.active div.title {
        color: #DF56E1;
        
      }
    }
  }
</style>
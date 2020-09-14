<template>
  <div class="TipGoods">
    <div class="tip">
      <iframe src="https://dy.feigua.cn/?chl=feigua2_baidu-dy" frameborder="0"></iframe>
    </div>
    <tab-bar />
  </div>
</template>

<script>
import TabBar from '@c/tabBar'
export default {
  name: 'TipGoods',
  components: {
    TabBar
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.TipGoods {
  height: 100%;
  font-size: 0;
  .tip {
    height: calc(100% - 1rem);
    width: 100%;
    overflow: auto;
    iframe {
      width: 1250px;
      height: 100%;
    }
  }
}
</style>

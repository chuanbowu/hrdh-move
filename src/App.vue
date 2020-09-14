<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { sensationInfo, getTaoBaoUrl, goodsTypeConfigList  } from '@/api'
import { getToken } from '@/utils/auth'
import { Dialog } from 'vant'
export default {
  components: {
    [Dialog.name]: Dialog
  },
  methods: {
    async getsensationInfo () {
      const res = await sensationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
        this.$store.commit('detail', this.detail)
        if (this.detail.status === 5 && this.detail.relationStatus === 1) { // 淘宝客未授权
          Dialog.alert({
            message: '您还未进行淘宝客授权，请先授权',
          }).then(() => {
            this.getTheTaoBaoUrl()
          }).catch(() => {
            // on cancel
          })
        }
      }
    },
    async getTheTaoBaoUrl () {
      const res = await getTaoBaoUrl({ clientUrl: location.href })
      if (res.result === '0') {
        location.href = res.datas.taoBaoTbkUrl
      }
    },
    async getgoodsTypeConfigList () {
      const res = await goodsTypeConfigList({})
      if (res.result === '0') {
        this.$store.commit('typeList', res.datas.list)
      }
    }
  },
  created () {
    if (getToken()) this.getsensationInfo()
    this.getgoodsTypeConfigList()
  }
}
</script>

<style lang="less">
@import 'styles/reset.css';
html, body {
  width: 100%;
  height: 100%;
  line-height: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-overflow-scrolling: touch;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: auto;
  font-size: 0;
  background-color: #F7F2FF;
}
#app .van-nav-bar {
  height: 0.92rem;
}
.rotate1 {
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: transparent;
  border-top: 4px solid #DF56E1;
  border-left: 4px solid #DF56E1;
  top: -4px;
  left: -4px;
}
.rotate2 {
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: transparent;
  border-top: 4px solid #DF56E1;
  border-right: 4px solid #DF56E1;
  top: -4px;
  right: -4px;
}
.rotate3 {
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: transparent;
  border-bottom: 4px solid #DF56E1;
  border-right: 4px solid #DF56E1;
  bottom: -4px;
  right: -4px;
}
.rotate4 {
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: transparent;
  border-bottom: 4px solid #DF56E1;
  border-left: 4px solid #DF56E1;
  bottom: -4px;
  left: -4px;
}
</style>

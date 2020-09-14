<template>
  <div class="item">
    <div class="img" @click="$router.push(`/GoodsDetail?id=${item.goodsId}`)">
      <img :src="baseUrl+item.mainPic" alt="">
    </div>
    <p class="name" @click="$router.push(`/GoodsDetail?id=${item.goodsId}`)">{{item.businessTitle}}</p>
    <div class="return">拿货价<span>{{item.goodsPrice}}</span>元</div>
    <div class="btn">
      <div @click.stop="getNow">立即拿货</div>
      <div @click="$router.push(`/GoodsDetail?id=${item.goodsId}`)">查看详情</div>
    </div>
    <van-popup v-model="dialogTableVisible" closeable :style="{ width: '6rem' }">
      <div class="con" style="text-align:center">
        <p style="padding: 10px;font-size: 15px">商家二维码</p>
        <template v-if="detail.customerWeChatPic">
          <img style="width: 5rem" :src="baseUrl+detail.customerWeChatPic" alt="">
        </template>
        <template v-if="detail.customerPhone">
          <div style="padding: 10px;font-size: 13px">商家联系电话：{{detail.customerPhone}}</div>
        </template>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Dialog } from 'vant'
import { baseUrl } from '@/utils/commom'
import { getToken } from '@/utils/auth'
import { takeDeliveryGoodsInfo } from '@/api'
export default {
  components: {
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      baseUrl: baseUrl,
      detail: {},
      dialogTableVisible: false
    }
  },
  methods: {
    async getNow () {
      if (!getToken()) { // 未登录
        Dialog.alert({
          message: '您还未登录，请先去登录',
        }).then(() => {
          this.$router.push('/Login')
        })
      } else if (this.$store.getters.detail.status === 1) { // 未完善资料
        Dialog.alert({
          message: '您的个人资料还未完善，请先去完善个人资料',
        }).then(() => {
          this.$router.push('/EditPersonalData')
        }).catch(() => {
          // on cancel
        })
      } else if (this.$store.getters.detail.status !== 5 && this.$store.getters.detail.status !== 1) { // 未认证
        Dialog.alert({
          message: '您还未进行红人认证，请先去认证',
        }).then(() => {
          this.$router.push('/Authentication')
        }).catch(() => {
          // on cancel
        })
      } else if (this.detail.customerPhone) {
        this.dialogTableVisible = true
      } else {
        const res = await takeDeliveryGoodsInfo({ goodsId: this.item.goodsId })
        if (res.result === '0') {
          this.detail = res.datas
          this.dialogTableVisible = true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.16rem 0.20rem;
    .img {
      width: 3rem;
      height: 3rem;
      overflow: hidden;
      position: relative;
      margin-bottom: 0.13rem;
      img {
        position: absolute;
        width: 100%;
        min-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .name {
      font-size: 0.24rem;
      color: #666;
      line-height: 0.31rem;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 0.62rem;
      margin-bottom: 0.26rem;
      font-weight: 700;
    }
    .return {
      font-size: 0.24rem;
      color: #666;
      margin-bottom: 0.44rem;
      display: flex;
      align-items: center;
      span {
        font-size: 0.32rem;
        color: #FF5000;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      font-size: 0;
      height: 0.54rem;
      div:nth-child(1) {
        box-sizing: border-box;
        height: 0.54rem;
        text-align: center;
        line-height: 0.54rem;
        color: #AC7EF4;
        font-size: 0.24rem;
        flex: 1;
        border: 1px solid #AC7EF4;
        border-right: none;
        // &::after {
        //   border: 1px solid #AC7EF4;
        // }
      }
      div:nth-child(2) {
        flex: 1;
        height:0.54rem;
        text-align: center;
        line-height: 0.54rem;
        color: #fff;
        font-size: 0.24rem;
        cursor: pointer;
        background-color: #DF56E1;
      }
    }
  }
</style>
<style lang="less">
.van-popup__close-icon {
  font-size: 18px;
}
.van-popup__close-icon--top-right {
  top: 7px;
  right: 10px;
}
</style>
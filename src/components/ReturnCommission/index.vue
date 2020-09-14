<template>
  <div class="item">
    <div class="img" @click="$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)">
      <img :src="item.mainPic" alt="">
    </div>
    <p class="name" @click="$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)">{{item.businessTitle}}</p>
    <div class="info"><span class="price">券后价￥{{item.couponAfterPrice}}</span><span class="coupon"><img :src="require('@/assets/img/coupon.png')" alt="">{{item.couponPrice}}元</span></div>
    <div class="return">佣金￥{{item.commissionPrice}}，比例{{item.proportion}}%</div>
    <div class="btn" @click="getsample">申请取样</div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { Dialog } from 'vant'
export default {
   components: {
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

    }
  },
  methods: {
    getsample () {
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
      } else {
        this.$router.push(`/ReturnCommissionDetail?id=${this.item.goodsId}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.16rem 0.2rem;
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
      margin-bottom: 0.09rem;
      font-weight: 700;
    }
    .info {
      height: 0.37rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
      font-size: 0.24rem;
      .price {
        color: #666;
        padding-right: 0.04rem;
        flex: 1;
      }
      .coupon {
        color: #E2801D;
        display: flex;
        align-items: center;
      }
      img {
        width: 0.28rem;
        margin-right: 0.08rem;
      }
    }
    .return {
      font-size: 0.24rem;
      color: #666;
      margin-bottom: 0.2rem;
    }
    .btn {
      height: 0.54rem;
      text-align: center;
      line-height: 0.54rem;
      color: #fff;
      font-size: 0.24rem;
      cursor: pointer;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
    }
  }
</style>

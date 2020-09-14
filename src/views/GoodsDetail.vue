<template>
  <div class="GoodsDetail">
    <van-nav-bar class="nav" title="商品详情" left-arrow @click-left="back"/>
    <div class="con">
      <div class="detail">
        <div class="headimg"><img :src="baseUrl+detail.mainPic" alt=""></div>
        <div class="detailInfo">
          <p class="name">{{detail.businessTitle}}</p>
          <div class="info">
            拿货价<span>{{detail.goodsPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="shopDetail">
        <img class="logo" :src="baseUrl+detail.headPic" alt="">
        <div class="name">{{detail.shopName}}</div>
        <template v-if="detail.reputationType<6"><img v-for="(item, index) in detail.reputationType" :key="index" class="icon" src="../assets/img/PC/level4.gif" alt=""></template>
        <template v-if="detail.reputationType>5&&detail.reputationType<11"><img class="icon" src="../assets/img/PC/level5.gif" alt=""></template>
        <template v-if="detail.reputationType>10&&detail.reputationType<16"><img class="icon" src="../assets/img/PC/level1.gif" alt=""></template>
        <template v-if="detail.reputationType>15"><img class="icon" src="../assets/img/PC/level2.png" alt=""></template>
        <ul>
          <li>
            <div>宝贝描述</div>
            <span>{{detail.babyDescription}}</span>
          </li>
          <li>
            <div>卖家服务</div>
            <span>{{detail.sellerServices}}</span>
          </li>
          <li>
            <div>物流服务</div>
            <span>{{detail.logisticsService}}</span>
          </li>
        </ul>
      </div>
      <div class="swiper-container1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in samplingList" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="procedure">
        <h5>商品详情</h5>
        <div class="html" v-html="detail.details"></div>
      </div>
    </div>
    <div class="btn" @click="getNow">申请拿货</div>
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
import Swiper from 'swiper'
import { NavBar } from 'vant'
import { rollPropagandaList, takeDeliveryGoodsInfo } from '@/api'
import { baseUrl } from '@/utils/commom'
import { Popup, Dialog } from 'vant'
import { getToken } from '@/utils/auth'
export default {
  name: 'GoodsDetail',
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  data () {
    return {
      baseUrl: baseUrl,
      dialogTableVisible: false,
      detail: {},
      samplingList: ['135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！']
    }
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getrollPropagandaList () {
      const res = await rollPropagandaList({})
      if (res.result === '0') {
        this.samplingList = res.datas.list
        this.$nextTick(() => {
          new Swiper ('.swiper-container1', {
            loop: true,
            direction: 'vertical',
            allowTouchMove: false,
            // 如果需要分页器
            autoplay: {
              delay: 2000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    async gettakeDeliveryGoodsInfo () {
      const res = await takeDeliveryGoodsInfo({ goodsId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        if (this.detail.reputationType > 5 && this.detail.reputationType < 11) this.detail.reputationType -= 5
        if (this.detail.reputationType > 10 && this.detail.reputationType < 16) this.detail.reputationType -= 10
        if (this.detail.reputationType > 15) this.detail.reputationType -= 15
      }
    },
    getNow () {
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
        this.dialogTableVisible = true
      }
    }
  },
  created () {
    this.getrollPropagandaList()
    this.gettakeDeliveryGoodsInfo()
  }
}
</script>

<style lang="less">
  .GoodsDetail {
    height: 100%;
    .con {
      height: calc(100% - 1.92rem);
      box-sizing: border-box;
      overflow: auto;
    }
    .detail {
      background-color: #fff;
      margin-bottom: 0.22rem;
      .headimg {
        height: 4.87rem;
        overflow: hidden;
        position: relative;
        img {
          position: absolute;
          width: 100%;
          min-height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .detailInfo {
        padding: 0 0.24rem;
        border-radius: 0 0 0.1rem 0.1rem;
        .name {
          font-size: 0.28rem;
          line-height: 0.37rem;
          color: #666;
          margin-top: 0.18rem;
          margin-bottom: 0.1rem;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .info {
          font-size: 0.28rem;
          color: #666;
          padding-bottom: 0.20rem;
          span {
            font-size: 0.36rem;
            color: #FF5000;
          }
        }
      }
    }
    .shopDetail {
      padding: 0.18rem 0.24rem;
      box-sizing: border-box;
      border-radius: 0.2rem;
      background-color: #fff;
      overflow: hidden;
      text-align: center;
      .logo {
        width: 1.54rem;
      }
      .name {
        font-size: 0.28rem;
        color: #666;
        margin-top: 0.15rem;
      }
      .icon {
        height: 0.34rem;
        margin-right: 2px;
      }
      ul {
        display: flex;
        width: 85%;
        margin: 0.2rem auto 0;
        li {
          flex: 1;
          text-align: center;
          div {
            color: #666;
            font-size: 0.26rem;
            margin-bottom: 0.26rem;
          }
          span {
            font-size: 0.26rem;
            color: #1677FF;
          }
        }
      }
    }
    .swiper-container1 {
      height: 0.8rem;
      padding: 0 0 0 0.24rem;
      overflow: hidden;
      .swiper-slide {
        font-size: 12px;
        color: #DF56E1;
        line-height: 0.8rem;
        user-select: none;
      }
    }
    .procedure {
      min-height: 2.25rem;
      background-color: #fff;
      padding: 0.2rem 0.24rem;
      margin-bottom: 0.24rem;
      >.html {
        text-align: center;
        font-size: 12px;
        line-height: 22px;
      }
      h5 {
        font-size: 14px;
        color: #666;
        line-height: 19px;
        padding-bottom: 0.2rem;
        border-bottom: 1px dashed #DF56E2;
        margin-bottom: 0.2rem;
      }
    }
    .btn {
      height: 1rem;
      font-size: 0.32rem;
      text-align: center;
      line-height: 1rem;
      color: #fff;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      cursor: pointer;
    }
  }
</style>
<style lang="less">
  .procedure {
    >.html {
      img {
        width: 100%;
        display: block;
        margin: 3px auto;
      }
    }
  }
  .van-popup__close-icon {
    font-size: 18px;
  }
  .van-popup__close-icon--top-right {
    top: 7px;
    right: 10px;
  }
</style>

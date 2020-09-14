<template>
  <div class="SubmiTakeDelivery">
    <van-nav-bar class="nav" title="取样确认" left-arrow @click-left="back"/>
    <div class="con">
      <div class="detail">
        <div class="headimg" @click="godetail"><img :src="detail.mainPic" alt=""></div>
        <div class="detailInfo">
          <p class="name" @click="godetail">{{detail.businessTitle}}</p>
          <div class="info"><span class="price">券后价￥{{detail.couponAfterPrice}}</span><span class="coupon"><img :src="require('@/assets/img/coupon.png')" alt="">{{detail.couponPrice}}元</span></div>
          <div class="return">佣金￥{{detail.commissionPrice}}，比例{{detail.proportion}}%</div>
          <div class="time">活动时间：<span style="transform:scale(0.8)">{{detail.activityStartDate}} ~ {{detail.activityEndDate}}</span></div>
          <div class="num">剩余样品：{{detail.surplusNum}}件</div>
        </div>
      </div>
      <div class="shopDetail">
        <div>
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
      </div>
      <div class="address">
        <div><span>收样人：{{detail.consigneeName}}</span><br><span>电话：{{detail.phone}}</span></div>
        <span>详细地址：{{detail.consigneeAddress}}</span>
      </div>
      <div class="tip">如需变更收样地址，请至个人资料详情中修改</div>
      <div class="nopay" v-if="detail.paymentDeposit===1">
        <div class="payway">由于您的粉丝量级未达到商家设置的要求，请在下单前联系商家，否则商家有可能拒绝您的取样要求。</div>
        <!-- <div class="radio"><img @click="payway=1" :src="payway===1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">微信支付</div>
        <div class="radio"><img @click="payway=2" :src="payway===2?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">支付宝支付</div> -->
        <div class="btn" @click="dialogTableVisible=true">确认取样</div>
      </div>
      <div class="nopay" v-else>
        <div class="payway">您的粉丝数量已达取样标准，您可以：</div>
        <div class="btn" @click="addOrder">确认取样</div>
      </div>
    </div>
    <van-popup v-model="dialogTableVisible" closeable :style="{ width: '6rem' }">
      <div class="con" style="text-align:center">
        <p style="color:#eb453c;line-height:20px">由于您的粉丝量级未达到商家设置的要求，请在下单前联系商家，否则商家有可能拒绝您的取样要求。</p>
        <p style="padding: 10px;font-size: 15px">商家二维码</p>
        <template v-if="detail.customerWeChatPic">
          <img style="width: 5rem" :src="baseUrl+detail.customerWeChatPic" alt="">
        </template>
        <template v-if="detail.customerPhone">
          <div style="padding: 10px;font-size: 13px">商家联系电话：{{detail.customerPhone}}</div>
        </template>
        <div class="sure-btn">
          <div @click="dialogTableVisible=false">取消取样</div>
          <div @click="addOrder">确认取样</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getOrderInfo, addOrder } from '@/api'
import { NavBar, Popup } from 'vant'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'SubmiTakeDelivery',
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup
  },
  data () {
    return {
      payway: '',
      needPay: false,
      detail: {},
      baseUrl: baseUrl,
      dialogTableVisible: false
    }
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getcommissionGoodsInfo () {
      const res = await getOrderInfo({ goodsId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        if (this.detail.reputationType > 5 && this.detail.reputationType < 11) this.detail.reputationType -= 5
        if (this.detail.reputationType > 10 && this.detail.reputationType < 16) this.detail.reputationType -= 10
        if (this.detail.reputationType > 15) this.detail.reputationType -= 15
      } else if (res.result === '403051') {
        this.$router.go(-1)
      }
    },
    async addOrder () {
      const res = await addOrder({ goodsId: this.detail.goodsId, paymentDeposit: this.detail.paymentDeposit })
      if (res.result === '1') {
        this.dialogTableVisible = false
        this.$message({ type: 'success', message: '申请取样成功' })
        this.$router.replace('/MyTakeDelivery')
      }
    },
    godetail () {
      window.open(this.detail.itemUrl)
    }
  },
  created () {
    this.getcommissionGoodsInfo()
  }
}
</script>

<style lang="less" scoped>
  .SubmiTakeDelivery {
    height: 100%;
    .con {
      height: calc(100% - 0.92rem);
      box-sizing: border-box;
      overflow: auto;
      padding: 0.24rem;
    }
    .detail {
      display: flex;
      background-color: #fff;
      padding: 0.24rem;
      display: flex;
      margin-bottom: 0.24rem;
      .headimg {
        width: 2.88rem;
        height: 2.18rem;
        overflow: hidden;
        position: relative;
        margin-right: 0.34rem;
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
        flex: 1;
        .name {
          font-size: 0.24rem;
          line-height: 0.31rem;
          color: #666;
          margin-bottom: 0.2rem;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .info {
          display: flex;
          align-items: center;
          margin-bottom: 0.2rem;
          .price {
            font-size: 0.24rem;
            color: #666;
            flex: 1;
          }
          .coupon {
            display: flex;
            align-items: center;
            font-size: 0.24rem;
            height: 0.26rem;
            color: #E2801D;
            img {
              width: 0.21rem;
            }
          }
        }
        .return {
          font-size: 0.24rem;
          color: #666;
          margin-bottom: 0.2rem;
          line-height: 0.3rem;
        }
        .time {
          font-size: 0.24rem;
          color: #999;
          margin-bottom: 0.2rem;
          white-space: nowrap;
        }
        .num {
          font-size: 0.24rem;
          color: #999;
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
      margin-bottom: 0.22rem;
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
    .address {
      border-radius: 2px;
      background-color: #fff;
      padding: 0.24rem 0;
      font-size: 0.28rem;
      color: #666;
      margin-top: 0.24rem;
      padding-left: 0.24rem;
      span {
        line-height: 22px;
      }
      div {
        line-height: 22px;
      }
    }
    .tip {
      height: 0.7rem;
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      color: #DF56E1;
      padding-left: 0.24rem;
    }
    .pay-con {
      background-color: #fff;
      .payway {
        height: 0.74rem;
        line-height: 0.74rem;
        padding: 0 0.24rem;
        font-size: 0.24rem;
        color: #999;
      }
      .radio {
        position: relative;
        height: 1.04rem;
        padding-left: 0.5rem;
        padding-right: 0.46rem;
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        color: #666;
        img:nth-child(1) {
          width: 0.54rem;
        }
        span {
          flex: 1;
          padding-left: 0.28rem;
        }
        img {
          width: 0.3rem;
          cursor: pointer;
        }
      }
    }
    .nopay {
      background-color: #fff;
      height: 0.84rem;
      font-size: 0.24rem;
      color: #999;
      .payway {
        height: 0.74rem;
        line-height: 0.74rem;
        padding: 0 0.24rem;
        font-size: 0.24rem;
        color: #999
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
      margin-top: 0.24rem;
    }
  }
  .sure-btn {
    display: flex;
    justify-content: center;
    >div:nth-child(1) {
      display: inline-block;
      width: 1.6rem;
      height: 0.6rem;;
      margin-right: 0.6rem;
      font-size: 12px;
      text-align: center;
      line-height: 0.6rem;
      color: #666;
      cursor: pointer;
      background-color: #e9e9e9;
    }
    >div:nth-child(2) {
      display: inline-block;
      width: 1.6rem;
      height: 0.6rem;
      font-size: 12px;
      text-align: center;
      line-height: 0.6rem;
      color: #fff;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      cursor: pointer;
    }
  }
</style>

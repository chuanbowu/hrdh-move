<template>
  <div class="Home">
    <div class="con">
      <div class="search">
        <img :src="require('@/assets/img/logo.png')" alt="">
        <div class="search-box van-hairline--surround">
          <input type="text" v-model="keywords" placeholder="请输入品牌名称进行搜索" @keyup.enter="find">
          <img :src="require('@/assets/img/search.png')" alt="" @click="find">
        </div>
      </div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :style="`background-image:url(${baseUrl + item.advertPic})`" v-for="(item, index) in advertList" :key="index" @click="go(item)"></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="swiper-box">
        <div class="left"><img :src="require('@/assets/img/left.png')" alt=""></div>
        <div class="swiper-container2">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in sensationRecommend" :key="index"><img :src="baseUrl+item.headPic" alt="" @click="$router.push('/SensationsDetail?id='+item.sensationId)"></div>
          </div>
        </div>
        <div class="right"><img :src="require('@/assets/img/right.png')" alt=""></div>
      </div>
      <div class="procedure">
        <img :src="require('@/assets/take.png')" alt="">
      </div>
      <div class="title">
        <img :src="require('@/assets/img/money.png')" alt="">
        <span>返佣推荐</span>
        <img :src="require('@/assets/img/money.png')" alt="">
      </div>
      <tab-nav @changeType="changeType1" />
      <div class="list">
        <return-goods class="goods" v-for="(item, index) in commissionRecommendList" :item="item" :key="index" />
        <div v-show="commissionRecommendList.length===0" style="width: 100%;text-align:center;line-height:2rem;font-size: 13px;color: #999">没有相关类型的商品</div>
      </div>
      <div class="title">
        <img style="width: 0.33rem" :src="require('@/assets/img/Recommend.png')" alt="">
        <span>拿货推荐</span>
        <img style="width: 0.33rem" :src="require('@/assets/img/Recommend.png')" alt="">
      </div>
      <tab-nav @changeType="changeType2" />
      <div class="list">
        <good-recommendation class="goods" v-for="(item, index) in takeDeliveryRecommendList" :item="item" :key="index" />
        <div v-show="takeDeliveryRecommendList.length===0" style="width: 100%;text-align:center;line-height:2rem;font-size: 13px;color: #999">没有相关类型的商品</div>
      </div>
    </div>
    <tab-bar />
  </div>
</template>

<script>
import Swiper from 'swiper'
import TabBar from '@c/tabBar'
import returnGoods from '@c/ReturnCommission'
import GoodRecommendation from '@c/GoodRecommendation'
import { advertList, sensationRecommend, commissionRecommendList, takeDeliveryRecommendList } from '@/api'
import { baseUrl } from '@/utils/commom'
import tabNav from '@c/tabNav'
export default {
  name: 'Home',
  data () {
    return {
      baseUrl: baseUrl,
      keywords: '',
      advertList: [],
      sensationRecommend: [],
      commissionRecommendList: [],
      takeDeliveryRecommendList: [],
      type1: '',
      type2: '',
      samplingList: ['135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！']
    }
  },
  components: {
    returnGoods,
    GoodRecommendation,
    TabBar,
    tabNav
  },
  methods: {
    async getAdvertList () {
      const res = await advertList({})
      if (res.result === '0') {
        this.advertList = res.datas.list
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            observer: true,
            observeParents: true,
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },
            autoplay: {
              delay: 3000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    go (item) {
      if (item.type === 2) {
        this.$router.push(`/GoodsDetail?id=${item.goodsId}`)
      } else {
        this.$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)
      }
    },
    find () {
      this.$router.push(`Search?keywords=${this.keywords}`)
    },
    async getsensationRecommend () {
      const res = await sensationRecommend({})
      if (res.result === '0') {
        this.sensationRecommend = res.datas.list
        this.$nextTick(() => {
          new Swiper('.swiper-container2', {
            loop: true,
            allowTouchMove: false,
            slidesPerView: 5,
            // spaceBetween: 20,
            // 如果需要分页器
            autoplay: {
              delay: 2000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    async getcommissionRecommendList () {
      const res = await commissionRecommendList({ typeId: this.type1 })
      if (res.result === '0') {
        this.commissionRecommendList = res.datas.list
      }
    },
    async gettakeDeliveryRecommendList () {
      const res = await takeDeliveryRecommendList({ typeId: this.type2 })
      if (res.result === '0') {
        this.takeDeliveryRecommendList = res.datas.list
      }
    },
    changeType1 (data) {
      this.type1 = data
      this.getcommissionRecommendList()
    },
    changeType2 (data) {
      this.type2 = data
      this.gettakeDeliveryRecommendList()
    }
  },
  created () {
    this.getAdvertList()
    this.getsensationRecommend()
    this.getcommissionRecommendList()
    this.gettakeDeliveryRecommendList()
  }
}
</script>

<style lang="less" scoped>
  .Home {
    font-size: 0;
    height: 100%;
    .con {
      padding: 0.22rem 0.24rem;
      box-sizing: border-box;
      overflow: auto;
      height: calc(100% - 1rem);
      .search {
        display: flex;
        margin-bottom: 0.22rem;
        >img {
          height: 0.85rem;
          margin-right: 0.18rem;
        }
        .search-box {
          flex: 1;
          height: 0.85rem;
          position: relative;
          box-sizing: border-box;
          &::after {
            border: 1px solid #DF56E1;
          }
          input {
            width: 100%;
            border: none;
            outline: none;
            -webkit-appearance: none;
            background-color: transparent;
            line-height: 1;
            font-size: 0.28rem;
            padding:0.27rem 0.3rem;
            box-sizing: border-box;
            vertical-align: top;
            &::-webkit-input-placeholder{
              color: #DF56E1;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color: #DF56E1;
            }
            &::-ms-input-placeholder { /* Internet Explorer 10-11 */
              color: #DF56E1;
            }
          }
          img {
            position: absolute;
            width: 0.49rem;
            height: 0.43rem;
            top: 50%;
            right: 0.4rem;
            transform: translate(0, -50%);
          }
        }
      }
    }
  }
  .swiper-container {
    height: 2.9rem;
    margin-bottom: 0.22rem;
    .swiper-slide {
      background-size: 100% 100%;
    }
  }
  .swiper-box {
    background-color: #fff;
    padding: 0.12rem 0.18rem;
    display: flex;
    margin-bottom: 0.22rem;
    // background-color: #F7F2FF;
    .swiper-container2 {
      flex: 1;
      overflow: hidden;
      height: 0.94rem;
      .swiper-slide {
        text-align: center;
        img {
          width: 0.94rem;
          height: 0.94rem;
          border-radius: 50%;
          user-select: none;
        }
      }
    }
    .left {
      width: 0.21rem;
      position: relative;
      margin-right: 0.17rem;
      img {
        width: 0.21rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .right {
      width: 0.21rem;
      position: relative;
      margin-left: 0.17rem;
      img {
        width: 0.21rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .recomend {
    margin-bottom: 24px;
    li {
      display: inline-block;
      width: 275px;
      height: 255px;
      position: relative;
      margin-right: 20px;
      overflow: hidden;
      box-sizing: border-box;
      vertical-align: top;
      &:last-child {
        padding: 35px 0;
        margin-right: 0;
      }
      img {
        position: absolute;
        width: 100%;
        min-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      p {
        position: absolute;
        bottom: 7px;
        width: calc(100% - 30px);
        padding: 0 15px;
        font-size: 25px;
        color: #fff;
        line-height: 33px;
      }
    }
  }
  .swiper-container1 {
    height: 185px;
    overflow: hidden;
    .swiper-slide {
      font-size: 12px;
      color: #DF56E1;
      text-align: center;
      user-select: none;
    }
  }
  .Sensation {
    padding: 5px;
    box-sizing: border-box;
    background-color: #fff;
    height: 160px;
    margin-bottom: 24px;
    overflow: hidden;
    .search-box {
      width: 262px;
      height: 150px;
      background-color: #F1F1F1;
      padding: 26px 15px 28px;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      h5 {
        font-size: 16px;
        color: #2B2B2B;
      }
      h5:nth-child(1) {
        margin-bottom: 10px;
      }
      h5:nth-child(2) {
        margin-bottom: 12px;
      }
      .search-input {
        width: 231px;
        border: 1px solid #DDDDDD;
        position: relative;
        input {
          width: 100%;
          border: none;
          outline: none;
          box-sizing: border-box;
          background-color: transparent;
          font-size: 16px;
          line-height: 1;
          padding: 8px 40px 8px 10px;
          color: #6E6D6E;
          &::-webkit-input-placeholder{
            color: #6E6D6E;
          }
          &::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color: #6E6D6E;
          }
          &::-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color: #6E6D6E;
          }
        }
        img {
          position: absolute;
          top: 50%;
          right: 22px;
          transform: translate(0, -50%);
          width: 17px;
          cursor: pointer;
        }
      }
    }
  }
  .procedure {
    height: 2.25rem;
    font-size: 0;
    background-color: #fff;
    margin-bottom: 0.24rem;
    img {
      width: 100%;
    }
  }
  .title {
    height: 0.78rem;
    line-height: 0.78rem;
    text-align: center;
    background:linear-gradient(270deg,rgba(253,155,255,1) 0%,rgba(254,211,211,1) 100%);
    span {
      display: inline-block;
      vertical-align: middle;
      width: 1.62rem;
      text-align: center;
      font-size: 0.25rem;
      color: #fff;
    }
    img {
      width: 0.19rem;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods {
      margin-bottom: 0.22rem;
      width: 3.4rem;
    }
  }
</style>

<style>
  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 0.07rem;
  }
  .swiper-pagination-bullet {
    width: 0.1rem;
    height: 0.1rem;
    opacity: 1;
    background: #fff;
  }
  .swiper-pagination-bullet-active {
    background: #DF56E1;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 0.16rem;
  }
</style>

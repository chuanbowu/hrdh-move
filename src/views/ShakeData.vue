<template>
  <div class="ShakeData">
    <div class="con">
      <van-tabs v-model="active" color="#DF56E1">
        <van-tab title="拿货专区"></van-tab>
        <van-tab title="返佣专区"></van-tab>
        <van-tab title="好物榜"></van-tab>
      </van-tabs>
      <template v-if="active===2">
        <div class="tab">
          <div class="tab-item" :class="tab===1?'active':''" @click="changeTab(1)">品牌拿货</div>
          <div class="tab-item" :class="tab===2?'active':''" @click="changeTab(2)">品牌返佣</div>
        </div>
      </template>
      <div class="search">
        <img :src="require('@/assets/img/logo.png')" alt="">
        <div class="search-box van-hairline--surround">
          <input type="text" v-model="keywords" placeholder="请输入品牌名称进行搜索" @keyup.enter="find">
          <img :src="require('@/assets/img/search.png')" alt="" @click="find">
        </div>
      </div>
      <div class="container" ref="list" :class="{active: active===2}">
        <div class="list-con" ref="list1">
          <div v-show="active===1" class="banner" @click="$router.push(`ReturnCommissionDetail?id=${goodsAdvert1.goodsId}`)" :style="`background-image:url(${baseUrl + goodsAdvert1.advertisementPic});background-repeat: no-repeat;background-size:100%;background-position: center center;`"></div>
          <div v-show="active===0" class="banner" @click="$router.push(`GoodsDetail?id=${goodsAdvert2.goodsId}`)" :style="`background-image:url(${baseUrl + goodsAdvert2.advertisementPic});background-repeat: no-repeat;background-size:100%;background-position: center center;`"></div>
          <template>
            <div class="list" v-show="active===0">
              <tab-nav @changeType="changeType1" />
              <good-recommendation class="goods" v-for="(item, index) in list1" :item="item" :key="index" />
              <div class="nodata" v-if="list1.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
                “没有相关商品”
              </div>
              <div class="bottom">
                <div class="loading" v-show="isLoading1"><van-loading size="15px">加载中...</van-loading></div>
                <div class="no-more" v-show="list1.length>0&&list1.length>=total1">没有更多了</div>
              </div>
            </div>
          </template>
          <template>
            <div class="list" v-show="active===1">
              <tab-nav @changeType="changeType2" />
              <return-goods class="goods" v-for="(item, index) in list2" :item="item" :key="index" />
              <div class="nodata" v-if="list2.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
                “没有相关商品”
              </div>
              <div class="bottom">
                <div class="loading" v-show="isLoading2"><van-loading size="15px">加载中...</van-loading></div>
                <div class="no-more" v-show="list2.length>0&&list2.length>=total2">没有更多了</div>
              </div>
            </div>
          </template>
          <template>
            <div class="list" v-show="active===2&&tab===1">
              <tab-nav @changeType="changeType3" />
              <good-recommendation class="goods" v-for="(item, index) in list3" :item="item" :key="index" />
              <div class="nodata" v-if="list3.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
                “没有相关商品”
              </div>
              <div class="bottom">
                <div class="loading" v-show="isLoading3"><van-loading size="15px">加载中...</van-loading></div>
                <div class="no-more" v-show="list3.length>0&&list3.length>=total3">没有更多了</div>
              </div>
            </div>
          </template>
          <template>
            <div class="list" v-show="active===2&&tab===2">
              <tab-nav @changeType="changeType4" />
              <return-goods class="goods" v-for="(item, index) in list4" :item="item" :key="index" />
              <div class="nodata" v-if="list4.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
                “没有相关商品”
              </div>
              <div class="bottom">
                <div class="loading" v-show="isLoading4"><van-loading size="15px">加载中...</van-loading></div>
                <div class="no-more" v-show="list4.length>0&&list4.length>=total4">没有更多了</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <tab-bar />
  </div>
</template>

<script>
import Swiper from 'swiper'
import GoodRecommendation from '@c/GoodRecommendation'
import returnGoods from '@c/ReturnCommission'
import TabBar from '@c/tabBar'
import { Tab, Tabs, Loading } from 'vant'
import tabNav from '@c/tabNav'
import { baseUrl } from '@/utils/commom'
import { takeDeliveryGoodsList, goodsAdvertisementList, commissionGoodsList, brandCommissionGoodsList, brandTakeDeliveryGoodsList } from '@/api'
export default {
  name: 'ShakeData',
  components: {
    GoodRecommendation,
    returnGoods,
    TabBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Loading.name]: Loading,
    tabNav
  },
  data () {
    return {
      active: 0,
      type1: '',
      type2: '',
      type3: '',
      type4: '',
      tab: 1,
      keywords: '',
      baseUrl: baseUrl,
      page1: 1,
      total1: 0,
      isLoading1: false,
      nomore1: false,
      list1: [],
      page2: 1,
      total2: 0,
      isLoading2: false,
      nomore2: false,
      list2: [],
      page3: 1,
      total3: 0,
      isLoading3: false,
      nomore3: false,
      list3: [],
      page4: 1,
      total4: 0,
      isLoading4: false,
      nomore4: false,
      list4: [],
      goodsAdvert1: {},
      goodsAdvert2: {}
    }
  },
  methods: {
    find () {
      this.$router.push(`SearchShakeData?keywords=${this.keywords}`)
    },
    changeTab (index) {
      this.tab = index
    },
    async getgoodsAdvertisementList (type) {
      const res = await goodsAdvertisementList({ type: type })
      if (res.result === '0') {
        if (type === 1) this.goodsAdvert1 = res.datas.list[0] || {}
        if (type === 2) this.goodsAdvert2 = res.datas.list[0] || {}
      }
    },
    changeType1 (data) {
      this.type1 = data
      this.page1 = 1
      this.list1 = []
      this.gettakeDeliveryGoodsList()
    },
    changeType2 (data) {
      this.type2 = data
      this.page2 = 1
      this.list2 = []
      this.getcommissionGoodsList()
    },
    changeType3 (data) {
      this.type3 = data
      this.page3 = 1
      this.list3 = []
      this.getbrandTakeDeliveryGoodsList()
    },
    changeType4 (data) {
      this.type4 = data
      this.page4 = 1
      this.list4 = []
      this.getbrandCommissionGoodsList()
    },
    async gettakeDeliveryGoodsList () {
      const res = await takeDeliveryGoodsList({ typeId: this.type1, pageNum: this.page1, pageSize: 10 })
      if (res.result === '0') {
        if (this.page1 === 1) {
          this.list1 = res.datas.list
        } else {
          this.list1 = [...this.list1, ...res.datas.list]
        }
        this.total1 = res.datas.totalRow
        this.isLoading1 = false
      }
    },
    async getcommissionGoodsList () {
      const res = await commissionGoodsList({ typeId: this.type2, pageNum: this.page2, pageSize: 10 })
      if (res.result === '0') {
        if (this.page2 === 1) {
          this.list2 = res.datas.list
        } else {
          this.list2 = [...this.list2, ...res.datas.list]
        }
        this.total2 = res.datas.totalRow
        this.isLoading2 = false
      }
    },
    async getbrandTakeDeliveryGoodsList () {
      const res = await brandTakeDeliveryGoodsList({ typeId: this.type3, goodsName: '', pageNum: this.page3, pageSize: 10 })
      if (res.result === '0') {
        if (this.page3 === 1) {
          this.list3 = res.datas.list
        } else {
          this.list3 = [...this.list3, ...res.datas.list]
        }
        this.total3 = res.datas.totalRow
        this.isLoading = false
      }
    },
    async getbrandCommissionGoodsList () {
      const res = await brandCommissionGoodsList({ typeId: this.type4, goodsName: '', pageNum: this.page4, pageSize: 10 })
      if (res.result === '0') {
        if (this.page4 === 1) {
          this.list4 = res.datas.list
        } else {
          this.list4 = [...this.list4, ...res.datas.list]
        }
        this.total4 = res.datas.totalRow
        this.isLoading = false
      }
    },
    scroll (e) {
      const t = this.$refs.list.scrollTop
      const h =  this.$refs.list.clientHeight
      const H =  this.$refs.list1.clientHeight
      if (this.active === 0) {
        if (this.isLoading1) return
        if (t + h >= H - 10) { // 
          if (this.list1.length < this.total1) { // 加载更多
            this.isLoading1 = true
            this.page1++
            this.gettakeDeliveryGoodsList()
          }
        }
      } else if (this.active === 1) {
        if (this.isLoading2) return
        if (t + h >= H - 10) { // 到底了
          if (this.list2.length < this.total2) { // 加载更多
            this.isLoading2 = true
            this.page2++
            this.getcommissionGoodsList()
          }
        }
      } else if (this.active === 2 && this.tab === 1) {
        if (this.isLoading3) return
        if (t + h >= H - 10) { // 到底了
          if (this.list3.length < this.total3) { // 加载更多
            this.isLoading3 = true
            this.page3++
            this.getbrandTakeDeliveryGoodsList()
          }
        }
      } else if (this.active === 2 && this.tab === 2) {
        if (this.isLoading4) return
        if (t + h >= H - 10) { // 到底了
          if (this.list4.length < this.total4) { // 加载更多
            this.isLoading4 = true
            this.page4++
            this.getbrandCommissionGoodsList()
          }
        }
      }
    }
  },
  mounted () {
    this.$refs.list.addEventListener('scroll', this.scroll)
  },
  created () {
    this.gettakeDeliveryGoodsList()
    this.getcommissionGoodsList()
    this.getbrandTakeDeliveryGoodsList()
    this.getbrandCommissionGoodsList()
    this.getgoodsAdvertisementList(1)
    this.getgoodsAdvertisementList(2)
  }
}
</script>

<style lang="less" scoped>
.ShakeData {
  font-size: 0;
  height: 100%;
  .con {
    padding: 0.22rem 0.24rem;
    box-sizing: border-box;
    height: calc(100% - 1rem);
    overflow: auto;
    .search {
      display: flex;
      margin-top: 0.22rem;
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
.tab {
  display: flex;
  justify-content: space-between;
  margin-top: 0.22rem;
  .tab-item {
    display: inline-block;
    width: 2.98rem;
    height: 0.54rem;
    line-height: 0.54rem;
    text-align: center;
    color: #DF56E1;
    font-size: 0.24rem;
    background:rgba(255,255,255,1);
    border-radius: 0.27rem;
    position: relative;
    cursor: pointer;
    &:last-of-type {
      margin-right: 0;
      &::before {
        left: 1.98rem;
      }
      &.active {
        &::before {
          background: rgb(211, 95, 229);
        }
      }
    }
    &::before {
      content: '';
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      position: absolute;
      bottom: -0.06rem;
      left: 0.7rem;
      background:rgba(255,255,255,1);
    }
    &.active {
      color: #ffffff;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      &::before {
        background: rgb(186, 115, 239);
      }
    }
  }
}
.banner {
  height: 2.9rem;
}
.container {
  height: calc(100% - 2.17rem);
  overflow: auto;
  &.active {
    height: calc(100% - 2.93rem);
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
.nodata {
  width: 100%;
  margin-bottom: 0.22rem;
  line-height: 3rem;
  // background-color: #fff;
  text-align: center;
  font-size: 0.24rem;
  color: #666;
}
.bottom {
  width: 100%;
  .loading {
    text-align: center;
  }
  .no-more {
    font-size: 13px;
    color: #969799;
    text-align: center;
    line-height: 0.46rem;
  }
}
</style>
<style>
  .van-tab {
    color: #666;
  }
  .van-tab--active {
    color: #DF56E1;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 0.88rem;
  }
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

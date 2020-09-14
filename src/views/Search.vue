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
      <div class="tab">
        <div class="tab-item" :class="tab===2?'active':''" @click="changeTab(2)">返佣商品</div>
        <div class="tab-item" :class="tab===1?'active':''" @click="changeTab(1)">拿货商品</div>
      </div>
      <div class="list-con" ref="list">
        <div class="list" ref="list2" v-show="tab===2">
          <!-- <return-goods class="goods" v-for="(item, index) in 8" :key="index" /> -->
          <return-goods class="goods" v-for="(item, index) in commissionList" :item="item" :key="index" />
          <div class="nodata" v-if="commissionList.length===0">
            抱歉，没有搜索到‘<span style="color: #eb453c; font-weight:700">{{searchresult}}</span>’相关的商品
          </div>
        </div>
        <div class="list" ref="list1" v-show="tab===1">
          <good-recommendation class="goods" v-for="(item, index) in goodstakeDeliveryList" :item="item" :key="index" />
          <!-- <good-recommendation class="goods" v-for="(item, index) in 8" :key="index" /> -->
          <div class="nodata" v-if="goodstakeDeliveryList.length===0">
            抱歉，没有搜索到‘<span style="color: #eb453c; font-weight:700">{{searchresult}}</span>’相关的商品
          </div>
        </div>
        <div class="bottom">
          <div class="loading" v-show="isLoading"><van-loading size="15px">加载中...</van-loading></div>
          <div class="no-more" v-show="tab===2&&commissionList.length>0&&commissionList.length>=total1">没有更多了</div>
          <div class="no-more" v-show="tab===1&&goodstakeDeliveryList.length>0&&goodstakeDeliveryList.length>=total2">没有更多了</div>
        </div>
      </div>
    </div>
    <tab-bar />
  </div>
</template>

<script>
import TabBar from '@c/tabBar'
import { Loading } from 'vant'
import returnGoods from '@c/ReturnCommission'
import GoodRecommendation from '@c/GoodRecommendation'
import { commissionGoodsSearchList, takeDeliveryGoodsSearchList, takeDeliveryGoodsList, commissionGoodsList } from '@/api'
export default {
  name: 'Home',
  data () {
    return {
      goodstakeDeliveryList: [],
      commissionList: [],
      tab: 2,
      page1: 1,
      page2: 1,
      total1: -1,
      total2: -1,
      keywords: '',
      searchresult: '',
      isLoading: false,
      nomore1: false,
      nomore2: false
    }
  },
  components: {
    returnGoods,
    GoodRecommendation,
    TabBar,
    [Loading.name]: Loading
  },
  methods: {
    async getcommissionGoodsSearchList () {
      let res
      if (this.keywords) {
        res = await commissionGoodsSearchList({ goodsName: this.keywords, pageNum: this.page1, pageSize: 10 })
      } else {
        res = await commissionGoodsList({ typeId: '', pageNum: this.page1, pageSize: 10 })
      }
      if (res.result === '0') {
        this.searchresult = this.keywords
        if (this.page1 === 1) {
          this.commissionList = res.datas.list
        } else {
          this.commissionList = [...this.commissionList, ...res.datas.list]
        }
        this.total1 = res.datas.totalRow
        this.isLoading = false
      }
    },
    async gettakeDeliveryGoodsSearchList () {
      let res
      if (this.keywords) {
        res = await takeDeliveryGoodsSearchList({ goodsName: this.keywords, pageNum: this.page2, pageSize: 10 })
      } else {
        res = await takeDeliveryGoodsList({ typeId: '', pageNum: this.page2, pageSize: 10 })
      }
      if (res.result === '0') {
        this.searchresult = this.keywords
        if (this.page1 === 1) {
          this.goodstakeDeliveryList = res.datas.list
        } else {
          this.goodstakeDeliveryList = [...this.goodstakeDeliveryList, ...res.datas.list]
        }
        this.total2 = res.datas.totalRow
        this.isLoading = false
      }
    },
    go (item) {
      if (item.type === 1) {
        this.$router.push(`/GoodsDetail?id=${item.goodsId}`)
      } else {
        this.$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)
      }
    },
    find () {
      this.getcommissionGoodsSearchList()
      this.gettakeDeliveryGoodsSearchList()
    },
    changeTab (index) {
      this.tab = index
      // this.page = { totalPage: 0, currentPage: 1 }
      // this.type = 0
      // if (this.tab === 1) this.getbrandTakeDeliveryGoodsList()
      // else this.getbrandCommissionGoodsList()
    },
    scroll (e) {
      if (this.isLoading) return
      const t = this.$refs.list.scrollTop
      const h =  this.$refs.list.clientHeight
      const H =  this.tab === 1 ? this.$refs.list1.clientHeight : this.$refs.list2.clientHeight
      if (t + h >= H - 10) { // 到底了
        if (this.tab === 1) {
          if (this.goodstakeDeliveryList.length < this.total2) { // 加载更多
            this.isLoading = true
            this.page2++
            this.gettakeDeliveryGoodsSearchList()
          }
        } else {
          if (this.commissionList.length < this.total1) { // 加载更多
            this.isLoading = true
            this.page1++
            this.getcommissionGoodsSearchList()
          }
        }
      }
    }
  },
  mounted () {
    this.$refs.list.addEventListener('scroll', this.scroll)
  },
  created () {
    if (this.$route.query.keywords) {
      this.keywords = this.$route.query.keywords
      this.searchresult = this.$route.query.keywords
    }
    this.getcommissionGoodsSearchList()
    this.gettakeDeliveryGoodsSearchList()
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
  .tab {
    display: flex;
    justify-content: space-between;
    margin-top: 0.22rem;
    margin-bottom: 0.22rem;
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
  .list-con {
    height: calc(100% - 1.83rem);
    overflow: auto;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .goods {
      margin-right: 0.22rem;
      margin-bottom: 0.22rem;
      width: 3.4rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
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

<template>
  <div class="MyTakeDelivery">
    <van-nav-bar class="nav" title="我的取样" left-arrow @click-left="back"/>
    <div class="list-con" ref="list">
      <div class="list" ref="list1">
        <div class="item" v-for="(item, index) in list" :key="index" @click="$router.push(`/MyTakeDeliveryDetail?id=${item.orderId}`)">
          <div class="img"><img :src="item.mainPic" alt=""></div>
          <div class="info">
            <p class="name">{{item.businessTitle}}</p>
            <!-- <div class="price1"><img :src="require('@/assets/img/PC/deposit.png')" alt=""><span>￥{{item.depositPrice}}</span></div> -->
            <div class="price2">商品券后价<span>￥{{item.couponAfterPrice}}</span></div>
            <div class="return">佣金￥{{item.commissionPrice}}，比例{{item.proportion}}%</div>
          </div>
        </div>
        <div class="nodata" v-if="list.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
          “暂无取样记录”
        </div>
        <div class="bottom">
          <div class="loading" v-show="isLoading"><van-loading size="15px">加载中...</van-loading></div>
          <div class="no-more" v-show="list.length>0&&list.length>=total">没有更多了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Loading } from 'vant'
import { orderList } from '@/api'
export default {
  name: 'MyTakeDelivery',
  components: {
    [NavBar.name]: NavBar,
    [Loading.name]: Loading
  },
  data () {
    return {
      page: 1,
      total: 0,
      isLoading: false,
      nomore: false,
      list: []
    }
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getorderList () {
      const res = await orderList({ pageNum: this.page, pageSize: 10 })
      if (res.result === '0') {
        if (this.page === 1) {
          this.list = res.datas.list
        } else {
          this.list = [...this.list, ...res.datas.list]
        }
        this.total = res.datas.totalRow
        this.isLoading = false
      }
    },
    scroll (e) {
      if (this.isLoading) return
      const t = this.$refs.list.scrollTop
      const h =  this.$refs.list.clientHeight
      const H =  this.$refs.list1.clientHeight
      if (t + h >= H - 10) { // 到底了
        if (this.list.length < this.total) { // 加载更多
          this.isLoading = true
          this.page++
          this.getorderList()
        }
      }
    }
  },
  mounted () {
    this.$refs.list.addEventListener('scroll', this.scroll)
  },
  created () {
    this.getorderList()
  }
}
</script>

<style lang="less" scoped>
  .MyTakeDelivery {
    height: 100%;
    .list-con {
      height: calc(100% - 0.92rem);
      overflow: auto;
    }
    .list {
      padding:0 0.24rem .24rem;
      box-sizing: border-box;
      margin-top: 0.34rem;
      .item {
        padding: 0.24rem;
        margin-bottom: 0.22rem;
        background-color: #fff;
        display: flex;
        .img {
          width: 2.88rem;
          height: 2.18rem;
          overflow: hidden;
          position: relative;
          margin-right: 0.38rem;
          img {
            position: absolute;
            width: 100%;
            min-height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .info {
          flex: 1;
          .name {
            font-size: 0.24rem;
            color: #666;
            line-height: 0.31rem;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 0.2rem;
          }
          .price1 {
            margin-bottom: 0.34rem;
            img {
              width: 0.33rem;
              vertical-align: bottom;
            }
            span {
              font-size: 0.24rem;
              line-height: 0.29rem;
              color: #E2801D;
              padding-left: 0.09rem;
            }
          }
          .price2 {
            font-size: 0.24rem;
            color: #666;
            margin-bottom: 0.2rem;
            span {
              padding-left: 0.12rem;
              color: #EB0000;
            }
          }
          .return {
            font-size: 0.24rem;
            color: #666;
          }
        }
      }
    }
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

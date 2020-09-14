<template>
  <div class="WithdrawalRecord">
    <van-nav-bar class="nav" title="提现记录" left-arrow @click-left="back"/>
    <div class="container" ref="list">
      <div class="con" ref="list1">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="s"><img :src="require('@/assets/img/PC/now.png')" alt=""><span>{{item.status==1?'提现中':item.status==2?'已提现':'提现失败'}}</span><div><span>{{item.moneyPrice}}</span>元</div></div>
          <div class="time">{{item.withdrawDate}}</div>
        </div>
        <div class="nodata" v-if="list.length===0">暂时没有数据</div>
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
import { sensationWithdrawInfoList } from '@/api'
export default {
  name: 'WithdrawalRecord',
  data () {
    return {
      page: 1,
      total: 0,
      isLoading: false,
      nomore: false,
      list: []
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Loading.name]: Loading
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getsensationWithdrawInfoList () {
      const res = await sensationWithdrawInfoList({ pageNum: this.page, pageSize: 10 })
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
          this.getsensationWithdrawInfoList()
        }
      }
    }
  },
   mounted () {
    this.$refs.list.addEventListener('scroll', this.scroll)
  },
  created () {
    this.getsensationWithdrawInfoList()
  }
}
</script>

<style lang="less" scoped>
  .WithdrawalRecord {
    height: 100%;
    .container {
      height: calc(100% - 0.92rem);
      overflow: auto;
    }
    .con {
      padding:0.24rem;
      box-sizing: border-box;
    }
    .item {
      padding: 0.25rem 0.38rem;
      margin-bottom: 0.24rem;
      background-color: #fff;
      .s {
        display: flex;
        align-items: center;
        img {
          width: 0.44rem;
          height: 0.44rem;
        }
        span {
          font-size: 0.26rem;
          color: #666;
          flex: 1;
          padding-left: 0.24rem;
        }
        div {
          font-size: 0.26rem;
          color: #666;
          span {
            font-size: 0.36rem;
            color: #EB0000;
            font-weight: 700;
          }
        }
      }
      .time {
        margin-top: 0.26rem;
        font-size: 0.26rem;
        color: #999;
      }
    }
    .nodata {
      line-height:3rem;
      text-align: center;
      color: #999;
      font-size: 0.3rem;
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
  }
</style>

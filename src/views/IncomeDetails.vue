<template>
  <div class="IncomeDetails">
    <van-nav-bar class="nav" title="收入明细" left-arrow @click-left="back"/>
    <div class="container" ref="list">
      <div class="con" ref="list1">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="name">{{item.businessTitle}}</div>
          <div class="price">
            <div>收入<span>{{item.commissionPrice}}</span>元</div><div class="van-hairline--surround">{{item.type===1?'即将到帐':item.type===2?'已到账':'违规处罚'}}</div><span>{{item.incomeDate}}</span>
          </div>
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
import { sensationIncomeList } from '@/api'
export default {
  name: 'IncomeDetails',
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
    async getsensationIncomeList () {
      const res = await sensationIncomeList({ pageNum: this.page, pageSize: 10 })
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
          this.getsensationIncomeList()
        }
      }
    }
  },
  mounted () {
    this.$refs.list.addEventListener('scroll', this.scroll)
  },
  created () {
    this.getsensationIncomeList()
  }
}
</script>

<style lang="less" scoped>
  .IncomeDetails {
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
      padding: 0.24rem;
      background: #fff;
      margin-bottom: 0.24rem;
      .name {
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 0.31rem;
        font-size: 0.24rem;
        color: #666;
        margin-bottom: 0.22rem;
      }
      .price {
        display: flex;
        align-items: center;
        >span {
          flex: 1;
          text-align: right;
          font-size: 0.24rem;
          color: #666;
        }
        div:nth-child(1) {
          font-size: 0.26rem;
          color: #666;
          span {
            font-size: 0.36rem;
            color: #EB0000;
            font-weight: 700;
          }
        }
        div:nth-child(2) {
          padding: 0 0.12rem;
          height: 0.36rem;
          line-height: 0.36rem;
          text-align: center;
          font-size: 0.24rem;
          color: rgba(223,86,225,1);
          margin-left: 0.22rem;
          &:after {
            border-radius: 0.16rem;
            border:1px solid rgba(223,86,225,1);
          }
          &.active {
            color: #23C654;
            &:after {
            border-radius: 0.16rem;
            border:1px solid #23C654;
          }
          }
        }
      }
    }
    .nodata {
      line-height:3rem;
      text-align: center;
      color: #999;
      font-size: 0.3rem;
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

<template>
  <div class="Sensations">
    <div class="search">
      <img :src="require('@/assets/img/logo.png')" alt="">
      <div class="search-box van-hairline--surround">
        <input type="text" v-model="keywords" placeholder="请输入红人昵称进行搜索" @keyup.enter="find">
        <img :src="require('@/assets/img/search.png')" alt="" @click="find">
      </div>
    </div>
    <div class="list-con" ref="list">
      <div class="list" ref="list1">
        <div class="item" v-for="(item, index) in sensationSearchList" :key="index">
          <div class="img">
            <img :src="baseUrl+item.headPic" alt="">
          </div>
          <p class="name">{{item.nickName}}</p>
          <p class="fans">粉丝：{{item.followersNum}}人</p>
          <div class="info">
            <div>
              <div>{{item.totalLikedNum}}</div>
              <span>获赞总量</span>
            </div>
            <div>
              <div>{{item.singleHighestNum}}</div>
              <span>单条最高获赞</span>
            </div>
          </div>
          <div class="info" style="margin-top:15px">
            <div>
              <div>{{item.followersSpreadType===1?'男女平衡':item.followersSpreadType===2?'男粉较多':'女粉较多'}}</div>
              <span>粉丝偏向</span>
            </div>
            <div>
              <div>{{item.provinceName}}</div>
              <span>所在地区</span>
            </div>
          </div>
          <div class="btn">
            <div @click="openagentList=true">咨询经纪人</div>
            <div @click="$router.push(`/SensationsDetail?id=${item.sensationId}`)">查看详情</div>
          </div>
        </div>
        <div class="nodata" v-if="sensationSearchList.length===0" style="text-align: center;line-height:400px;color:#DF56E1;font-size: 13px;font-weight:700">
          “没有相关结果”
        </div>
      </div>
      <div class="bottom">
        <div class="loading" v-show="isLoading"><van-loading size="15px">加载中...</van-loading></div>
        <div class="no-more" v-show="sensationSearchList.length>0&&sensationSearchList.length>=total">没有更多了</div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="openagentList" class="agent-box">
        <div class="agent-con">
          <div class="rotate1"></div>
          <div class="rotate2"></div>
          <div class="rotate3"></div>
          <div class="rotate4"></div>
          <div class="con">
            <i class="el-icon-close close" @click="openagentList=false"></i>
            <div class="scan-title"><span>扫一扫添加经纪人微信</span></div>
            <div class="code" v-for="(item, index) in list" :key="index">
              <img :src="baseUrl + item.agentPic" alt="">
              <p>{{item.agentName}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <tab-bar />
  </div>
</template>

<script>
import { Icon, Loading } from 'vant'
import { baseUrl } from '@/utils/commom'
import TabBar from '@c/tabBar'
import { sensationList, sensationSearchList, agentList } from '@/api'
export default {
  name: 'Sensations',
  components: {
    TabBar,
    [Icon.name]: Icon,
    [Loading.name]: Loading
  },
  data () {
    return {
      keywords: '',
      baseUrl: baseUrl,
      openagentList: false,
      list: [],
      sensationSearchList: [],
      page: 1,
      total: 0,
      isLoading: false,
      nomore: false,
    }
  },
  methods: {
    find () {
      this.page = 1
      if (this.keywords) this.getsensationSearchList()
      else this.getsensationList()
    },
    async getsensationList () {
      const res = await sensationList({ contentType: '', followersType: '', followersSpreadType: '', totalLikedType: '', provinceType: '', extensionType: '', pageNum: this.page, pageSize: 12 })
      if (res.result === '0') {
        if (this.page === 1) {
          this.sensationSearchList = res.datas.list
        } else {
          this.sensationSearchList = [...this.sensationSearchList, ...res.datas.list]
        }
        this.total = res.datas.totalRow
        this.isLoading = false
      }
    },
    async getsensationSearchList () {
      const res = await sensationSearchList({ nickName: this.$route.query.keywords, pageNum: this.page, pageSize: 12 })
      if (res.result === '0') {
        if (this.page === 1) {
          this.sensationSearchList = res.datas.list
        } else {
          this.sensationSearchList = [...this.sensationSearchList, ...res.datas.list]
        }
        this.total = res.datas.totalRow
        this.isLoading = false
      }
    },
    async getagentList () {
      const res = await agentList({})
      if (res.result === '0') {
        this.list = res.datas.list
      }
    },
    scroll (e) {
      if (this.isLoading) return
      const t = this.$refs.list.scrollTop
      const h =  this.$refs.list.clientHeight
      const H =  this.$refs.list1.clientHeight
      if (t + h >= H - 10) { // 到底了
        if (this.sensationSearchList.length < this.total) { // 加载更多
          this.isLoading = true
          this.page++
          this.getsensationList()
        }
      }
    }
  },
  mounted () {
    this.$refs.list.addEventListener('scroll', this.scroll)
  },
  created () {
    this.getagentList()
    if (this.$route.query.keywords) {
      this.keywords = this.$route.query.keywords
      this.getsensationSearchList()
    } else {
      this.getsensationList()
    }
  }
}
</script>

<style lang="less" scoped>
  .Sensations {
    box-sizing: border-box;
    padding-top: 0.24rem;
    margin: 0 auto;
    height: 100%;
    .search {
      display: flex;
      margin-bottom: 0.22rem;
      padding: 0  0.24rem;
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
  .list-con {
    height: calc(100% - 2.07rem);
    overflow: auto;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      margin-bottom: 0.22rem;
      width: 3.4rem;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 0.28rem;
      .img {
        width: 1.36rem;
        height: 1.36rem;
        overflow: hidden;
        position: relative;
        margin: 0 auto 0.22rem;
        img {
          position: absolute;
          width: 100%;
          min-height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
      }
      .name {
        font-size: 0.24rem;
        color: #000;
        text-align: center;
        line-height: 0.31rem;
        margin-bottom: 0.1rem;
      }
      .fans {
        font-size: 0.24rem;
        color: #666;
        text-align: center;
        margin-bottom: 0.28rem;
      }
      .info {
        display: flex;
        >div {
          flex: 1;
          text-align: center;
          font-size: 0.24rem;
          color: #666;
          overflow: hidden;
          div {
            line-height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .btn {
        display: flex;
        align-items: center;
        font-size: 0;
        height: 0.54rem;
        margin-top: 0.2rem;
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
  .agent-box {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    z-index: 1;
    .agent-con {
      position: absolute;
      width: 7.02rem;
      box-sizing: border-box;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border: 4px solid rgba(223,86,225,.5);
    }
    .diong {
      position: relative;
      z-index: 10;
      width: 100%;
      margin: 20px auto;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0.3rem 0.3rem 0;
      text-align: center;
      .close {
        position: absolute;
        top: -15px;
        right: 8px;
        font-size: 18px;
        cursor: pointer;
        color: #999;
        z-index: 20;
      }
      .scan-title {
        height: 22px;
        line-height: 22px;
        text-align: center;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 1.2rem;
          height: 1px;
          background-color: #DF56E1;
          left: 0.6rem;
          top: 50%;
          transform: translate(0, -50%);
        }
        &::after {
          content: '';
          position: absolute;
          width: 1.2rem;
          height: 1px;
          background-color: #DF56E1;
          right: 0.6rem;
          top: 50%;
          transform: translate(0, -50%);
        }
        span {
          font-size: 0.3rem;
          color: #DF56E1;
          background-color: #fff;
          padding: 0 0.2rem;
          position: relative;
          z-index: 10;
        }
      }
      .code-con {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 0.2rem;
      }
      .code {
        width: 2.8rem;
        img {
          width: 2.8rem;
        }
        p {
          text-align: center;
          font-size: 0.34rem;
          color: #DF56E1;
          margin-top: 0.1rem;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

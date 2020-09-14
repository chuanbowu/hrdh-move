<template>
  <div class="SensationsDetail">
    <van-nav-bar class="nav" title="红人详情" left-arrow @click-left="back"/>
    <div class="con">
      <div class="detail">
        <div class="headimg"><img :src="baseUrl+detail.headPic" alt=""></div>
        <div class="detailInfo">
          <p class="name">{{detail.nickName}}</p>
          <div class="info">
            <ul class="info-1">
              <li>
                <span>{{detail.followersNum}}</span>
                <p>粉丝数量</p>
              </li>
              <li>
                <span>{{detail.totalLikedNum}}</span>
                <p>获赞总量</p>
              </li>
              <li>
                <span>{{detail.singleHighestNum}}</span>
                <p>单条最高获赞</p>
              </li>
            </ul>
            <div class="info-2">
              <span>{{detail.followersSpreadType===1?'男女平衡':detail.followersSpreadType===1?'男粉较多':'女粉较多'}}</span>
              <span>{{detail.provinceName}}</span>
            </div>
            <div class="info-3">
              <span class="label">推广方式：</span>
              <div>
                <span class="extension-item" :class="detail.extensionType.indexOf('1')>-1?'active':''">橱窗广告</span><span class="extension-item" :class="detail.extensionType.indexOf('2')>-1?'active':''">原创视频+发布</span><span class="extension-item" :class="detail.extensionType.indexOf('3')>-1?'active':''">CPS分成</span><span class="extension-item" :class="detail.extensionType.indexOf('4')>-1?'active':''">直播带货</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="procedure">
        <h5>红人概况</h5>
        <div v-html="detail.sensationSurvey"></div>
      </div>
      <div class="procedure" style="padding:0">
        <img :src="require('@/assets/del.png')" alt="">
      </div>
      <div class="procedure">
        <h5 style="margin-bottom:0.2rem">常见问题</h5>
        <img :src="require('@/assets/problem.png')" alt="">
      </div>
    </div>
    <div class="btn">
      <div @click="openagentList=true">咨询经纪人</div>
      <div @click="openagentList=true">获取报价</div>
    </div>
    <transition name="fade">
      <div v-show="openagentList" class="agent-box">
        <div class="agent-con">
          <div class="rotate1"></div>
          <div class="rotate2"></div>
          <div class="rotate3"></div>
          <div class="rotate4"></div>
          <div class="diong">
            <van-icon class="close" @click="openagentList=false" name="cross" />
            <div class="scan-title"><span>扫一扫添加经纪人微信</span></div>
            <div class="code-con">
              <div class="code" v-for="(item, index) in list" :key="index">
                <img :src="baseUrl + item.agentPic" alt="">
                <p>{{item.agentName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'
import { baseUrl } from '@/utils/commom'
import { sensationDetails, problemList, agentList } from '@/api'
export default {
  name: 'SensationsDetail',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data () {
    return {
      baseUrl: baseUrl,
      detail: {
        extensionType: ''
      },
      problemList: [],
      openagentList: false,
      list: []
    }
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getsensationDetails () {
      const res = await sensationDetails({ sensationId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        this.detail.sensationSurvey = this.detail.sensationSurvey.replace(/\n/g, '<br>')
      }
    },
    async getproblemList () {
      const res = await problemList({})
      if (res.result === '0') {
        this.problemList = res.datas.list
      }
    },
    async getagentList () {
      const res = await agentList({})
      if (res.result === '0') {
        this.list = res.datas.list
      }
    }
  },
  created () {
    this.getsensationDetails()
    // this.getproblemList()
    this.getagentList()
  }
}
</script>

<style lang="less" scoped>
  .SensationsDetail {
    height: 100%;
    .con {
      height: calc(100% - 1.92rem);
      box-sizing: border-box;
      padding: 0.22rem 0.24rem 0;
      overflow: auto;
    }
  }
  .detail {
    padding: 0.5rem 0.24rem 0.24rem;
    background-color: #fff;
    margin-bottom: 0.22rem;
    .headimg {
      width: 2.04rem;
      height: 2.04rem;
      overflow: hidden;
      position: relative;
      margin: 0 auto;
      border-radius: 50%;
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
      .name {
        text-align: center;
        font-size: 0.32rem;
        color: #000;
        line-height: 0.42rem;
        margin: 0.3rem 0 0.32rem;
        font-weight: 700;
      }
      .info {
        background-color: #F2F2F2;
        border-radius: 0.18rem;
        padding-bottom: 0.27rem;
        .info-1 {
          display: flex;
          padding: 0.27rem 0 0.37rem;
          li {
            flex: 1;
            text-align: center;
            span {
              font-size: 0.26rem;
              color: #AC7EF4;
              line-height: 0.35rem;
            }
            p {
              font-size: 0.26rem;
              color: #666;
              line-height: 0.38rem;
            }
          }
        }
        .info-2 {
          padding: 0 0.3rem;
          margin-bottom: 0.24rem;
          span {
            color: #DF56E1;
            font-size: 0.26rem;
            line-height: 0.35rem;
            padding-right: 0.16rem;
          }
        }
        .info-3 {
          display: flex;
          padding: 0 0.3rem;
          .label {
            font-size: 0.24rem;
            line-height: 0.35rem;
            color: #666;
          }
          >div {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
          }
          .extension-item {
            font-size: 0.24rem;
            color: #666;
            padding:0 0.14rem;
            height: 0.38rem;
            line-height: 0.38rem;
            border-radius: 0.08rem;
            margin-right: 0.18rem;
            margin-bottom: 0.08rem;
            border: 1px solid #DF56E1;
            &.active {
              color: #fff;
              border: none;
              background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
            }
          }
        }
      }
    }
  }
  .procedure {
    min-height: 2.25rem;
    background-color: #fff;
    padding: 0.2rem 0.24rem;
    margin-bottom: 0.24rem;
    border-radius: 0.2rem;
    >img {
      width: 100%;
    }
    >h5 {
      font-size: 14px;
      color: #666;
      line-height: 19px;
      padding-bottom: 0.2rem;
      border-bottom: 1px dashed #DF56E2;
    }
    >div {
      font-size: 12px;
      line-height: 20px;
      padding-top: 0.1rem;
    }
    >.html {
      text-align: center;
      padding: 0 35px;
    }
  }
  .btn {
    display: flex;
    height: 1rem;
    background-color: #fff;
    position: relative;
    z-index: 10;
    div:nth-child(1) {
      flex: 1;
      box-sizing: border-box;
      height: 1rem;
      border: 1px solid #AC7EF4;
      text-align: center;
      line-height: 1rem;
      color: #AC7EF4;
      font-size: 0.32rem;
    }
    div:nth-child(2) {
      flex: 1;
      height: 1rem;
      text-align: center;
      text-align: center;
      line-height: 1rem;
      color: #fff;
      font-size: 0.32rem;
      background-color: #DF56E1;
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

<template>
  <div class="PersonalData">
    <div class="content">
      <div class="info">
        <img class="logo" :src="detail.headPic?baseUrl+detail.headPic:require('@/assets/img/noavatar.png')" alt="">
        <div class="con">
          <div class="name">{{detail.nickName}}</div>
          <div class="sex">{{detail.sex===1?'男':detail.sex===2?'女':'无'}}</div>
          <div class="phone">{{detail.phone}}</div>
        </div>
      </div>
      <div class="list">
        <div class="item van-hairline--bottom" @click="go('/EditPersonalData')"><img :src="require('@/assets/img/PC/info.png')" alt=""><span>个人资料</span><van-icon name="arrow" size="0.13rem" /></div>
        <div class="item van-hairline--bottom" @click="go('/Authentication')"><img :src="require('@/assets/img/PC/staus3.png')" alt=""><span>认证</span><van-icon name="arrow" size="0.13rem" /></div>
        <div class="item van-hairline--bottom" @click="go('/MyTakeDelivery')"><img :src="require('@/assets/img/PC/yp.png')" alt=""><span>我的取样</span><van-icon name="arrow" size="0.13rem" /></div>
        <div class="item van-hairline--bottom" @click="go('/MyBalance')"><img :src="require('@/assets/img/PC/yuer.png')" alt=""><span>我的余额</span><van-icon name="arrow" size="0.13rem" /></div>
        <div class="item van-hairline--bottom" @click="go('/IncomeDetails')"><img :src="require('@/assets/img/PC/shouru.png')" alt=""><span>收入明细</span><van-icon name="arrow" size="0.13rem" /></div>
        <div class="item van-hairline--bottom" @click="go('/WithdrawalRecord')"><img :src="require('@/assets/img/PC/tixian.png')" alt=""><span>提现记录</span><van-icon name="arrow" size="0.13rem" /></div>
        <div class="item" @click="go('/CustomerService')"><img :src="require('@/assets/img/PC/customer.png')" alt=""><span>联系客服</span><van-icon name="arrow" size="0.13rem" /></div>
      </div>
      <div class="button" @click="loginout">退出登录</div>
    </div>
    <tab-bar />
  </div>
</template>

<script>
import { Icon, Toast } from 'vant'
import { sensationInfo, sensationLoginOut } from '@/api'
import { baseUrl } from '@/utils/commom'
import { removeToken } from '@/utils/auth'
import TabBar from '@c/tabBar'
export default {
  name: 'PersonalData',
  data () {
    return {
      baseUrl: baseUrl,
      detail: {}
    }
  },
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    TabBar
  },
  methods: {
    go (url) {
      if (url === this.$route.path) return
      this.$router.push(url)
    },
    async getsensationInfo () {
      const res = await sensationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
      }
    },
    async loginout () {
      const res = await sensationLoginOut({})
      if (res.result === '1') {
        removeToken()
        this.token = ''
        this.$router.push('/Login')
      }
    },
  },
  created () {
    this.getsensationInfo()
  }
}
</script>

<style lang="less" scoped>
  .PersonalData {
    height: 100%;
    font-size: 0;
    .content {
      height: calc(100% - 1rem);
      overflow: auto;
    }
    .info {
      width: 7.02rem;
      padding: 0.5rem 0.7rem;
      margin: 0.24rem auto;
      background-color: #fff;
      border-radius: 0.08rem;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .logo {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-right: 0.44rem;
      }
      .con {
        flex: 1;
        .name {
          line-height: 0.5rem;
          font-size: 0.36rem;
          color:rgba(223,86,225,1);
          margin-bottom: 0.16rem;
        }
        .sex, .phone {
          line-height: 0.33rem;
          font-size: 0.24rem;
          color: #999;
        }
        .sex {
          margin-bottom: 0.1rem;
        }
      }
    }
    .list {
      width: 7.02rem;
      padding: 0.08rem 0.46rem;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 0.08rem;
      box-sizing: border-box;
      .item {
        display: flex;
        align-items: center;
        height: 0.94rem;
        img {
          width: 0.4rem;
          margin-right: 0.3rem;
        }
        span {
          flex: 1;
          font-size: 0.28rem;
          color: #999;
        }
      }
    }
    .button {
      color: #fff;
      background: linear-gradient(90deg, #ac7ef4 0%, #df56e1 100%);
      font-size: 0.28rem;
      text-align: center;
      height: 0.76rem;
      line-height: 0.76rem;
      width: 6.1rem;
      margin: 0.4rem auto;
      border-radius: 4px;
    }
  }
</style>

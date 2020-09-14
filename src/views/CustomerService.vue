<template>
  <div class="CustomerService">
    <van-nav-bar class="nav" title="联系客服" left-arrow @click-left="back"/>
    <div class="scan-code">
      <div class="scan-title"><span>扫一扫添加客服微信</span></div>
      <div class="con">
        <div class="code" v-for="(item, index) in list" :key="index">
          <img :src="baseUrl + item.customerPic" alt="">
          <p>{{item.customerName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { baseUrl } from '@/utils/commom'
import { customerList } from '@/api'
export default {
  name: 'CustomerService',
  data () {
    return {
      list: [],
      baseUrl: baseUrl
    }
  },
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getcustomerList () {
      const res = await customerList({})
      if (res.result === '0') {
        this.list = res.datas.list
      }
    }
  },
  created () {
    this.getcustomerList()
  }
}
</script>

<style lang="less" scoped>
  .CustomerService {
    .scan-code {
      padding: 0.67rem 0;
      background-color: #fff;
      box-sizing: border-box;
      margin: 0.74rem 0.24rem 0;
      .con {
        display: flex;
        justify-content: space-between;
        padding: 0 0.58rem;
      }
    }
    .scan-title {
      line-height: 0.32rem;
      text-align: center;
      position: relative;
      margin-bottom: 0.46rem;
      &::before {
        content: '';
        position: absolute;
        width: 1.11rem;
        height: 1px;
        background-color: #DF56E1;
        left: .95rem;
        top: 50%;
        transform: translate(0, -50%);
      }
      &::after {
        content: '';
        position: absolute;
        width: 1.11rem;
        height: 1px;
        background-color: #DF56E1;
        right: 0.95rem;
        top: 50%;
        transform: translate(0, -50%);
      }
      span {
        font-size: 0.24rem;
        color: #DF56E1;
      }
    }
    .code {
      img {
        width: 2.6rem;
        height: 2.6rem;
      }
      p {
        text-align: center;
        font-size: 0.24rem;
        color: #DF56E1;
      }
    }
  }
</style>

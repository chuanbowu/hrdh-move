<template>
  <div class="MyBalance">
    <van-nav-bar class="nav" title="我得余额" left-arrow @click-left="back"/>
    <div class="con">
      <div class="item">
        <span class="price">{{detail.balancePrice}}</span>
        <p>我的余额（元）</p>
        <div @click="gets">提现</div>
      </div>
      <div class="item">
        <span class="price">{{detail.estimatedRevenuePrice}}</span>
        <p>本月预估（元）</p>
      </div>
    </div>
    <van-popup v-model="dialogTableVisible" closeable :style="{ width: '6.7rem' }">
      <div class="balance">
        <h5 class="title">提现</h5>
        <van-cell-group>
          <van-field label-width="110px" readonly v-model="Balance.totalmoneyPrice" label="可提现余额" />
          <van-field :error="Balance.account===''" label-width="110px" required v-model="Balance.account" label="支付宝账号" placeholder="请输入支付宝账号" />
          <van-field :error="Balance.trueName===''" label-width="110px" required v-model="Balance.trueName" label="支付宝真实姓名" placeholder="请输入支付宝真实姓名" />
          <van-field :error="Balance.moneyPrice===''"  label-width="110px" required v-model="Balance.moneyPrice" label="提现金额" placeholder="请输入提现金额" />
        </van-cell-group>
        <div class="sure-btn">
          <div @click="dialogTableVisible=false">取消</div>
          <div :class="cansubmit?'active':''" @click="Withdrawal">确认</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Popup, Field, CellGroup, Toast } from 'vant'
import { sensationPrice, sensationWithdraw } from '@/api'
export default {
  name: 'MyBalance',
  data () {
    return {
      detail: {},
      Balance: { totalmoneyPrice: '', moneyPrice: '', account: '', trueName: '' },
      dialogTableVisible: false
    }
  },
  computed: {
    cansubmit: function () {
      return this.Balance.moneyPrice === '' || this.Balance.account === '' || this.Balance.trueName === ''
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getsensationPrice () {
      const res = await sensationPrice({})
      if (res.result === '0') {
        this.detail = res.datas
        this.Balance.totalmoneyPrice = this.detail.balancePrice
      }
    },
    gets () {
      this.getsensationPrice()
      this.dialogTableVisible = true
    },
    async Withdrawal () {
      if (this.cansubmit) return
      if (this.Balance.moneyPrice > this.detail.balancePrice) {
        Toast('可提现余额不足')
        return
      }
      const res = await sensationWithdraw({ moneyPrice: this.Balance.moneyPrice, account: this.Balance.account, trueName: this.Balance.trueName })
      if (res.result === '1') {
        Toast.success('提现申请已发出')
        this.getsensationPrice()
        this.dialogTableVisible = false
      }
    }
  },
  created () {
    this.getsensationPrice()
  }
}
</script>

<style lang="less" scoped>
  .MyBalance {
    height: 100%;
    .con {
      display: flex;
      padding:0.24rem;
    }
    .item {
      flex: 1;
      padding: 1rem 0.24rem 0.3rem;
      text-align: center;
      background-color: #fff;
      div {
        height: 0.8rem;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        text-align: center;
        line-height: 0.8rem;
        color: #fff;
        font-size: 0.36rem;
        margin-top: 0.76rem;
      }
    }
    .price {
      color: #AC7EF4;
      font-size: 0.74rem;
      line-height: 0.97rem;
    }
    p {
      color: #AC7EF4;
      font-size: 0.24rem;
      margin-top: 0.13rem;
    }
  }
  .balance {
    padding: 0.3rem;
    .title {
      font-size: 0.34rem;
      line-height: 0.6rem;
      margin-bottom: 10px;
    }
  }
  .sure-btn {
    text-align: center;
    margin-top: 20px;
    >div:nth-child(1) {
      display: inline-block;
      width: 100px;
      height: 33px;
      margin-left: 44px;
      font-size: 12px;
      text-align: center;
      line-height: 33px;
      color: #666;
      cursor: pointer;
      background-color: #e9e9e9;
    }
    >div:nth-child(2) {
      display: inline-block;
      width: 100px;
      height: 33px;
      margin-left: 44px;
      font-size: 12px;
      text-align: center;
      line-height: 33px;
      color: #fff;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      cursor: pointer;
      &.active {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
</style>

<template>
  <div class="Register">
    <van-nav-bar class="nav" title="红人注册" left-arrow @click-left="back"/>
    <div id="login">
      <div class="main">
        <div class="beg-login-box">
          <div class="beg-login-main">
            <div class="login-form">
              <div class="form-item">
                <input type="text" v-model="phone" placeholder="请输入手机号">
              </div>
              <div class="code-item">
                <div class="form-item">
                  <input type="text" v-model="code" placeholder="请输入验证码">
                </div>
                <div class="getcode" :class="{active:cansend}" @click="getcode">{{countDown}}</div>
              </div>
              <div class="form-item">
                <input type="password" v-model="password" placeholder="请输入密码">
              </div>
              <div class="form-item">
                <input type="password" v-model="confirmPassword" placeholder="请再次输入密码">
              </div>
              <div class="btn" :class="{active:disabled}" @click="submit">{{title}}</div>
              <footer>已有账户？ <span @click="$router.push('/Login')">登录</span></footer>
              <footer>商家注册请 <span @click="openagentList=true">联系客服</span></footer>
            </div>
          </div>
        </div>
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
            <van-icon class="close" @click="openagentList=false" name="cross" />
            <div class="scan-title"><span>扫一扫添加客服微信</span></div>
            <div class="code" v-for="(item, index) in list" :key="index">
              <img :src="baseUrl + item.customerPic" alt="">
              <p>{{item.customerName}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { NavBar, Icon, Toast } from 'vant'
import { sendCode, register, customerList } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'Register',
  data () {
    return {
      phone: '',
      password: '',
      confirmPassword: '',
      code: '',
      subLoad: false,
      title: '注册',
      countDown: '获取验证码',
      isend: false,
      timeFn: null,
      openagentList: false,
      baseUrl: baseUrl,
      list: []
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  computed: {
    disabled: function () {
      return (this.phone === '' || !/^1[3456789]\d{9}$/.test(this.phone) || this.code === '' || this.password === '' || this.confirmPassword === '' || this.password !== this.confirmPassword || this.subLoad)
    },
    cansend: function () {
      return (this.phone !== '' && (/^1[3456789]\d{9}$/.test(this.phone)) && !this.isend)
    }
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getcode () { // 发送验证码
      if (!this.cansend) return
      const res = await sendCode({ phone: this.phone })
      this.subLoad = false
      if (res.result === '1') {
        this.isend = true
        this.countDown = 90
        this.timeFn = setInterval(() => {
          this.countDown--
          if (this.countDown <= 0) {
            this.countDown = '获取验证码'
            this.isend = false
            clearInterval(this.timeFn)
          }
        }, 1000)
      }
    },
    async submit () {
      if (this.disabled) return
      setTimeout(() => {
        this.subLoad = true
        this.title = '注册中...'
        this.login()
      }, 500)
    },
    async login () {
      const res = await register({ phone: this.phone, code: this.code, password: this.password })
      this.subLoad = false
      if (res.result === '1') {
        Toast('注册成功')
        this.$router.push('/Login')
      }
      this.title = '注册'
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
.Register {
  height: 100%;
  background:rgba(247,242,255,1);
}
.main {
  max-width: 7.02rem;
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 0.28rem;
  text-align: center;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  .beg-login-box {
    .beg-login-main {
      padding: 0.38rem 0.2rem;
      background-color: rgba(255, 255, 255, 1);
      .check-box {
        margin-bottom: 0.3rem;
        text-align: left;
        .check {
          display: inline-block;
          font-size: 0.28rem;
          line-height: 0.4rem;
          margin-right: 0.75rem;
          cursor: pointer;
          &:last-of-type {
            margin-right: 0;
          }
          img {
            width: 0.3rem;
            height: 0.3rem;
            margin-right: 0.05rem;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
      .form-item {
        width: 100%;
        border: 0.01rem solid rgba(221,221,221,1);
        position: relative;
        vertical-align: top;
        margin-bottom: 0.3rem;
        &.mb0 {
          margin-bottom: 0;
        }
        input {
          width: 100%;
          border: none;
          outline: none;
          box-sizing: border-box;
          background-color: transparent;
          line-height: 1;
          padding: 0.34rem 0.38rem;
          color: #666666;
          &::-webkit-input-placeholder{
            color: #cccccc;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #cccccc;
          }
          &::-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #cccccc;
          }
        }
      }
      .code-item {
        .form-item {
          display: inline-block;
          width: 3.5rem;
        }
        .getcode {
          display: inline-block;
          width: 3rem;
          height: 1rem;
          margin-left: 0.1rem;
          text-align: center;
          line-height: 1rem;
          background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
          cursor: not-allowed;
          color: #fff;
          font-weight: 500;
          border-radius: 0.05rem;
          user-select: none;
          &.active {
            cursor: pointer;
          }
        }
      }
      .forget {
        text-align: right;
        line-height: 0.4rem;
        margin: 0.13rem 0;
      }
      .btn {
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        color: #fff;
        cursor: pointer;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        &.active {
          cursor: not-allowed;
        }
      }
      footer {
        margin-top: 0.3rem;
        span {
          color: #DF56E1;
        }
      }
    }
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
  .con {
    position: relative;
    z-index: 10;
    width: 100%;
    margin: 20px auto;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 0.3rem;
    text-align: center;
    .close {
      position: absolute;
      top: -15px;
      right: 10px;
      font-size: 18px;
      cursor: pointer;
      color: #999;
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
      }
    }
    .code {
      display: inline-block;
      vertical-align: top;
      margin: 0.3rem;
      img {
        width: 2.6rem;
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

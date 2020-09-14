<template>
  <div class="MyTakeDeliveryDetail">
    <van-nav-bar class="nav" title="我的取样" left-arrow @click-left="back"/>
    <div class="con">
      <div class="status">
        <span>{{type[detail.status-1]}}</span>
      </div>
      <div class="TakeDelivery" v-if="detail.status>3">
        <div class="address" style="height:auto">
          <div style="padding: 20px 0;"><span style="padding-right: 10px;">商家发样快递公司：{{detail.businessExpressName}}</span><br><span>快递单号：{{detail.businessNum}}</span></div>
        </div>
      </div>
      <div class="item">
        <div class="img"><img :src="detail.mainPic" alt=""></div>
        <div class="info">
          <p class="name">{{detail.businessTitle}}</p>
          <!-- <div class="price1"><img :src="require('@/assets/img/PC/deposit.png')" alt=""><span>￥50</span></div> -->
          <div class="price2">商品券后价<span>￥{{detail.couponAfterPrice}}</span></div>
          <div class="return">佣金￥{{detail.commissionPrice}}，比例{{detail.proportion}}%</div>
          <div v-if="detail.status>3" class="copy" :data-clipboard-text="detail.couponShareUrl">复制推广链接</div>
        </div>
      </div>
      <div class="achievements">
        <div class="achievements-item">
          <div>{{detail.extensionNum}}</div>
          <span>已推广（件）</span>
        </div>
        <div class="achievements-item">
          <div>{{detail.profitPrice}}</div>
          <span>收益（元）</span>
        </div>
      </div>
      <div class="sureTake" v-if="detail.status===4" @click="sureTake">确认收样</div>
      <div class="TakeDelivery" v-if="detail.status>4">
        <div class="status">
          <span>商家收样信息</span>
        </div>
        <div class="address1">
          <div><span style="padding-right: 10px;">收样人：{{detail.businessConsigneeName}}</span><span>电话：{{detail.businessConsigneePhone}}</span></div>
          <span>详细地址：{{detail.businessConsigneeAddress}}</span>
        </div>
        <div class="explain" v-html="detail.businessExplain"></div>
        <div class="send-back" v-if="detail.status===5">
          <select v-model="expressId" @change="getcityList(provinceId)">
            <option value='' disabled selected style='display:none;'>请选择寄回快递公司</option>
            <option :value="item.expressId" v-for="(item, index) in expressList" :key="index">{{item.expressName}}</option>
          </select>
          <input v-model="sensationNum" type="text" placeholder="请输入快递单号">
          <div v-if="detail.status===5" class="send" :class="cansend?'active':''" @click="send">我已寄回</div>
        </div>
        <div class="send-info">
          <div>{{detail.sensationExpressName}}</div>
          <div>{{detail.sensationNum}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { orderInfo, expressList, sendOrder, receivingOrder } from '@/api'
import ClipboardJS from 'clipboard'
export default {
  name: 'MyTakeDeliveryDetail',
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      detail: {},
      expressList: [],
      expressId: '',
      sensationNum: '',
      type: ['等待商家审核', '商家审核失败', '待商家发样', '商家已发样', '已收样', '已寄回样品', '商家已收样']
    }
  },
  computed: {
    cansend: function () {
      return this.expressId === '' || this.sensationNum === ''
    }
  },
  mounted () {
    let that = this
    const clipboard1 = new ClipboardJS('.copy')
    clipboard1.on('success', function(e) {
      Toast('复制成功')
      e.clearSelection()
    })
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getorderInfo () {
      const res = await orderInfo({ orderId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        if (this.detail.businessExplain) this.detail.businessExplain = this.detail.businessExplain.replace(/\n/g, '<br>')
        if (this.detail.status === 5) this.getexpressList()
      }
    },
    async getexpressList () {
      const res = await expressList({})
      if (res.result === '0') {
        this.expressList = res.datas.list
      }
    },
    async sureTake () {
      const res = await receivingOrder({ orderId: this.$route.query.id })
      if (res.result === '1') {
        this.$message({ type: 'success', message: '确认收样成功，请及时寄回样品' })
        this.getorderInfo()
      }
    },
    async send () {
      const res = await sendOrder({ orderId: this.$route.query.id, sensationExpressId: this.expressId, sensationNum: this.sensationNum })
      if (res.result === '1') {
        this.$message({ type: 'success', message: '样品寄出成功，请等待商家收样' })
        this.getorderInfo()
      }
    }
  },
  created () {
    this.getorderInfo()
  }
}
</script>

<style lang="less" scoped>
  .MyTakeDeliveryDetail {
    height: 100%;
    .con {
      height: calc(100% - 0.92rem);
      overflow: auto;
      padding: 0 0.24rem;
    }
    .status {
      width:97px;
      height:27px;
      line-height: 27px;
      text-align: center;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      border-radius:4px;
      margin: 0.2rem 0;
      font-size: 12px;
      color: #fff;
    }
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
      .copy {
        margin-top: 10px;
        width: 97px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        background: linear-gradient(90deg, #ac7ef4 0%, #df56e1 100%);
        border-radius: 4px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
  .achievements {
    background-color: #fff;
    padding: 0.3rem 0.6rem;
    display: flex;
    justify-content: space-between;
    .achievements-item {
      width: 116px;
      height: 79px;
      box-sizing: border-box;
      border: 1px solid #AC7EF4;
      color: #AC7EF4;
      text-align: center;
      div {
        font-size: 24px;
        line-height: 31px;
        margin: 11px 0 7px;
      }
      span {
        font-size: 12px;
      }
      &:last-child {
        margin-left: 11px;
        border: 1px solid #DF56E1;
        color: #DF56E1;
      }
    }
  }
  .TakeDelivery {
    .status {
      margin: 0.2rem 0;
    }
    .address {
      border-radius: 2px;
      background-color: #fff;
      font-size: 14px;
      color: #666;
      padding-left: 0.3rem;
      margin-bottom: 0.24rem;
      span {
        line-height: 24px;
      }
    }
    .address1 {
      border-radius: 2px;
      background-color: #fff;
      font-size: 14px;
      color: #666;
      padding: 0.3rem;
      margin-bottom: 0.24rem;
      span {
        line-height: 20px;
      }
      div {
        line-height: 20px;
        margin-bottom: 0.1rem;
      }
    }
    .explain {
      background-color: #fff;
      padding: 0.3rem;
      margin-bottom: 0.24rem;
      font-size: 14px;
      line-height: 22px;
    }
    .send-back {
      select {
        width: 100%;
        border: none;
        outline: none;
        box-sizing: border-box;
        height: 44px;
        margin-right: 10px;
        background-color: #fff;
        padding-left: 20px;
        font-size: 14px;
        color: #666;
        appearance: none;
        line-height: 1;
        background: #fff url(../assets/img/PC/select.svg) 96% 50% no-repeat;
        margin-bottom: 0.24rem;
      }
      input {
        width: 100%;
        font-size: 14px;
        border: none;
        outline: none;
        box-sizing: border-box;
        height: 44px;
        margin-right: 10px;
        background-color: #fff;
        padding-left: 20px;
        color: #666;
        margin-bottom: 0.24rem;
      }
      .send {
        height:44px;
        line-height: 44px;
        text-align: center;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
        border-radius:4px;
        font-size: 14px;
        margin-bottom: 0.3rem;
        color: #fff;
        cursor: pointer;
        &.active {
          cursor: not-allowed;
          background: #cccccc;
          filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#cccccc", endColorstr="#cccccc", gradientType="1");
        }
      }
    }
  }
  .send-info {
    margin-bottom: 20px;
    div:nth-child(1) {
      height: 30px;
      line-height: 30px;
      background-color: #fff;
      padding-left: 20px;
      font-size: 14px;
      color: #666;
    }
    div:nth-child(2) {
      font-size: 14px;
      height: 30px;
      background-color: #fff;
      padding-left: 20px;
      line-height: 30px;
      color: #666;
    }
  }
  .sureTake {
    margin-top: 20px;
    width:97px;
    height:44px;
    line-height: 44px;
    text-align: center;
    background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
    border-radius:4px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
</style>

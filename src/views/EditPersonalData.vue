<template>
  <div class="EditPersonalData">
    <van-nav-bar class="nav" title="个人资料" left-arrow @click-left="back"/>
    <div class="con">
      <div class="headimg" @click="upload"><img :src="detail.headPic?baseUrl+detail.headPic:require('@/assets/img/noavatar.png')" alt=""></div>
      <div class="from">
        <div class="phone">{{detail.phone}}</div>
        <div class="from-item nickName">
          <img style="width:0.36rem" :src="require('@/assets/img/PC/edit.png')" alt="">
          <input type="text" v-model="detail.nickName" placeholder="我的昵称">
        </div>
        <div class="from-item sex">
          <img style="width:0.36rem" :src="require('@/assets/img/PC/sex.png')" alt="">
          <select v-model="detail.sex">
            <option value='' disabled selected style='display:none;'>请选择性别</option>
            <option :value="1">男</option>
            <option :value="2">女</option>
            <option :value="3">无</option>
          </select>
        </div>
        <div class="from-area area">
          <div class="area-item">
            <select v-model="provinceId" @change="getcityList(provinceId)">
              <option value='' disabled selected style='display:none;'>请选择省份</option>
              <option :value="item.cid" v-for="(item, index) in provinceList" :key="index">{{item.name}}</option>
            </select>
          </div>
          <div class="area-item">
            <select v-model="cityId" @change="getareaList(cityId)">
              <option value='' disabled selected style='display:none;'>请选择市</option>
              <option :value="item.cid" v-for="(item, index) in cityList" :key="index">{{item.name}}</option>
            </select>
          </div>
          <div class="area-item">
            <select v-model="areaId">
              <option value='' disabled selected style='display:none;'>请选择地区</option>
              <option :value="item.cid" v-for="(item, index) in areaList" :key="index">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="from-item weixin">
          <img style="width:0.36rem" :src="require('@/assets/img/PC/weixin.png')" alt="">
          <input type="text" v-model="detail.weChat" placeholder="请输入微信号">
        </div>
        <div class="from-item qq">
          <img style="width:0.335rem" :src="require('@/assets/img/PC/qq.png')" alt="">
          <input type="text" v-model="detail.qq" placeholder="请输入qq号">
        </div>
        <div class="from-item name">
          <img style="width:0.42rem" :src="require('@/assets/img/PC/name.png')" alt="">
          <input type="text" v-model="detail.consigneeName" placeholder="请输入姓名">
        </div>
        <div class="from-item address">
          <img style="width:0.323rem" :src="require('@/assets/img/PC/address.png')" alt="">
          <textarea type="text" v-model="detail.consigneeAddress" placeholder="请输入地址"></textarea>
        </div>
        <div class="btn" v-if="detail.status===1" :class="this.canSave?'cant':''" @click="save">完善个人资料</div>
        <div class="btn" v-else :class="this.canSave?'cant':''" @click="save">修改个人资料</div>
      </div>
      <input style="display: none" type="file" accept="image/*" ref="upload" @change="change">
    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { sensationInfo, uploadImage, provinceList, cityList, areaList, updateSensation } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'EditPersonalData',
  data () {
    return {
      detail: {},
      provinceList: [],
      cityList: [],
      areaList: [],
      baseUrl: baseUrl,
      provinceId: '',
      cityId: '',
      areaId: '',
      subload: false
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  computed: {
    canSave () {
      return this.detail.nickName === '' || this.detail.sex === '' || this.provinceId === '' || this.cityId === '' || this.areaId === '' || this.detail.weChat === '' || this.detail.qq === '' || this.detail.consigneeName === '' || this.detail.consigneeAddress === '' || this.subload
    }
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    async getsensationInfo () {
      const res = await sensationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
        this.provinceId = this.detail.provinceId ? this.detail.provinceId : ''
        if (this.detail.cityId) {
          // this.cityId = this.detail.cityId
          this.getcityList(this.provinceId, this.detail.cityId)
          if (this.detail.areaId) {
            // this.areaId = this.detail.areaId
            this.getareaList(this.detail.cityId, this.detail.areaId)
          }
        }
      }
    },
    upload () {
      if (this.detail.status > 1) return
      this.$refs.upload.value = ''
      this.$refs.upload.click()
    },
    async change (e) {
      const key = new FormData()
      key.append('file', e.target.files[0])
      const res = await uploadImage(key)
      if (res.result === '1') {
        this.detail.headPic = res.datas.fileUrl
      }
    },
    async getprovinceList () {
      const res = await provinceList({})
      if (res.result === '0') {
        this.provinceList = res.datas.list
        this.areaList = []
      }
    },
    async getcityList (cid, id) {
      if (!cid) return
      const res = await cityList({ cid: cid })
      if (res.result === '0') {
        this.cityList = res.datas.list
        if (id) {
          this.cityId = id
        } else {
          this.cityId = ''
          this.areaId = ''
        }
      }
    },
    async getareaList (cid, id) {
      if (!cid) return
      const res = await areaList({ cid: cid })
      if (res.result === '0') {
        this.areaList = res.datas.list
        if (id) {
          this.areaId = id
        } else {
          this.areaId = ''
        }
      }
    },
    async save () {
      if (this.canSave) return
      this.subload = true
      const data = { nickName: this.detail.nickName, headPic: this.detail.headPic, sex: this.detail.sex, qq: this.detail.qq, weChat: this.detail.weChat, provinceId: this.provinceId, cityId: this.cityId, areaId: this.areaId, consigneeName: this.detail.consigneeName, consigneeAddress: this.detail.consigneeAddress }
      const res = await updateSensation(data)
      if (res.result === '1') {
        if (this.detail.status === 1) {
          Toast.success('资料完善成功')
        } else {
          Toast.success('资料修改成功')
        }
        this.getsensationInfo()
      } else {
        Toast(res.message)
      }
      this.subload = false
    }
  },
  created () {
    this.getsensationInfo()
    this.getprovinceList()
  }
}
</script>

<style lang="less" scoped>
  .EditPersonalData {
    height: 100%;
    .con {
      height: calc(100% - 1.42rem);
      overflow: auto;
      padding-bottom: 0.5rem;
      .headimg {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        border-radius: 50%;
        margin: 0.44rem 0 0.5rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .from {
        width: 7.02rem;
        margin: 0 auto;
        .phone {
          font-size: 0.36rem;
          line-height: 1;
          color: #666;
          padding-bottom: 0.5rem;
          text-align: center;
        }
        .from-item {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          height: 1rem;
          border-radius: 0.04rem;
          border: 0.01rem solid #DDDDDD;
          background-color: #fff;
          margin-bottom: 0.24rem;
          img {
            position: absolute;
            top: 50%;
            left: 0.44rem;
            transform: translateY(-50%);
          }
          input, &.sex select, &.platform select {
            vertical-align: top;
            border: none;
            outline: none;
            box-sizing: border-box;
            background-color: transparent;
            padding: 0.34rem 0.34rem 0.34rem 1.15rem;
            font-size: 0.28rem;
            color: #ccc;
            width: 100%;
            line-height: 0.28rem;
          }
          &.sex select {
            padding: 0 0 0 1.15rem;
            height: 1rem;
            line-height: 1rem;
          }
          &.address {
            height: 1rem;
            margin-bottom: 0;
            img {
              top: 0.33rem;
              transform: translate(0, 0);
            }
            textarea {
              width: 100%;
              border: none;
              outline: none;
              box-sizing: border-box;
              background-color: transparent;
              resize: none;
              font-size: 0.28rem;
              color: #ccc;
              padding: 0.34rem 0.34rem 0.34rem 1.15rem;
              line-height: 0.28rem;
            }
          }
        }
        .from-area {
          margin-bottom: 0.24rem;
          .area-item {
            box-sizing: border-box;
            display: inline-block;
            background-color: #fff;
            width: 2.19rem;
            margin-right: 0.22rem;
            border-radius: 0.04rem;
            border: 0.01rem solid #DDDDDD;
            &:last-child {
              margin-right: 0rem;
            }
            select {
              vertical-align: top;
              width: 2.19rem;
              height: 1rem;
              font-size: 0.28rem;
              color: #ccc;
              border: none;
              outline: none;
              line-height: 1rem;
              background-color: transparent;
            }
          }
        }
        .btn {
          margin-top: 0.5rem;
          width: 7.02rem;
          height: 1rem;
          font-size: 0.28rem;
          text-align: center;
          line-height: 1rem;
          color: #fff;
          background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        }
      }
    }
  }
</style>

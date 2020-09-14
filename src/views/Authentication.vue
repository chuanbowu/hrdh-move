<template>
  <div class="Authentication">
    <van-nav-bar class="nav" title="认证" left-arrow @click-left="back"/>
    <div class="con">
      <div class="icon">
        <img :src="detail.status===2?require('@/assets/img/PC/staus1.png'):detail.status===3?require('@/assets/img/PC/staus2.png'):detail.status===5?require('@/assets/img/PC/staus4.png'):require('@/assets/img/PC/staus3.png')" alt="">
      </div>
      <div class="tip">
        <span v-if="detail.status===2">您的账号尚未认证，请提交资料认证（信息越完善，越利于商家对接）：</span>
        <span v-if="detail.status===3">您的账号认证审核中</span>
        <span v-if="detail.status===5">您的账号已认证</span>
        <span v-if="detail.status===4">您的账号认证被拒绝,拒绝理由：{{detail.refuseContent}}</span>
      </div>
      <div class="url">
        <select :disabled="detail.status>2" v-model="detail.extensionStatus">
          <option value='' disabled selected style='display:none;'>请选择认证平台</option>
          <option :value="1">抖音认证</option>
          <option :value="2">快手认证</option>
          <option :value="3">小红书</option>
          <option :value="4">淘宝</option>
          <option :value="5">今日头条</option>
          <option :value="6">微博</option>
          <option :value="7">B站</option>
        </select>
      </div>
      <div class="url" style="margin-bottom: 0.16rem">
        <input :readonly="detail.status>2" type="text" v-model="detail.authenticationLink" placeholder="请输入您的主页链接">
      </div>
      <div class="tip1">抖音主页链接复制方式：打开抖音—我—右上角—我的二维码—右上角—复制链接</div>
      <div class="tip1" style="margin-bottom: 12px">快手主页链接复制方式：打开快手—我—右上角—分享个人主页—复制链接</div>
      <div class="url">
        <select :disabled="detail.status>2" v-model="detail.contentType">
          <option value='' disabled selected style='display:none;'>请选择您的内容分类</option>
          <option :value="1">搞笑娱乐</option>
          <option :value="2">萌宠动漫</option>
          <option :value="3">情感励志</option>
          <option :value="4">教育知识</option>
          <option :value="5">母婴玩具</option>
          <option :value="6">颜值才艺</option>
          <option :value="7">健康养生</option>
          <option :value="8">游戏电竞</option>
          <option :value="9">汽车周边</option>
          <option :value="10">科技生活</option>
          <option :value="11">新闻媒体</option>
          <option :value="12">美妆护肤</option>
          <option :value="13">旅游攻略</option>
          <option :value="14">美食攻略</option>
          <option :value="15">教程技术</option>
          <option :value="16">综合种草</option>
          <option :value="17">服装穿搭</option>
          <option :value="18">家居百货</option>
          <option :value="19">剧情故事</option>
          <option :value="20">音乐</option>
          <option :value="21">时尚</option>
          <option :value="22">创意</option>
        </select>
      </div>
      <div class="url">
        <select :disabled="detail.status>2" v-model="detail.followersSpreadType">
          <option value='' disabled selected style='display:none;'>请选择您的粉丝分布</option>
          <option :value="1">男女平衡</option>
          <option :value="2">男粉较多</option>
          <option :value="3">女粉较多</option>
        </select>
      </div>
      <div class="url">
        <input :readonly="detail.status>2" type="text" v-model="detail.followersNum" placeholder="请输入您的粉丝数量">
      </div>
      <div class="url">
        <input :readonly="detail.status>2" type="text" v-model="detail.totalLikedNum" placeholder="请输入您的获赞总量">
      </div>
      <div class="url">
        <input :readonly="detail.status>2" type="text" v-model="detail.singleHighestNum" placeholder="请输入您的单条最高获赞">
      </div>
      <div class="url" style="height: 2rem">
        <textarea :readonly="detail.status>2" type="text" v-model="detail.sensationSurvey" placeholder="请输入您的红人概况（非必填）"></textarea>
      </div>
      <div class="tip" style="margin-bottom:0"><span v-if="detail.status===2">请选择</span>您支持的推广方式（可多选）：</div>
      <div class="radio">
        <span :class="{active:extensionType.indexOf('1')>-1}" @click="chose(1)">橱窗广告</span>
        <span :class="{active:extensionType.indexOf('2')>-1}" @click="chose(2)">原创视频+发布</span>
        <span :class="{active:extensionType.indexOf('3')>-1}" @click="chose(3)">CPS分成</span>
        <span :class="{active:extensionType.indexOf('4')>-1}" @click="chose(4)">直播带货</span>
      </div>
      <div class="upload">
        <div class="tip" style="background-color: #fff"><span v-if="detail.status===2">请上传</span>您的抖音/快手个人二维码或小红书/淘宝/今日头条我的页面截图：</div>
        <img @click="upload" v-if="detail.authenticationPic" class="img" :src="baseUrl + detail.authenticationPic" alt="">
        <img v-if="!detail.authenticationPic" @click="upload" class="upload-btn" :src="require('@/assets/img/PC/upload.png')" alt="">
        <div class="tip2">抖音/快手个人二维码查看方式：我—右上角—我的二维码</div>
        <div class="tip2">小红书/淘宝/今日头条我的页面截图：请截图包含个人昵称的页面</div>
      </div>
      <div class="btn" v-if="detail.status===2" :class="this.canSave?'cant':''" @click="save">申请认证</div>
    <div class="btn" v-if="detail.status===4" :class="this.canSave?'cant':''" @click="authAgain">重新认证</div>
      <input style="display:none" type="file" ref="upload" @change="change" accept="image/*">
    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { sensationAttestationInfo, updateSensationAttestation, uploadImage } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'Authentication',
  data () {
    return {
      detail: {
        extensionStatus: '',
        authenticationLink: '',
        authenticationPic: '',
        followersNum: '',
        totalLikedNum: '',
        singleHighestNum: '',
        contentType: '',
        followersSpreadType: '',
        sensationSurvey: '',
        extensionType: []
      },
      subload: false,
      extensionType: [],
      baseUrl: baseUrl
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  computed: {
    canSave () {
      return this.detail.extensionStatus === '' || this.detail.authenticationLink === '' || this.detail.authenticationPic === '' || this.detail.followersNum === '' || this.detail.totalLikedNum === '' || this.detail.singleHighestNum === '' || this.detail.contentType === '' || this.detail.followersSpreadType === '' || this.extensionType.length === 0 || this.detail.sensationSurvey === '' || this.subload
    }
  },
  methods: {
    back () { // 回退
      this.$router.go(-1)
    },
    upload () {
      this.$refs.upload.value = ''
      this.$refs.upload.click()
    },
    async change (e) {
      const key = new FormData()
      key.append('file', e.target.files[0])
      const res = await uploadImage(key)
      if (res.result === '1') {
        this.detail.authenticationPic = res.datas.fileUrl
      }
    },
    chose (index) {
      if (this.detail.status > 2) return
      if (this.extensionType.indexOf(index) > -1) {
        this.extensionType.splice(this.extensionType.indexOf(index), 1)
      } else {
        this.extensionType.push(index)
      }
    },
    async getsensationAttestationInfo () {
      const res = await sensationAttestationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
        this.detail.followersNum = this.detail.followersNum ? this.detail.followersNum : ''
        this.detail.totalLikedNum = this.detail.totalLikedNum ? this.detail.totalLikedNum : ''
        this.detail.singleHighestNum = this.detail.singleHighestNum ? this.detail.singleHighestNum : ''
        this.extensionType = this.detail.extensionType ? this.detail.extensionType.split(',') : []
        if (this.detail.status === 1) {
          Toast('请先完善个人资料')
          setTimeout(() => {
            this.$router.push('/EditPersonalData')
          }, 15000);
        }
      }
    },
    async save () {
      if (this.canSave) return
      this.subload = true
      const data = { extensionStatus: this.detail.extensionStatus, authenticationLink: this.detail.authenticationLink, authenticationPic: this.detail.authenticationPic, followersNum: this.detail.followersNum, totalLikedNum: this.detail.totalLikedNum, singleHighestNum: this.detail.singleHighestNum, contentType: this.detail.contentType, followersSpreadType: this.detail.followersSpreadType, extensionType: this.extensionType.toString(), sensationSurvey: this.detail.sensationSurvey }
      const res = await updateSensationAttestation(data)
      if (res.result === '1') {
        this.subload = false
        this.getsensationAttestationInfo()
        Toast.success('认证申请提交成功，审核中')
      } else {
        Toast(res.message)
      }
    },
    authAgain () {
      document.documentElement.scrollTop = 0
      this.detail.status = 2
    }
  },
  created () {
    this.getsensationAttestationInfo()
  }
}
</script>

<style lang="less" scoped>
  .Authentication {
    height: 100%;
    .con {
      height: calc(100% - 0.92rem);
      overflow: auto;
      padding:0 0.24rem .24rem;
      box-sizing: border-box;
      .icon {
        height: 2.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.94rem;
        }
      }
      .tip {
        font-size: 0.28rem;
        color: #666;
        line-height: 0.42rem;
        margin-bottom: 0.24rem;
      }
      .radio {
        height: 1rem;
        display: flex;
        align-items: center;
        span {
          font-size: 0.24rem;
          color: #666;
          padding:0 0.1rem;
          height: 0.38rem;
          line-height: 0.38rem;
          border-radius: 0.08rem;
          margin-right: 0.18rem;
          margin-bottom: 0.08rem;
          border: 1px solid #DF56E1;
          white-space: nowrap;
          &:last-child {
            margin-right: 0;
          }
          &.active {
            color: #fff;
            border: none;
            background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
          }
        }
      }
      .url {
        box-sizing: border-box;
        position: relative;
        height: 1rem;
        border-radius:4px;
        border: 1px solid #DDDDDD;
        background-color: #fff;
        margin-bottom: 0.22rem;
        input {
          border: none;
          outline: none;
          box-sizing: border-box;
          width: 100%;
          background-color: transparent;
          padding: 0.34rem 0.54rem;
          font-size: 0.28rem;
          color: #ccc;
          height: 0.32rem;
          line-height: 0.32rem;
        }
        select {
          border: none;
          outline: none;
          box-sizing: border-box;
          width: 100%;
          background-color: transparent;
          padding: 0 0.54rem;
          font-size: 0.28rem;
          color: #ccc;
          height: 1rem;
          line-height: 1rem;
        }
        textarea {
          width: 100%;
          height: 2rem;
          border: none;
          outline: none;
          box-sizing: border-box;
          background-color: transparent;
          resize: none;
          text-indent: 0.34rem;
          font-size: 0.28rem;
          color: #ccc;
          padding: 0.2rem;
          line-height: 0.38rem;
        }
      }
      .tip1 {
        font-size: 0.24rem;
        line-height: 0.36rem;
        color: #DC57E1;
        padding-left: 0.2rem;
        margin-bottom: 0.1rem;
      }
      .upload {
        margin-bottom: 0.24rem;
        padding-left: 0.2rem;
        padding-top: 0.4rem;
        background-color: #fff;
        padding-bottom: 0.24rem;
      }
      .img {
        width: 3.72rem;
        display: block;
        margin-left: 0.2rem;
        margin-bottom: 0.24rem;
      }
      .upload-btn {
        width: 3.72rem;
        display: block;
        margin-left: 0.2rem;
        margin-bottom: 0.24rem;
      }
      .tip2 {
        font-size: 0.24rem;
        line-height: 0.38rem;
        color: #DC57E1;
        padding-right: 0.2rem;
      }
      .btn {
        height: 1rem;
        font-size: 0.32rem;
        text-align: center;
        line-height: 1rem;
        color: #fff;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        cursor: pointer;
      }
    }
  }
</style>

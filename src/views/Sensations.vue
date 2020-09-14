<template>
  <div class="Sensations">
    <div class="con">
      <div class="search">
        <img :src="require('@/assets/img/logo.png')" alt="">
        <div class="search-box van-hairline--surround">
          <input type="text" v-model="keywords" placeholder="请输入红人昵称进行搜索" @keyup.enter="find">
          <img :src="require('@/assets/img/search.png')" alt="" @click="find">
        </div>
      </div>
      <div class="list-con" ref="list">
        <div class="sensation-container" ref="list1">
          <div class="swiper-box">
            <div class="left"><img :src="require('@/assets/img/left.png')" alt=""></div>
            <div class="swiper-container2">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in sensationRecommend" :key="index"><img :src="baseUrl+item.headPic" alt="" @click="$router.push('/SensationsDetail?id='+item.sensationId)"></div>
              </div>
            </div>
            <div class="right"><img :src="require('@/assets/img/right.png')" alt=""></div>
          </div>
          <div class="procedure">
          <img :src="require('@/assets/sessionIn.png')" alt="">
          </div>
          <div class="Handsome-selection">
            <select v-model="contentType" @change="change(1)">
              <option value='' disabled selected style='display:none;'>内容分类</option>
              <option :value="item.type" v-for="(item, index) in classify1" :key="index">{{item.name}}</option>
            </select>
            <select v-model="followersType" @change="change(2)">
              <option value='' disabled selected style='display:none;'>粉丝数量</option>
              <option :value="item.type" v-for="(item, index) in classify2" :key="index">{{item.name}}</option>
            </select>
            <select v-model="followersSpreadType" @change="change(3)">
              <option value='' disabled selected style='display:none;'>粉丝分布</option>
              <option :value="item.type" v-for="(item, index) in classify3" :key="index">{{item.name}}</option>
            </select>
          </div>
          <div class="Handsome-selection">
            <select v-model="totalLikedType" @change="change(4)">
              <option value='' disabled selected style='display:none;'>获赞数量</option>
              <option :value="item.type" v-for="(item, index) in classify4" :key="index">{{item.name}}</option>
            </select>
            <select v-model="provinceType" @change="change(5)">
              <option value='' disabled selected style='display:none;'>所在省份</option>
              <option :value="item.type" v-for="(item, index) in classify5" :key="index">{{item.name}}</option>
            </select>
            <select v-model="extensionType" @change="change(6)">
              <option value='' disabled selected style='display:none;'>推广方式</option>
              <option :value="item.type" v-for="(item, index) in classify6" :key="index">{{item.name}}</option>
            </select>
          </div>
          <div class="list">
            <div class="item" v-for="(item, index) in sensationSearchList" :key="index">
              <div class="img" @click="$router.push(`/SensationsDetail?id=${item.sensationId}`)">
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
              <div class="info" style="margin-top:0.1rem">
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
            <div class="nodata" v-if="sensationSearchList.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
              “没有相关结果”
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="loading" v-show="isLoading"><van-loading size="15px">加载中...</van-loading></div>
          <div class="no-more" v-show="sensationSearchList.length>0&&sensationSearchList.length>=total">没有更多了</div>
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
    <tab-bar />
  </div>
</template>

<script>
import Swiper from 'swiper'
import { Icon, Loading } from 'vant'
import TabBar from '@c/tabBar'
import { baseUrl } from '@/utils/commom'
import { sensationRecommend, sensationList, agentList } from '@/api'
export default {
  name: 'Sensations',
  components: {
    TabBar,
    [Icon.name]: Icon,
    [Loading.name]: Loading
  },
  data () {
    return {
      sensationSearchList: [],
      sensationRecommend: [],
      openagentList: false,
      list: [],
      baseUrl: baseUrl,
      keywords: '',
      contentType: '',
      followersType: '',
      followersSpreadType: '',
      totalLikedType: '',
      provinceType: '',
      extensionType: '',
      page: 1,
      total: 0,
      isLoading: false,
      nomore: false,
      classify1: [{ type: 0, name: '全部内容' }, { type: 1, name: '搞笑娱乐' }, { type: 2, name: '萌宠动漫' }, { type: 3, name: '情感励志' }, { type: 4, name: '教育知识' }, { type: 5, name: '母婴玩具' }, { type: 6, name: '颜值才艺' }, { type: 7, name: '健康养生' }, { type: 8, name: '游戏电竞' }, { type: 9, name: '汽车周边' }, { type: 10, name: '科技生活' }, { type: 11, name: '新闻媒体' }, { type: 12, name: '美妆护肤' }, { type: 13, name: '旅游攻略' }, { type: 14, name: '美食攻略' }, { type: 15, name: '教程技术' }, { type: 16, name: '综合种草' }, { type: 17, name: '服装穿搭' }, { type: 18, name: '家居百货' }, { type: 19, name: '剧情故事' }, { type: 20, name: '音乐' }, { type: 21, name: '时尚' }, { type: 22, name: '创意' }],
      classify2: [{ type: 0, name: '全部' }, { type: 1, name: '10W以内' }, { type: 2, name: '10W-30W' }, { type: 3, name: '30W-100W' }, { type: 4, name: '100W-300W' }, { type: 5, name: '300W-500W' }, { type: 6, name: '500W以上' }],
      classify3: [{ type: 0, name: '全部' }, { type: 1, name: '男女平衡' }, { type: 2, name: '男粉较多' }, { type: 3, name: '女粉较多' }],
      classify4: [{ type: 0, name: '全部' }, { type: 1, name: '10W以内' }, { type: 2, name: '10W-30W' }, { type: 3, name: '30W-100W' }, { type: 4, name: '100W-300W' }, { type: 5, name: '300W-500W' }, { type: 6, name: '500W以上' }],
      classify5: [{ type: 0, name: '全部' }, { type: 1, name: '北京市' }, { type: 2, name: '天津市' }, { type: 3, name: '河北省' }, { type: 4, name: '山西省' }, { type: 5, name: '辽宁省' }, { type: 6, name: '吉林省' }, { type: 7, name: '黑龙江省' }, { type: 8, name: '上海市' }, { type: 9, name: '江苏省' }, { type: 10, name: '浙江省' }, { type: 11, name: '安徽省' }, { type: 12, name: '福建省' }, { type: 13, name: '江西省' }, { type: 14, name: '山东省' }, { type: 15, name: '河南省' }, { type: 16, name: '湖北省' }, { type: 17, name: '湖南省' }, { type: 18, name: '广东省' }, { type: 19, name: '广西壮族自治区' }, { type: 20, name: '海南省' }, { type: 21, name: '重庆市' }, { type: 22, name: '四川省' }, { type: 23, name: '贵州省' }, { type: 24, name: '云南省' }, { type: 25, name: '西藏自治区' }, { type: 26, name: '陕西省' }, { type: 27, name: '青海省' }, { type: 28, name: '宁夏回族自治区' }, { type: 29, name: '新疆维吾尔族自治区' }, { type: 29, name: '台湾省' }, { type: 30, name: '香港特别行政区' }, { type: 31, name: '海外' }, { type: 32, name: '甘肃省' }, { type: 33, name: '内蒙古自治区' }],
      classify6: [{ type: 0, name: '全部' }, { type: 1, name: '橱窗广告' }, { type: 2, name: '原创视频+发布' }, { type: 3, name: 'CPS分成' }, { type: 4, name: '直播带货' }]
    }
  },
  methods: {
    change (index, type) {
      this.page = 1
      if (index === 1) {
        this.followersType = ''
        this.followersSpreadType = ''
        this.totalLikedType = ''
        this.provinceType = ''
        this.extensionType = ''
      }
      if (index === 2) {
        this.contentType = ''
        this.followersSpreadType = ''
        this.totalLikedType = ''
        this.provinceType = ''
        this.extensionType = ''
      }
      if (index === 3) {
        this.contentType = ''
        this.followersType = ''
        this.totalLikedType = ''
        this.provinceType = ''
        this.extensionType = ''
      }
      if (index === 4) {
        this.contentType = ''
        this.followersType = ''
        this.followersSpreadType = ''
        this.provinceType = ''
        this.extensionType = ''
      }
      if (index === 5) {
        this.contentType = ''
        this.followersType = ''
        this.followersSpreadType = ''
        this.totalLikedType = ''
        this.extensionType = ''
      }
      if (index === 6) {
        this.contentType = ''
        this.followersType = ''
        this.followersSpreadType = ''
        this.totalLikedType = ''
        this.provinceType = ''
      }
      this.getsensationList()
    },
    async getsensationRecommend () {
      const res = await sensationRecommend({})
      if (res.result === '0') {
        this.sensationRecommend = res.datas.list
        this.$nextTick(() => {
          new Swiper ('.swiper-container2', {
            loop: true,
            allowTouchMove: false,
            slidesPerView: 5,
            // 如果需要分页器
            autoplay: {
              delay: 2000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    async getsensationList () {
      const res = await sensationList({ contentType: this.contentType || '', followersType: this.followersType || '', followersSpreadType: this.followersSpreadType || '', totalLikedType: this.totalLikedType || '', provinceType: this.provinceType || '', extensionType: this.extensionType || '', pageNum: this.page, pageSize: 12 })
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
    find () {
      this.$router.push(`SensationSearch?keywords=${this.keywords}`)
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
    this.getsensationRecommend()
    this.getsensationList()
    this.getagentList()
  }
}
</script>

<style lang="less" scoped>
  .Sensations {
    font-size: 0;
    height: 100%;
    .con {
      padding: 0.22rem 0.24rem;
      box-sizing: border-box;
      height: calc(100% - 1rem);
      .search {
        display: flex;
        margin-bottom: 0.22rem;
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
      height: calc(100% - 0.9rem);
      overflow: auto;
    }
  }
  .swiper-box {
    background-color: #fff;
    padding: 0.12rem 0.18rem;
    display: flex;
    margin-bottom: 0.22rem;
    // background-color: #F7F2FF;
    .swiper-container2 {
      flex: 1;
      overflow: hidden;
      height: 0.94rem;
      .swiper-slide {
        text-align: center;
        img {
          width: 0.94rem;
          height: 0.94rem;
          border-radius: 50%;
          user-select: none;
        }
      }
    }
    .left {
      width: 0.21rem;
      position: relative;
      margin-right: 0.17rem;
      img {
        width: 0.21rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .right {
      width: 0.21rem;
      position: relative;
      margin-left: 0.17rem;
      img {
        width: 0.21rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .procedure {
    height: 2.25rem;
    background-color: #fff;
    margin-bottom: 0.22rem;
    img {
      width: 100%;
    }
  }
  .Handsome-selection {
    margin-bottom: 0.22rem;
    display: flex;
    justify-content: space-between;
    select {
      width: 2.14rem;
      background-color: #fff;
      color: #DF56E1;
      font-size: 0.24rem;
      height: 0.64rem;
    }
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

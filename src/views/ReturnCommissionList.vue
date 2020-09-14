<template>
  <div class="ReturnCommissionList">
    <div v-show="type===''" class="banner" :style="'background:url(https://img.darentui.com/dou+_banner.png) no-repeat;background-position: center center;'">
      <!-- <img src="https://img.darentui.com/dou+_banner.png" alt=""> -->
    </div>
    <div v-show="type===''" class="nav-list">
      <div class="nav-item" @click="type=item.type" v-for="(item, index) in nav" :key="index" :class="type === item.type ? 'active' : ''">{{item.name}}</div>
    </div>
    <div class="list">
      <return-goods class="goods" v-for="(item, index) in 8" :key="index" />
    </div>
    <pager class="pager" @changepage="changepage" :page="page" />
  </div>
</template>

<script>
import returnGoods from '@c/ReturnCommission'
import pager from '@c/Pager'
export default {
  name: 'ReturnCommissionList',
  components: {
    returnGoods,
    pager
  },
  data () {
    return {
      page: { totalPage: 12, currentPage: 1 },
      type: '',
      nav: [{ type: '', name: '全部' }, { type: 1, name: '潮流女装' }, { type: 2, name: '精品男装' }, { type: 3, name: '时尚配件' }, { type: 4, name: '家居日用' }, { type: 5, name: '鞋子箱包' }, { type: 6, name: '数码家电' }, { type: 7, name: '母婴亲子' }, { type: 8, name: '文娱车品' }, { type: 9, name: '家装家纺' }, { type: 10, name: '户外运动' }, { type: 11, name: '食品饮料' }, { type: 12, name: '美容个护' }]
    }
  },
  methods: {
    changepage (page) {
      this.page.currentPage = page
    }
  },
  watch: {
    '$store.getters.keywords': function (val) { // 监听搜索框
      this.type = val
    }
  }
}
</script>

<style lang="less">
  .ReturnCommissionList {
    box-sizing: border-box;
    padding-top: 24px;
    margin: 0 auto;
  }
  .banner {
    height: 200px;
  }
  .nav-list {
    height: 70px;
    line-height: 70px;
    .nav-item {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: #666;
      height: 21px;
      line-height: 21px;
      border-radius: 4px;
      padding: 0 8px;
      margin-right: 21px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &:hover, &.active {
        color: #fff;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      }
    }
  }
  .list {
    .goods {
      margin-right: 40px;
      margin-bottom: 24px;
      display: inline-block;
      vertical-align: top;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  .pager {
    padding: 16px 0 40px;
  }
</style>

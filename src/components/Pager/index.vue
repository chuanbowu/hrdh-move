<template>
  <div class="pager">
    <template v-if="page.totalPage < 10">
      <div class="item" :class="page.currentPage===index+1?'active':''" v-for="(item, index) in page.totalPage" :key="index">{{index+1}}</div>
      <div class="lastpage">尾页</div>
    </template>
    <template v-else>
      <!-- <div @click="go()" class="item" :class="page.currentPage===1?'active':''">1</div> -->
      <template v-if="page.currentPage<5">
        <div class="item" v-for="(item, index)  in 6" :class="page.currentPage===index+1?'active':''" @click="go(index+1)" :key="index">{{index+1}}</div>
        <div @click="go(page.currentPage+5)" class="more">···</div>
        <div @click="go(page.totalPage)" class="item">{{page.totalPage}}</div>
      </template>
      <template v-if="page.currentPage>=5&&page.totalPage-page.currentPage>=4">
        <div @click="go(1)" class="item" :class="page.currentPage===1?'active':''">1</div>
        <div @click="go(page.currentPage-5)" class="more">···</div>
        <div @click="go(page.currentPage-2)" class="item">{{page.currentPage-2}}</div>
        <div @click="go(page.currentPage-1)" class="item">{{page.currentPage-1}}</div>
        <div class="item active">{{page.currentPage}}</div>
        <div @click="go(page.currentPage+1)" class="item">{{page.currentPage+1}}</div>
        <div @click="go(page.currentPage+2)" class="item">{{page.currentPage+2}}</div>
        <div @click="go(page.currentPage+4)" class="more">···</div>
        <div @click="go(page.currentPage+2)" class="item">{{page.totalPage}}</div>
      </template>
      <template v-if="page.totalPage-page.currentPage<4">
        <div @click="go(1)" class="item" :class="page.currentPage===1?'active':''">1</div>
        <div @click="go(page.currentPage-5)" class="more">···</div>
        <div class="item" :class="page.currentPage===page.totalPage-5?'active':''" @click="go(page.totalPage-5)">{{page.totalPage-5}}</div>
        <div class="item" :class="page.currentPage===page.totalPage-4?'active':''" @click="go(page.totalPage-4)">{{page.totalPage-4}}</div>
        <div class="item" :class="page.currentPage===page.totalPage-3?'active':''" @click="go(page.totalPage-3)">{{page.totalPage-3}}</div>
        <div class="item" :class="page.currentPage===page.totalPage-2?'active':''" @click="go(page.totalPage-2)">{{page.totalPage-2}}</div>
        <div class="item" :class="page.currentPage===page.totalPage-1?'active':''" @click="go(page.totalPage-1)">{{page.totalPage-1}}</div>
        <div class="item" :class="page.currentPage===page.totalPage?'active':''" @click="go(page.totalPage)">{{page.totalPage}}</div>
      </template>
      <div @click="go(page.totalPage)" class="lastpage">尾页</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default: function () {
        return { totalPage: 0, currentPage: 1 }
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    go (page) {
      page <= 0 ? this.$emit('changepage', 2) : this.$emit('changepage', page)
    }
  }
}
</script>

<style lang="less" scoped>
  .pager {
    text-align: center;
    .item {
      width: 37px;
      height: 37px;
      border: 1px solid #DF56E1;
      text-align: center;
      line-height: 37px;
      display: inline-block;
      vertical-align: top;
      margin-right: 28px;
      color: #DF56E1;
      font-size: 16px;
      cursor: pointer;
      &.active {
        background-color: #DF56E1;
        color: #fff;
      }
    }
    .more {
      // width: 39px;
      height: 39px;
      text-align: center;
      line-height: 39px;
      display: inline-block;
      vertical-align: top;
      margin-right: 28px;
      color: #DF56E1;
      font-size: 26px;
      cursor: pointer;
    }
    .lastpage {
      width: 61px;
      display: inline-block;
      vertical-align: top;
      color: #DF56E1;
      font-size: 16px;
      height: 37px;
      line-height: 37px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #DF56E1;
    }
  }
</style>

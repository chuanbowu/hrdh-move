<template>
  <div class="nav-list" @touchstart.stop="touchstart" @touchmove.stop="touchmove" @touchend.stop="touchend">
    <div :style="'left: '+x+'px'" ref="con">
      <div ref="item" class="nav-item" @click.stop="changetab($event, '')" :class="typeId === '' ? 'active' : ''">全部</div>
      <div ref="item" class="nav-item" @click.stop="changetab($event, item.goodsTypeConfigId)"  v-for="(item, index) in $store.getters.typeList" :key="index" :class="typeId === item.goodsTypeConfigId ? 'active' : ''">{{item.typeName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      typeId: '',
      w: 0,
      x: 0,
      x1: 0
    }
  },
  methods: {
    changetab (e, type, index) {
      this.typeId = type
      let W = this.$refs.con.clientWidth
      let x = e.target.offsetLeft + e.target.offsetWidth / 2
      if (x > this.w) {
        this.x = this.w - x
        if (x + this.w > W) {
          this.x = this.w * 2 - W
        }
      } else {
        this.x = 0
      }
      this.$emit('changeType', type)
    },
    touchstart (e) {
      this.x1 = e.touches[0].clientX
    },
    touchmove (e) {
      e.preventDefault();
      // console.log(e)
    },
    touchend (e) {
      // console.log(e)
      let move = e.changedTouches[0].clientX - this.x1
      this.x = this.x + move
      if (this.x > 0) this.x = 0
      if (this.x < this.w * 2 - this.$refs.con.clientWidth) this.x = this.w * 2 - this.$refs.con.clientWidth
    }
  },
  created () {
    this.w = document.documentElement.clientWidth / 375 * 100 * 3.51 / 2
  }
}
</script>

<style scoped lang="less">
  .nav-list {
    height: 0.74rem;
    width: 100%;
    overflow: hidden;
    position: relative;
    >div {
      position: absolute;
      top: 0;
      left: 0;
      height: 0.74rem;
      transition: all 0.2s;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: auto;
    }
    .nav-item {
      font-size: 0.24rem;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.42rem;
      border-radius: 0.04rem;
      padding: 0 0.08rem;
      margin-right: 0.2rem;
      white-space: nowrap;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        color: #fff;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      }
    }
  }
</style>
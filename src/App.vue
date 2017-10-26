<template>
  <div id="app">
    <router-view></router-view>
    <!-- tab bar -->
    <div class="tab-bar" v-show="isShow()">
        <router-link to="/home">
            <p class="tab-a">
                <span :class="{'home animated bounceIn':home(),'home2':!home()}"></span>
                首页
            </p>
        </router-link>
        <router-link to="/category" class="tab-a">
            <p class="tab-a">
                <span :class="{'cgr2 animated bounceIn':cgr(),'cgr':!cgr()}"></span>
                闪送超市
            </p>
        </router-link>
        <router-link to="/cart" class="tab-a" ref="cartEl">
            <p class="tab-a">
                <span :class="{'cart2 animated bounceIn':cart(),'cart':!cart()}" @click="changeTab='cart'"></span>
                购物车
            </p>
            <span class="proNum" v-show="productCount>0" :class="{'animated bounceIn':cartActiveBol}">{{productCount}}</span>
        </router-link>
        <router-link to="/mine" class="tab-a">
            <p class="tab-a">
                <span :class="{'mine2 animated bounceIn':mine(),'mine':!mine()}"></span>
                我的
            </p>
        </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted () {
    // 获取cart标签的位置
    let cartPos = this.$refs.cartEl.$el.getBoundingClientRect()
    this.$store.commit('CART_POS', cartPos)
  },
  created () {
    this.$store.dispatch('getHomeData')
    this.$store.dispatch('getCgrData')
    this.$store.dispatch('getUserData')
  },
  methods: {
    home () {
      if (this.$route.path === '/home') {
        return true
      } else {
        return false
      }
    },
    cgr () {
      if (this.$route.path === '/category') {
        return true
      } else {
        return false
      }
    },
    cart () {
      if (this.$route.path === '/cart') {
        return true
      } else {
        return false
      }
    },
    mine () {
      if (this.$route.path === '/mine') {
        return true
      } else {
        return false
      }
    },
    isShow () {
      if (this.$route.path === '/search' || this.$route.path === '/detail' || this.$route.path === '/address' || this.$route.path === '/selectsite') {
        return false
      } else {
        return true
      }
    }
  },
  computed: {
    productCount () {
      let count = 0
      for (var i = 0; i < this.$store.state.cartProduct.length; i++) {
        if (this.$store.state.cartProduct[i].no_col === '1') {
          count += this.$store.state.cartProduct[i].pre_state
        }
      }
      return count
    },
    cartActiveBol () {
      return this.$store.state.cartActiveBol
    }
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
.tab-bar {
  position: absolute;
  bottom: 0;
  height: 8%;
  width: 100%;
  font-size: 14px;
  border-top: solid 1px #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab-bar .tab-a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.tab-bar .tab-a span {
  background-size: 100% 100%;
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
}
.tab-bar .tab-a .proNum {
  position: absolute;
  top: -5px;
  right: -15px;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home {
  background: url("./assets/img/index2.png") no-repeat;
}

.cgr {
  background: url("./assets/img/send1.png") no-repeat;
}

.cart {
  background: url("./assets/img/cart1.png") no-repeat;
}

.mine {
  background: url("./assets/img/mine1.png") no-repeat;
}

.home2 {
  background: url("./assets/img/index1.png") no-repeat;
}

.cgr2 {
  background: url("./assets/img/send2.png") no-repeat;
}

.cart2 {
  background: url("./assets/img/cart2.png") no-repeat;
}

.mine2 {
  background: url("./assets/img/mine2.png") no-repeat;
}
</style>

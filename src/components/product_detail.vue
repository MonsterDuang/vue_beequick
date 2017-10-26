<template>
  <div class="detail">
    <header>
        <a @click="back"><img src="../assets/img/turuL.png" alt="" class="back"></a>
        {{detail.name}}
        <router-link to=""><img src="../assets/img/refresh.png" alt="" class="back"></router-link>
    </header>
    <div class="proMsg">
        <img :src="detail.img" alt="">
        <h3>{{detail.long_name}}</h3>
        <p><span>¥{{detail.price}}</span><span v-show="detail.price<detail.market_price">¥{{detail.market_price}}</span></p>
    </div>
    <div class="operates">
        <span class="get">收藏</span>
        <span class="add">添加商品:</span>
        <span class="less" @click="subProduct(detail)"> - </span>
        <span class="count"> {{detail.pre_state}} </span>
        <span class="plus" @click="addProduct(detail)"> + </span>
        <router-link to="/cart" class="img">
            <span><img src="../assets/img/cart.png" alt=""></span>
        </router-link>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    detail () {
      return this.$store.state.detail
    }
  },
  methods: {
    // 返回上一个页面
    back () {
      this.$router.go(-1)
    },
    // 添加商品到购物车
    addProduct (detail) {
      this.$store.dispatch('addProduct', detail)
    },
    // 减少商品
    subProduct (detail) {
      this.$store.dispatch('subProduct', detail)
    }
  }
}
</script>
<style scoped>
.detail{
  width: 100%;
  height: 100%;
}
header {
    width: 100%;
    font-size: 16px;
    height: 5%;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #ccc;
    padding: 0 10px;
    position: fixed;
    top: 0
}

.back{
  width: 50%;
  position: relative;
  top: 5px;
}


.proMsg {
    height: 88%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.proMsg img {
    width: 90%
}
.proMsg p {
    margin-top: 20px;
}

.proMsg p span:first-of-type {
    font-size: 18px;
    font-weight: bolder;
    color: #f40;
    margin-right: 10px;
}
.proMsg p span:last-of-type{
    text-decoration: line-through;
    color: #999
}
.operates {
    border-top: solid 1px #ccc;
    height: 7%;
    width: 100%;
    position: fixed;
    bottom: 0px;
    font-size: 13px;
    display: flex;
    align-items: center
}

.get {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 5%;
}

.get i {
    font-size: 26px;
}

.add {
    position: absolute;
    left: 20%;
}

.plus, .less, .count {
    width: 30px;
    height: 30px;
    color: #ff4300;
    font-size: 35px;
    font-weight: bolder;
    position: absolute;
    top: 15px;
    right: 25%;
    text-align: center;
    border: 1px solid #ff4300;
    border-radius: 2em;
    line-height: 30px;
}

.count {
    right: 32.5%;
    font-size: 16px;
    border: none;
    color: #333;
}

.less {
    right: 40%;
}

.operates .img {
    width: 60px;
    height: 60px;
    position: absolute;
    right: 5%;
    top: -25px;
    border-top: 1px #ccc solid;
    border-radius: 50%;
    padding: 5px;
    background-color: #fff
}
.operates .img span {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    background-color: #ffd600;
}
.operates .img img{
  width: 100%;
}
</style>

<template>
  <div class="Home">
    <header>
      <router-link to="/address"><h3>驼房营路附近<span class="add-block">▼</span></h3></router-link>
      <span class="search">
        <router-link to="/search"><img src="../assets/img/search.png" alt=""></router-link>
      </span>
    </header>
    <div class="homeContainer">
      <div class="rollImg">
        <img src="http://img01.bqstatic.com//upload/activity/2017092313531570.jpg@90Q.jpg" alt="">
      </div>
      <!-- nav -->
      <ul class="nav">
        <li v-for="(item,index) in homeNav" :key="index">
          <a href=""><img v-lazy="item.img" alt=""></a>
          <h4>{{item.name}}</h4>
        </li>
      </ul>
      <!-- 推荐_1 -->
      <div class="recommend1">
          <a href="" v-for="(item,index) in recommend1" :key="index">
              <img v-lazy="item.img" alt="">
          </a>
      </div>
      <!-- 推荐_2 -->
      <div class="recommend2">
          <img v-lazy="market" class="market">
          <router-link to="" class="">
              <img v-lazy="newP" class="new">
              <img v-lazy="hot" class="hot">
          </router-link>
          <!-- nav -->
          <ul class="recNav">
              <li v-for="(item,index) in recNav" :key="index">
                  <a href=""><img v-lazy="item.img" alt=""></a>
                  <h4>{{item.name}}</h4>
              </li>
          </ul>
          <!-- Ad -->
          <a href="" v-for="(item,index) in recAd" :key="index" class="banner">
              <img v-lazy="item.activity.img">
          </a>
      </div>
      <!-- 部分商品 -->
      <div class="partPro" v-for="(item,index1) in partPro" :key="item.id">
        <p :style="{color: '#'+item.category_detail.category_color}">
          <span class="block" :style="{'background-color': '#'+item.category_detail.category_color}"></span>
          {{item.category_detail.name}}
          <router-link :to="{path:'/category',query:{id:item.category_detail.category_id,name:item.category_detail.name}}" class="right">更多 &gt;</router-link>
        </p>
        <img v-lazy="item.activity.img" alt="">
        <!-- 商品 -->
        <ul>
          <li v-for="(item,index2) in partPro[index1].category_detail.goods" :key="item.id" @click="detail(item)">
            <img v-lazy="item.img" alt="">
            <div class="proMsg">
                <h3 class="pro_name">{{item.name}}</h3>
                <span class="good_select">精选</span><br>
                <p class="net_w">{{item.specifics}}</p>
                <span class="price">¥{{item.price}}</span>
                <span class="old_price" v-show="item.price<item.market_price">¥{{item.market_price}}</span>
                <span class="plus" @click.stop="addProduct(item)"> + </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    homeNav () {
      return this.$store.state.homePage.nav
    },
    recommend1 () {
      return this.$store.state.homePage.recommend1
    },
    market () {
      return this.$store.state.homePage.recommend2[0].chead_detail.img
    },
    newP () {
      return this.$store.state.homePage.recommend2[1].cactivity_detail.img
    },
    hot () {
      return this.$store.state.homePage.recommend2[2].cactivity_detail.img
    },
    recNav () {
      return this.$store.state.homePage.recommend2[3].rec_nav
    },
    recAd () {
      return this.$store.state.homePage.recommend2[4].rec_ad
    },
    partPro () {
      return this.$store.state.homePage.partPro
    }
  },
  methods: {
    // 添加商品到购物车
    addProduct (item) {
      this.$store.dispatch('addProduct', item)
    },
     // 商品详情
    detail (item) {
      this.$router.push('/detail')
      this.$store.dispatch('detail', item)
    }
  }
}
</script>

<style scoped>
.Home {
  width: 100%;
  height: 92%;
}
header {
  width: 100%;
  height: 7%;
  padding: 0 10px;
  position: fixed;
  text-align: center;
  line-height: 60px;
  background-color: #ffd600;
}

h3 {
  height: 100%;
  font-size: 18px;
  font-weight: bolder;
  color: #000;
}
.add-block {
  font-size: 14px;
  margin-left: 5px;
}
.search {
  height: 100%;
  position: absolute;
  top: 0;
  right: 14px;
}
.search a {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search img {
  width: 70%;
}

.homeContainer {
  position: absolute;
  top: 7%;
  width: 100%;
  height: 85%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #efefef;
}
.rollImg {
  width: 100%;
  height: 30%;
  margin-bottom: 10px
}

.rollImg img {
  width: 100%;
  height: 100%;
}
.nav {
  list-style: none;
  width: 100%;
  height: 20%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav li {
  float: left;
  width: 22.5%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav li img {
  width: 100%;
  height: 100%;
}
.recommend1 {
  margin-top: 10px;
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.recommend1 a{
  width: 33%;
  height: 100%;
}
.recommend1 a img {
  height: 100%;
  width: 100%;
}

.recommend2 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.market {
  width: 100%;
}

.new, .hot {
  width: 48.5%;
}

.new {
  margin-left: 0.5%;
}

.recNav {
  list-style: none;
  width: 100%;
  height: 20%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}

.recNav li {
  float: left;
  width: 22.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.banner{
  display: inline-block;
  width: 49.7%;
  margin-top: 1px;
  margin-right: 1px;
}
.banner img {
  width: 100%;
  height: 100%;
}

.partPro {
    margin-bottom: 10px;
    width: 100%;
    height: 70%;
    background-color: #fff;
}

.partPro > p {
    height: 10%;
    width: 94%;
    margin-left: 3%;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    position: relative;
}

.partPro p .block {
    width: 3%;
    height: 50%;
    margin-right: 1%;
}

.partPro p .right {
    position: absolute;
    top: 40%;
    right: 0;
    color: #999;
    font-weight: normal;
    font-size: 16px;
}

.partPro img {
    width: 94%;
    margin-left: 3%;
}

.partPro ul {
    list-style: none;
    height: 60%;
    margin-top: 15px;
}

.partPro ul li {
    float: left;
    width: 33.333%;
    height: 100%;
    border-right: 2px solid #efefef;
    position: relative;
}

.proMsg {
    padding: 0 10px;
}

.pro_name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #232b33;
    font-weight: normal;
    font-size: 16px;
}

.good_select {
    border: 1px solid red;
    display: inline-block;
    color: red;
    font-size: 12px;
    line-height: 10px;
    padding: 2px;
    border-radius: 5px;
}

.net_w {
    color: #999;
    font-size: 12px;
    margin-top: 10px;
}

.price {
    color: #ff3800
}

.old_price {
    color: #999;
    text-decoration: line-through;
}
.plus {
    width: 30px;
    height: 30px;
    color: #ff4300;
    font-size: 35px;
    font-weight: bolder;
    position: absolute;
    bottom: 1%;
    right: 5%;
    text-align: center;
    border: 1px solid #ff4300;
    border-radius: 2em;
    line-height: 30px;
}

img[lazy=loading] {
  width: 100px;
  height: 100px;
  background: url('../assets/img/loading.gif') no-repeat center center;
  background-size: 20px 20px
}
</style>

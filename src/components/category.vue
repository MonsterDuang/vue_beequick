<template>
  <div class="Cgr">
    <header>
      <router-link to="/address"><h3>驼房营路附近<span class="add-block">▼</span></h3></router-link>
      <span class="search">
        <router-link to="/search"><img src="../assets/img/search.png" alt=""></router-link>
      </span>
    </header>
    <div class="cgrContainer">
      <!-- 侧边列表 -->
      <div id="cgr">
        <ul class="cgrList">
          <li v-for="(item,index) in cgrList" @click="showYlw(index,item.id)" :key="index">
            <span :class="{'ylw':setIndex===index, 'ylwNone':setIndex!==index}"></span>
            {{item.name}}
            <img :src="item.flag" v-show="item.flag">
          </li>
        </ul>
      </div>
      <!-- 右边tab -->
      <div class="select">
        <a @click="sortL()">{{key}} <img src="../assets/img/turnD.png" alt="" :class="{'iRotate':showLBol,'iRotateBack':!showLBol}"></a>
        <a @click="sortR()">{{ranking[activeRankIndex].name}} <img src="../assets/img/turnD.png" alt="" :class="{'iRotate':showRBol,'iRotateBack':!showRBol}"></a>
      </div>
      <!-- 全部分类 -->
      <div id="allCate" v-if="showLBol" @click="showLBol=false">
        <p>
          <span href="" v-for="(item,index) in cgrCids" @click="assort(item)" :class="{'active':key===item.name}" :key="item.name">{{item.name}}</span>
        </p>
      </div>
      <!-- 综合排序 -->
      <div id="integratedSort" v-if="showRBol" @click="showRBol=false">
        <p>
          <span v-for="(item,index) in ranking" @click="sort(index)" :class="{'active':activeRankIndex===index}" :key="item.name">{{item.name}}</span>
        </p>
      </div>
      <!-- productList -->
      <div id="productList">
        <ul>
            <li class="productList" v-for="(item,index) in proList" :key="item.id" @click="detail(item)">
              <img v-lazy="item.img" alt="" :ref="'item'+index">
              <!-- 产品信息 -->
              <div class="pro_msg">
                  <h3 class="pro_name">{{item.name}}</h3>
                  <span class="good_select">精选</span>
                  <span class="gift" v-show="item.pm_desc">{{item.pm_desc}}</span>
                  <p class="net_w">{{item.specifics}}</p>
                  <span class="price">¥{{item.price}}</span>
                  <span class="old_price" ng-show="item.price<item.market_price">¥{{item.market_price}}</span>
              </div>
              <!-- 数量 +/- -->
              <span class="less" v-show="item.pre_state>0" @click.stop="subProduct(item)"> - </span>
              <span class="count" v-show="item.pre_state>0"> {{item.pre_state}} </span>
              <span class="plus" @click.stop="addProduct(item, index)"> + </span>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
function orderBy (arr, type, bol) {
  if (bol === undefined) {
    bol = true
  }
  function sortNumber (a, b) {
    if (bol) {
      if (type) {
        return a[type] - b[type]
      } else {
        return a - b
      }
    } else {
      if (type) {
        return b[type] - a[type]
      } else {
        return b - a
      }
    }
  }
  return arr.sort(sortNumber)
}
export default {
  created () {
    if (this.cgrList) {
      for (var i = 0; i < this.cgrList.length; i++) {
        if (this.cgrList[i].name === this.$route.query.name) {
          this.setIndex = i
        }
      }
    }
  },
  data () {
    return {
      setIndex: 0,
      productId: this.$route.query.id !== undefined ? this.$route.query.id : 104747,
      key: '全部分类',
      showLBol: false,
      showRBol: false,
      activeRankIndex: 0,
      ranking: [
        {name: '综合排序'},
        {name: '价格最高'},
        {name: '价格最低'}
      ]
    }
  },
  computed: {
    cgrList () {
      return this.$store.state.categoryPage.categories
    },
    Products () {
      return this.$store.state.categoryPage.products
    },
    cgrCids () {
      return this.cgrList[this.setIndex].cids
    },
    proList () {
      let result = this.Products[this.productId]
      if (this.key !== '全部分类') {
        result = result.filter(item => item.cids[item.child_cid] === this.key)
      }
      switch (this.activeRankIndex) {
        case 1:
          result = orderBy(result, 'price', false)
          break
        case 2:
          result = orderBy(result, 'price', true)
          break
      }
      return result
    }
  },
  methods: {
    // 侧边栏切换
    showYlw (index, id) {
      this.key = '全部分类'
      this.activeRankIndex = 0
      this.setIndex = index
      this.productId = id
    },
    // '全部分类' 显示隐藏
    sortL () {
      this.showRBol = false
      this.showLBol = !this.showLBol
    },
    // '综合排序' 显示隐藏
    sortR () {
      this.showLBol = false
      this.showRBol = !this.showRBol
    },
    // 切换 分类
    assort (item) {
      this.key = item.name
      this.showLBol = false
    },
    // 排序切换
    sort (index) {
      this.activeRankIndex = index
      this.showRBol = false
    },
    // 添加商品到购物车
    addProduct (item, index) {
      this.$store.dispatch('addProduct', item)
      // 获取点击对象
      let imgObj = this.$refs['item' + index][0]
      let pos = imgObj.getBoundingClientRect()
      let cartPos = this.$store.state.cartPos
      this.$addCart({
        src: item.img,
        width: pos.width,
        height: pos.height,
        start: {
          left: pos.left,
          top: pos.top
        },
        end: {
          left: cartPos.left,
          top: cartPos.top
        }
      })
    },
    // 减少商品
    subProduct (item) {
      this.$store.dispatch('subProduct', item)
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
.Cgr {
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
  height:100%;
  font-size: 18px;
  font-weight: bolder;
  color: #000;
}
.add-block{
  font-size: 14px;
  margin-left:5px 
}
.search {
  height: 100%;
  position: absolute;
  top: 0;
  right: 14px;
}
.search a{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.search img{
  width: 70%;
}
.cgrContainer {
  position: absolute;
  top: 7%;
  width: 100%;
  height: 85%;
  overflow-y: auto;
  overflow-x: hidden;
}
#cgr {
    width: 25%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    left: 0;
}

.cgrList {
    width: 100%;
    list-style: none;
    background-color: #f8f8f8;
    margin-bottom: 0;
}

.cgrList li {
    padding: 20px 0;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
    color: #6d6d6d;
    position: relative;
}

.cgrList li img {
    position: absolute;
    top: 0;
    right: 0;
    height: 60%;
}

.ylw {
  width: 10px;
  height: 80%;
  position: absolute;
  left: 0;
  top: 10%;
  background: #ffd600;
}

.ylwNone {
  display: none;
}
.select {
    width: 73%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    border-bottom: solid 1px #e0e0e0;
    position: absolute;
    right: 0;
}

.select a {
    width: 50%;
    height: 50%;
    font-size: 14px;
    display: flex;
    color: #6d6d6d;
    justify-content: center;
    align-items: center;
}

.select a:first-of-type {
    border-right: solid 1px #e0e0e0;
}

.select a img {
    width: 10%;
    margin-left: 3%;
    margin-top: -1%;
}

.iRotate {
    animation: iRotate 0.5s;
    animation-fill-mode: forwards;
}

@keyframes iRotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-180deg);
    }
}

.iRotateBack {
    animation: iRotateBack 0.5s;
    animation-fill-mode: forwards;
}

@keyframes iRotateBack {
    0% {
        transform: rotate(-180deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

#allCate, #integratedSort {
    width: 75%;
    height: 90%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    right: 0;
    top: 10%;
    z-index: 1;
}

#allCate p, #integratedSort p {
    background: #fff;
    padding: 2% 10%;
}

#allCate p span, #integratedSort p span {
    display: inline-block;
    border: solid 1px rgb(255, 214, 0);
    border-radius: 0.5em;
    padding: 5px 8px;
    text-align: center;
    margin: 10px;
    color: rgb(117, 117, 117);
}

.active {
    background: rgb(255, 249, 217);
}

#productList {
    width: 73%;
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-left: 2%;
    position: absolute;
    right: 0;
    top: 10%;
}

#productList ul {
    margin: 0;
}

.productList {
    width: 100%;
    height: 20%;
    list-style: none;
    border-bottom: solid 1px #e0e0e0;
    padding-bottom: 2%;
    position: relative;
}

.productList::after {
    content: "";
    display: block;
    clear: both;
}

.productList img {
    float: left;
    width: 40%;
    height: 100%;
    margin-left: 1%;
}

.pro_msg {
    float: left;
    margin-left: 3%;
    width: 50%;
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

.gift {
    background-color: red;
    color: #fff;
    border-radius: 0.5em;
    padding: 1px 2px;
}

.net_w {
    margin-top: 10px;
    color: #999;
}

.price {
    color: #ff3800
}

.old_price {
    color: #999;
    text-decoration: line-through;
}

.plus, .less, .count {
    width: 30px;
    height: 30px;
    color: #ff4300;
    font-size: 35px;
    font-weight: bolder;
    position: absolute;
    bottom: 5%;
    right: 5%;
    text-align: center;
    border: 1px solid #ff4300;
    border-radius: 2em;
    line-height: 30px;
}

.count {
    position: absolute;
    bottom: 5%;
    right: 15%;
    font-size: 16px;
    border: none;
    color: #333;
}

.less {
    right: 25%;
}
img[lazy=loading] {
  width: 100px;
  height: 100px;
  background: url('../assets/img/loading.gif') no-repeat center center;
  background-size: 20px 20px
}
</style>


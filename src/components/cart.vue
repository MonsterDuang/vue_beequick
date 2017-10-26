<template>
  <div class="Cart">
    <header>
      <h3>购物车</h3>
    </header>
    <div id="cartContainer">
      <!-- 空购物车 -->
      <div class="empty" v-show="cartProduct.length==0">
          <img src="http://m.beequick.cn/static/bee/img/m/icon/empty_addrlist-7b6725e9.png" alt="">
          <p>亲,购物车空空的耶~</p>
          <router-link to="/home">去逛逛</router-link>
      </div>
      <!-- 已选商品 -->
      <div class="shopping" v-show="cartProduct.length>0">
        <router-link to="/address" v-show="userMsg.length==0"><p class="top">鲜蜂侠需要您精确的坐标</p></router-link>
        <div class="receive" v-show="userMsg.length>0">
          <ul class="list">
            <li>收&nbsp;货&nbsp;人</li>
            <li>电&nbsp;&nbsp;&nbsp;&nbsp;话</li>
            <li>收货地址</li>
          </ul>
          <ul class="list">
            <li>{{nowAddress.name}} {{nowAddress.gender}}</li>
            <li>{{nowAddress.tel}}</li>
            <li>{{nowAddress.city}}{{nowAddress.house}} {{nowAddress.number}}</li>
          </ul>
          <p class="change"><router-link to="/address">修改 <span><img src="../assets/img/turnR.png" alt=""></span></router-link></p>
        </div>
        <div class="msg">
          <p class="san"><span></span>闪送超市</p>
          <p class="tip">¥0起送,22:00前满¥30免运费</p>
        </div>
        <!-- 收货信息 -->
        <div class="receipts">
            <p>收货时间
              <span>{{value}}</span>
              <span>可预订<img src="../assets/img/turnR.png" alt=""></span>
              <!-- 下拉菜单选择收货时间 -->
              <select v-model="value">
                  <optgroup label="今天">
                      <option value="30分钟送达">
                          30分钟送达
                      </option>
                      <option value="14:00-15:00">
                          14:00-15:00
                      </option>
                      <option value="15:00-16:00">
                          15:00-16:00
                      </option>
                      <option value="16:00-17:00">
                          16:00-17:00
                      </option>
                      <option value="17:00-18:00">
                          17:00-18:00
                      </option>
                      <option value="18:00-19:00">
                          18:00-19:00
                      </option>
                      <option value="19:00-20:00">
                          19:00-20:00
                      </option>
                      <option value="20:00-21:00">
                          20:00-21:00
                      </option>
                      <option value="21:00-22:00">
                          21:00-22:00
                      </option>
                      <option value="22:00-23:00">
                          22:00-23:00
                      </option>
                      <option value="23:00-24:00">
                          23:00-24:00
                      </option>
                  </optgroup>
                  <optgroup label="明天">
                      <option value="明天 09:00-10:00">
                          09:00-10:00
                      </option>
                      <option value="明天 10:00-11:00">
                          10:00-11:00
                      </option>
                      <option value="明天 11:00-12:00">
                          11:00-12:00
                      </option>
                      <option value="明天 12:00-13:00">
                          12:00-13:00
                      </option>
                      <option value="明天 13:00-14:00">
                          13:00-14:00
                      </option>
                      <option value="明天 14:00-15:00">
                          14:00-15:00
                      </option>
                      <option value="明天 15:00-16:00">
                          15:00-16:00
                      </option>
                      <option value="明天 16:00-17:00">
                          16:00-17:00
                      </option>
                      <option value="明天 17:00-18:00">
                          17:00-18:00
                      </option>
                      <option value="明天 18:00-19:00">
                          18:00-19:00
                      </option>
                      <option value="明天 19:00-20:00">
                          19:00-20:00
                      </option>
                      <option value="明天 20:00-21:00">
                          20:00-21:00
                      </option>
                      <option value="明天 21:00-22:00">
                          21:00-22:00
                      </option>
                      <option value="明天 22:00-23:00">
                          22:00-23:00
                      </option>
                      <option value="明天 23:00-24:00">
                          23:00-24:00
                      </option>
                  </optgroup>
                  <optgroup label="后天">
                      <option value="后天 09:00-10:00">
                          09:00-10:00
                      </option>
                      <option value="后天 10:00-11:00">
                          10:00-11:00
                      </option>
                      <option value="后天 11:00-12:00">
                          11:00-12:00
                      </option>
                      <option value="后天 12:00-13:00">
                          12:00-13:00
                      </option>
                      <option value="后天 13:00-14:00">
                          13:00-14:00
                      </option>
                      <option value="后天 14:00-15:00">
                          14:00-15:00
                      </option>
                      <option value="后天 15:00-16:00">
                          15:00-16:00
                      </option>
                      <option value="后天 16:00-17:00">
                          16:00-17:00
                      </option>
                      <option value="后天 17:00-18:00">
                          17:00-18:00
                      </option>
                      <option value="后天 18:00-19:00">
                          18:00-19:00
                      </option>
                      <option value="后天 19:00-20:00">
                          19:00-20:00
                      </option>
                      <option value="后天 20:00-21:00">
                          20:00-21:00
                      </option>
                      <option value="后天 21:00-22:00">
                          21:00-22:00
                      </option>
                      <option value="后天 22:00-23:00">
                          22:00-23:00
                      </option>
                      <option value="后天 23:00-24:00">
                          23:00-24:00
                      </option>
                  </optgroup>
              </select>
            </p>
            <p>收货备注 <input type="text" placeholder="可输入100字以内特殊要求内容"></p>
          </div>
          <!-- 已选商品信息 -->
          <div class="shopList" v-for="(item,index) in cartProduct" :key="item.id">
              <p>
                  <span class="select" @click="selectOne(index)">
                      <img v-show="item.no_col==='1'" src="../assets/img/select.png" alt="">
                  </span>
                  <img :src="item.img" alt="" class="proImg">
              </p>
              <div class="np">
                  <p>{{item.name}}</p>
                  <br>
                  <p>¥{{item.price}}</p>
              </div>
              <span class="less" @click="subProduct(item)"> - </span>
              <span class="count"> {{item.pre_state}} </span>
              <span class="plus" @click="addProduct(item)"> + </span>
          </div>
          <!-- 确认 -->
          <div class="checkout">
              <p>
                  <span class="select" @click="selectAll()">
                      <img v-show="selectAllBol" src="../assets/img/select.png" alt="">
                  </span>
                  <span class="all">全选</span>
                  <span class="total">共:</span>
                  <span class="total_price">¥ {{totalPrice.toFixed(2)}}</span>
              </p>
              <span>选好了</span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '30分钟送达'
    }
  },
  computed: {
    cartProduct () {
      return this.$store.state.cartProduct
    },
    totalPrice () {
      let result = 0
      for (var i = 0; i < this.$store.state.cartProduct.length; i++) {
        if (this.$store.state.cartProduct[i].no_col === '0') {
          continue
        } else {
          result += (this.$store.state.cartProduct[i].pre_state * this.$store.state.cartProduct[i].price)
        }
      }
      return result
    },
    userMsg () {
      return this.$store.state.userMsg
    },
    nowAddress () {
      if (this.userMsg.length > 0) {
        return this.userMsg[this.$store.state.nowAddIndex]
      } else {
        return {}
      }
    },
    selectAllBol () {
      return this.$store.state.selectAllBol
    }
  },
  methods: {
    // 添加商品到购物车
    addProduct (item) {
      this.$store.dispatch('addProduct', item)
    },
    // 减少商品
    subProduct (item) {
      this.$store.dispatch('subProduct', item)
    },
    // 单个勾选按钮
    selectOne (index) {
      this.$store.dispatch('selectOne', index)
    },
    // 全选按钮
    selectAll () {
      this.$store.dispatch('selectAll')
    }
  }
}
</script>

<style scoped>
.Cart{
  width: 100%;
  height: 92%;
}
header {
  width: 100%;
  height: 7%;
  padding: 0 10px;
  position: fixed;
  background-color: rgb(249, 250, 253);
  border-bottom: solid 1px #e0e0e0;
}

h3 {
  height:100%;
  font-size: 18px;
  font-weight: bolder;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center
}
#cartContainer {
  width: 100%;
  height: 85%;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 7%;
}

.empty {
  width: 100%;
  height: 100%;
  background-color: #efefef;
  position: relative;
}

.empty img {
  width: 25%;
  position: absolute;
  top: 10%;
  left: 37.5%;
}

.empty p {
  color: #999;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 30%;
}

.empty a {
  display: inline-block;
  color: #999;
  width: 15%;
  height: 3%;
  font-size: 12px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: absolute;
  top: 35%;
  left: 42.5%;
}
.shopping {
    width: 100%;
    height: 100%;
    background-color: #efefef;
    position: relative;
}
.top {
    background-color: #fff;
    color: #e64f1a;
    font-size: 18px;
    padding: 17px 30px 17px 18px;
    border-bottom: solid 1px #e0e0e0;
    margin-bottom: 0;
}
.receive {
    width: 100%;
    height: 120px;
    font-size: 16px;
    font-weight: 400;
    background-image: url("../assets/img/getBg.png"), url("../assets/img/getBg.png");
    background-position: left top, left bottom;
    background-repeat: repeat-x;
    -webkit-background-size: auto 3px;
    background-size: auto 3px;
    background-color: #fff;
}

.list {
    padding-left: 18px;
    float: left;
    list-style: none;
}
.list li {
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.list:last-of-type{
    width: 50%;
    margin-left: 10px;
}
.list:last-of-type li:last-of-type{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.change{
    height: 100%;
    float: right;
    line-height: 120px;
    margin-right: 10px;
}
.change a{
    color: #999;
}
.change img{
    height: 14px;
    position: relative;
    top: 2px;
    left: 5px;
}
.msg {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px 10px 0 18px;
    color: #999;
    border-bottom: solid 1px #e0e0e0;
}

.san span {
    display: inline-block;
    width: 5px;
    height: 12px;
    background: #ffd600;
    border-radius: 2em;
    margin-right: 5px;
}

.receipts {
    background-color: #fff;
}

.receipts p {
    padding: 18px;
    width: 100%;
    border-bottom: solid 1px #e0e0e0;
    margin: 0;
    position: relative;
}
.receipts p select{
    position: absolute;
    top: 0;
    right: 5%;
    bottom: 0;
    width: 15%;
    border: 0;
    opacity: 0;
}
.receipts p span:first-of-type {
    color: #e64f1a;
    margin-left: 10px;
}
.receipts p span:last-of-type img{
  width: 30px;
  position: relative;
  top: 2px;
  left: 10px
}
.receipts p span:last-of-type {
    float: right;
}

.receipts input {
    outline: none;
    border: 1px solid #efefef;
    border-radius: 5px;
    margin-left: 10px;
    width: 75%;
    padding: 2% 2%;
}

.shopList {
    width: 100%;
    height: 110px;
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    position: relative;
}
.shopList > p{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 45%
}
.shopList .proImg {
    height: 80%;
    margin-right: 10px;               
}

.shopList .np {
    position: absolute;
    top: 18PX;
    left: 45%;
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

.checkout {
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    position: relative;
}

.checkout > p {
    width: 70%;
    line-height: 70px;
    float: left;
}

.all {
    margin-left: 10px;
}

.total {
    margin-left: 20%;
}

.total_price {
    color: #f00;
}

.checkout > span {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffd600;
    position: absolute;
    top: 0;
    right: 0;
}

.select {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 20px;
    border: solid 1px #efefef;
    border-radius: 2em;
    position: relative;
}

.select > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
}
</style>

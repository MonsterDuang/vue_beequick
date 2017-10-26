<template>
<div class="Address">
  <header>
    <a @click="back" v-show="addressBol"><img src="../assets/img/turuL.png" alt=""></a>
    <h3>{{title}}</h3>
    <span class="save" v-show="!addressBol" @click="saveUser(name,tel,selectedCity,selectedSite,number)">保存</span>
  </header>
  <!-- 选择地址 -->
  <div class="box" v-show="addressBol">
    <div class="now" @click="position()">
      <img src="../assets/img/point.png" alt="">
      定位到当前位置
    </div>
    <div class="addressMsg" v-for="(item,index) in userMsg" :key="index">
      <router-link to="/cart">
        <div @click="changeAddress(index)">
            <p class="selectedAdd" v-show="nowAddIndex===index"></p>
            <p class="user">{{item.name}} {{item.tel}}</p>
            <p class="address">{{item.city}}{{item.house}} {{item.number}}</p>
        </div>
      </router-link>
      <p class="edit"><img src="../assets/img/edit.png" alt="" @click="edit(index, item)"></p>
      
    </div>
    <div class="bottom" @click="addSite()"><p>+ 新增地址</p></div>
  </div>
  <!-- 添加地址 & 修改地址 -->
  <div class="box" v-show="!addressBol">
      <table>
          <tr>
              <td>联系人</td>
              <td><input type="text" placeholder="收货人姓名" v-model="name"></td>
          </tr>
          <tr>
              <td></td>
              <td>
                  <span class="select" @click="gender()">
                      <img v-show="genderBol" src="../assets/img/select.png" alt="">
                  </span>先生
                  <span class="select" @click="gender()">
                      <img v-show="!genderBol" src="../assets/img/select.png" alt="">
                  </span>女士
              </td>
          </tr>
          <tr>
              <td>手机号码</td>
              <td><input type="tel" placeholder="鲜蜂侠联系您的电话" v-model="tel"></td>
          </tr>
          <tr>
              <td>所在城市</td>
              <td>
                  <p>{{selectedCity === '' ? '请选择城市' : selectedCity}}</p><img src="../assets/img/turnR.png" alt="" class="city">
                  <select name="city" id="" v-model="city" @change="changeCity(city)">
                      <option value="北京市">北京市</option>
                      <option value="上海市">上海市</option>
                      <option value="天津市">天津市</option>
                      <option value="广州市">广州市</option>
                      <option value="深圳市">深圳市</option>
                      <option value="烟台市">烟台市</option>
                      <option value="南昌市">南昌市</option>
                      <option value="赣州市">赣州市</option>
                  </select>
              </td>
          </tr>
          <tr>
              <td>所在地区</td>
              <td><input type="text" placeholder="请选择您的住宅小区" v-model="selectedSite" @click.prevent='selectSite'></td>
          </tr>
          <tr>
              <td>详细地址</td>
              <td><input type="number" placeholder="请输入楼号门牌号" v-model="number"></td>
          </tr>
      </table>
      <div class="del" v-show="title==='修改地址'" @click="delSite"><p>删除地址</p></div>
      <div class="empty"></div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      title: '选择地址',
      city: '',
      name: '',
      tel: '',
      house: '',
      number: '',
      genderBol: true
    }
  },
  computed: {
    userMsg () {
      return this.$store.state.userMsg
    },
    nowAddIndex () {
      return this.$store.state.nowAddIndex
    },
    selectedCity () {
      return this.$store.state.selectedCity
    },
    selectedSite () {
      return this.$store.state.selectedSite
    },
    addressBol () {
      return this.$store.state.addressBol
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    addSite () {
      this.$store.state.addressBol = false
      this.title = '添加地址'
    },
    edit (index, item) {
      this.$store.state.addressBol = false
      this.title = '修改地址'
      this.city = item.city
      this.name = item.name
      this.tel = item.tel
      this.house = item.house
      this.number = item.number
      this.userMsg.splice(index, 1)
      this.$store.dispatch('editorSite', item)
    },
    saveUser (name, tel, selectedCity, selectedSite, number) {
      if (name === '' || tel === '' || selectedCity === '' || selectedSite === '' || number === '') {
        this.$msg('提示', '输入有误')
      } else {
        this.$msg('提示', '保存地址成功').then(data => {
          this.$store.state.addressBol = true
        })
        let msg = {
          name: name,
          tel: tel,
          city: selectedCity,
          house: selectedSite,
          number: number,
          gender: this.genderBol ? '先生' : '女士'
        }
        this.$store.dispatch('saveUser', msg)
      }
    },
    gender () {
      this.genderBol = !this.genderBol
    },
    changeAddress (index) {
      this.$store.dispatch('changeAddress', index)
    },
    delSite () {
      this.title = '选择地址'
      this.$store.state.addressBol = true
    },
    changeCity (city) {
      this.$store.dispatch('changeCity', city)
    },
    selectSite () {
      if (this.selectedCity === '') {
        this.$msg('提示', '请选择城市')
      } else {
        this.$router.push('/selectsite')
      }
    }
  }
}
</script>
<style scoped>
.Address {
  width: 100%;;
  height: 100%;
}
header {
    width: 100%;
    height: 7%;
    line-height: 55px;
    background-color: rgb(249, 250, 253);
    border-bottom: solid 1px #e0e0e0;
    position: fixed;
    top: 0;
}

header a {
    position: absolute;
    left: 10px;
}
header img {
  width: 40%;
}
i {
    color: #999;
}

h3 {
    display: inline-block;
    font-size: 18px;
    width: 100%;
    font-weight: bolder;
    color: #000;
    text-align: center;
}

header .save {
    position: absolute;
    right: 10px;
    top: 0;
}
.box {
    width: 100%;
    height: 85%;
    overflow: auto;
    background-color: #efefef;
    position: absolute;
    top: 7%
}

.now {
    height: 55px;
    background-color: #fff;
    width: 100%;
    line-height: 55px;
    text-align: center;
    font-size: 16px;
}

.now img {
    height: 45%;
    position: relative;
    top: 8px
}

#container {
    width: 100%;
    height: 40%;
}

.addressMsg {
    height: 100px;
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    position: relative;
    font-size: 16px;
}
.selectedAdd {
    width: 5px;
    height: 80%;
    background-color: #ffd600;
    position: absolute;
    left: 0;
    top: 10%
}
.user, .address {
    height: 30px;
    width: 60%;
    margin: 0;
    line-height: 30px;
    position: absolute;
    left: 25px;
    top: 15px;
}

.address {
    top: 55px;
    color: #999;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 50%;
}

.edit {
    width: 30%;
    height: 80%;
    margin: 0;
    border-left: solid 1px #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 30px;
    top: 10px;
}

.empty {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 8%;
    background: #efefef
}
.del {
    height: 8%;
    width: 100%;
    background-color: #fff;
    position: relative;
    margin-top: 10px
}

.del p {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 70%;
    height: 80%;
    background-color: darkgoldenrod;
    color: #fff;
    font-size: 16px;
    border-radius: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bottom {
    position: fixed;
    bottom: 0;
    height: 8%;
    width: 100%;
    background-color: #fff;
}

.bottom p {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 70%;
    height: 80%;
    background-color: #ffd600;
    color: #000;
    font-size: 16px;
    border-radius: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}
table {
    width: 100%;
}

table tr {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
}

table tr td:first-of-type {
    padding-left: 20px;
    width: 30%;
}

table tr td:last-of-type {
    position: relative;
    width: 70%;
}

table tr td:last-of-type input {
    border: 0;
    outline: none;
    width: 100%;
    text-indent: 10px
}
.city {
  float: right;
}
table tr td select {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5%;
    width: 15%;
    border: 0;
    opacity: 0;
}

.select {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 20px;
    border: solid 1px #efefef;
    border-radius: 2em;
    position: relative;
    top: 5px;
    left: -8px;
}

.select img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
}

table tr td p {
    margin: 0;
    width: 60%;
    display: inline-block;
    font-size: 14px;
    text-indent: 10px
}

</style>

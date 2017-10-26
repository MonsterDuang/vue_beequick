<template>
  <div class="Search">
    <p id="form">
      <a @click="back" class="back"><img src="../assets/img/turuL.png" alt=""></a>
      <input type="text" placeholder="请输入商品名称">
      <a href="">搜 索</a>
    </p>
    <div id="rem">
        <p>热门搜索 :</p>
        <a href="">芒果</a>
        <a href="">水果</a>
        <a href="">火龙果</a>
        <a href="">三七女人节</a>
        <a href="">香烟</a>
        <a href="">酒</a>
        <a href="">燕塘</a>
        <a href="">奇异果</a>
        <a href="">奶</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
.Search{
  width: 100%;
  height: 100%;
}
#form {
  height: 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
  background-color: rgb(249, 250, 253);
  margin-bottom: 0;
}
.back img{
  height: 50%;
  width: 50%;
}
#form input {
  width: 70%;
  height: 33px;
  outline: none;
  border: 1px solid #ccc;
  text-indent: 26px;
  background: url("../assets/img/fdj.gif") no-repeat 5px 6px;
  background-size: 20px 20px;
}

#form a {
  color: rgb(117, 117, 117);
}

#rem {
  height: 100%;
  width: 100%;
  background: #efefef;
  padding: 40px;
}

#rem p {
  color: rgb(117, 117, 117);
}

#rem a {
  display: inline-block;
  background: #fff;
  border-radius: 2em;
  padding: 5px 10px;
  text-align: center;
  margin: 10px;
  color: rgb(117, 117, 117);
}
</style>

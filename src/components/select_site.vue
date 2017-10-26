<template>
  <div class="Map">
    <p id="form">
      <a @click="back" class="back"><img src="../assets/img/turuL.png" alt=""></a>
      <input type="text" placeholder="请输入地址"  @input="bindsearch()">
    </p>
    <!--百度地图容器-->
    <div style="width:100%;height:50%;border:#ccc solid 1px;font-size:12px" id="map"></div>
    <!-- 候选地址列表 -->
    <div class="pois-list">
      <ul>
        <li class="spline-bottom" v-for="(item, index) in places" :key="item.uid" @click="changeSite(item)">
          <p class="pois-item-name">{{item.name}}</p>
          <p class="theme-font-gray">{{item.address}}</p>
        </li>
      </ul>
    </div>
    <!-- 根据搜索框内容变化而生成的列表 -->
    <div class="sug-list" v-show="searchPlaces.length>0">
      <ul>
        <li v-for="(item, index) in searchPlaces" :key="item.uid" @click="changeSite(item)">
          <p class="pois-item-name">{{item.name}}</p>
          <p class="theme-font-gray">{{item.city}}{{item.district}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  mounted () {
    /* eslint-disable */
    let _this = this
    //创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(_this.location.lng,_this.location.lat),15);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
      var markers = [
        {content:"",title:"",imageOffset: {width:-46,height:-21},position:{lat:_this.location.lat,lng:_this.location.lng}}
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);
        addClickHandler(marker,infoWindow);
        map.addOverlay(marker);
      };
    }
    //向地图添加控件
    function addMapControl(){
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,type:3});
      map.addControl(navControl);
    }
    var map;

    this.city = this.$store.state.selectedCity
    this.site = this.$store.state.selectedSite
    this.location = this.$store.state.location
    if (this.site === '') {
      // 默认值
      this.city = '深圳市'
      this.site = '洪浪北地铁站'
      this.location = {
        lat: 22.580814,
        lng: 113.917161
      }
    }
    // 拼接路径并发请求获取关键字对应的地址列表
    // 百度地图文档地址：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
    let placeApi = `http://api.map.baidu.com/place/v2/search?q=${this.site}&region=${this.city}&output=json&ak=w2goqOY1wNNxLzvQNuPEXnqYnwlPc66p`
    jsonp(placeApi, (err, data) => {
      if (!err) {
        // 地址列表
        this.places = data.results
        initMap()
      }
    })
  },
  data () {
    return {
      searchPlaces: [],
      places: [],
      city: '',
      location: {}
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    bindsearch () {
      let key = event.target.value
      let placeApi = `http://api.map.baidu.com/place/v2/suggestion?query=${key}&region=${this.selectedCity}&output=json&ak=w2goqOY1wNNxLzvQNuPEXnqYnwlPc66p`
      jsonp(placeApi, (err, data) => {
        if (!err) {
          this.searchPlaces = data.result
        }
      })
    },
    // 切换关键字
    changeSite (item) {
      this.$store.commit('CHAGNE_SITE', item.name)
      this.$store.commit('CHANGE_LOCATION', item.location)
      this.$router.go(-1)
    }
  },
  computed: {
    selectedCity () {
      return this.$store.state.selectedCity
    }
  }
}
</script>
<style scoped>
.Map{
  width: 100%;
  height: 100%;
}
#form {
  height: 7%;
  display: flex;
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
  width: 75%;
  height: 33px;
  outline: none;
  border: 1px solid #ccc;
  text-indent: 26px;
  background: url("../assets/img/fdj.gif") no-repeat 5px 6px;
  background-size: 20px 20px;
}

.pois-list{
  position: absolute;
  top: 57%;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left: 1.5rem;
  background-color: #fff;
  overflow-y: scroll;
}
.pois-list li {
  cursor: pointer;
  padding: .5rem 0;
  font-size: 18px;
  list-style: none;
}
.pois-list li:first-of-type .pois-item-name{
  color:#f40;
  padding-left: 1rem;
  background: url("../assets/img/pois.png") left bottom no-repeat;
  -webkit-background-size: auto 100%;
  background-size: auto 100%;
}
.pois-list li:first-of-type .theme-font-gray{
  padding-left: 1rem;
  color:#f40;
}
.sug-list{
  position: absolute;
  top: 7%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1.5rem;
  background-color: #fff;
  overflow-y: scroll;
}
.sug-list li {
  cursor: pointer;
  padding: .5rem 0;
  font-size: 16px;
  list-style: none;
}
.pois-item-name{
  line-height: 20px
}
.theme-font-gray {
  color: gray;
  font-size: 15px
}
</style>

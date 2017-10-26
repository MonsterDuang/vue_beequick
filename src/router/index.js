import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Cart from '@/components/cart'
import Category from '@/components/category'
import Mine from '@/components/mine'
import Search from '@/components/search'
import Detail from '@/components/product_detail'
import Address from '@/components/address'
import SelectSite from '@/components/select_site'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/cart',
      name: 'cart',
      component: Cart
    }, {
      path: '/category',
      name: 'category',
      component: Category
    }, {
      path: '/mine',
      name: 'mine',
      component: Mine
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/detail',
      name: 'detail',
      component: Detail
    }, {
      path: '/address',
      name: 'address',
      component: Address
    }, {
      path: '/selectsite',
      name: 'selectsite',
      component: SelectSite
    }
  ]
})

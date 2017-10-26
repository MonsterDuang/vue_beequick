export default {
  GET_HOMEDATA (state, data) {
    state.homePage = data
  },
  GET_CGRDATA (state, data) {
    state.categoryPage = data
  },
  GET_USERDATA (state, data) {
    state.userMsg = data
  },
  ADD_PRODUCT (state, item) {
    // 商品总数
    state.productCount++
    // 购物车动画
    state.cartActiveBol = true
    setTimeout(function () {
      state.cartActiveBol = false
    }, 300)
    // 判断购物车是否存在该商品
    if (state.cartProduct.indexOf(item) === -1) {
      item.pre_state++
      item.no_col = '1'
      state.cartProduct.push(item)
    } else {
      item.pre_state++
    }
  },
  SUB_PRODUCT (state, item) {
    state.cartActiveBol = true
    setTimeout(function () {
      state.cartActiveBol = false
    }, 300)
    item.pre_state--
    state.productCount--
    if (item.pre_state <= 0) {
      item.pre_state = 0
      state.cartProduct.splice(state.cartProduct.indexOf(item), 1)
    }
  },
  SELECT_ONE (state, index) {
    state.cartProduct[index].no_col = state.cartProduct[index].no_col === '1' ? '0' : '1'
    for (var i = 0; i < state.cartProduct.length; i++) {
      if (state.cartProduct[i].no_col === '0') {
        state.selectAllBol = false
        break
      } else {
        state.selectAllBol = true
      }
    }
  },
  SELECT_ALL (state) {
    state.selectAllBol = !state.selectAllBol
    if (state.selectAllBol) {
      for (var i = 0; i < state.cartProduct.length; i++) {
        state.cartProduct[i].no_col = '1'
      }
    } else {
      for (var j = 0; j < state.cartProduct.length; j++) {
        state.cartProduct[j].no_col = '0'
      }
    }
  },
  SAVE_USER (state, data) {
    state.userMsg.push(data)
  },
  EDITOR_SITE (state, item) {
    state.editorItem = item
  },
  CHANGE_ADDRESS (state, index) {
    state.nowAddIndex = index
  },
  CART_POS (state, cartPos) {
    state.cartPos = cartPos
  },
  DETAIL (state, item) {
    state.detail = item
  },
  CHANGE_CITY (state, city) {
    state.selectedCity = city
  },
  CHAGNE_SITE (state, name) {
    state.selectedSite = name
  },
  CHANGE_LOCATION (state, data) {
    state.location = data
  }
}

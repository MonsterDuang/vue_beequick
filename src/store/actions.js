import http from 'axios'
export default {
  getHomeData ({commit}) {
    return http.get('http://10.3.151.204:8081/homePage')
    .then((data) => {
      commit('GET_HOMEDATA', data.data)
      return data.data
    })
  },
  getCgrData ({commit}) {
    return http.get('http://10.3.151.204:8081/categoriesPage')
    .then((data) => {
      commit('GET_CGRDATA', data.data)
      return data.data
    })
  },
  getUserData ({commit}) {
    return http.get('http://10.3.151.204:8081/userAddress')
    .then((data) => {
      commit('GET_USERDATA', data.data)
      return data.data
    })
  },
  addProduct ({commit}, item) {
    commit('ADD_PRODUCT', item)
    return true
  },
  subProduct ({commit}, item) {
    commit('SUB_PRODUCT', item)
  },
  selectOne ({commit}, index) {
    commit('SELECT_ONE', index)
  },
  selectAll ({commit}) {
    commit('SELECT_ALL')
  },
  saveUser ({commit}, msg) {
    return http.post('http://10.3.151.204:8081/userAddress', msg)
    .then(res => {
      commit('SAVE_USER', res.data)
    })
  },
  editorSite ({commit}, item) {
    let userId = item.id
    return http.delete('http://10.3.151.204:8081/userAddress/' + userId)
    .then(res => {
      commit('EDITOR_SITE', item)
    })
  },
  changeAddress ({commit}, index) {
    commit('CHANGE_ADDRESS', index)
  },
  detail ({commit}, item) {
    commit('DETAIL', item)
  },
  changeCity ({commit}, city) {
    commit('CHANGE_CITY', city)
  }
}

import { createStore } from 'vuex'

export default createStore({
  state: {
    mbti: "",
    loginChk:false,
    loginToken:null,
    refreshToken:"",
    displayName:"",
    email: ""
  },
  getters: {
  },
  mutations: {
    loginState(state, payload) {
      state.displayName = payload.displayName
      state.loginToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      state.loginChk = true
    },
    loginToken(state, payload) {
      state.refreshToken = payload.refreshToken
      state.loginChk = true
      state.loginToken = payload.accessToken
    },
    userData(state,payload){
      state.email = payload.email
      state.displayName = payload.userName
      state.mbti = payload.mbti
    },
    logOutToken(state) {
      state.loginChk = false,
      state.loginToken = null,
      state.refreshToken = '',
      state.displayName = "",
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("displayName")
    },
  },
  actions: {
  },
  modules: {
  }
})

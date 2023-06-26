import { createStore } from 'vuex'

export default createStore({
  state: {
    mbti: "",
    loginChk:false,
    loginToken:"",
    refreshToken:""
  },
  getters: {
  },
  mutations: {
    loginToken(state, payload) {
      state.refreshToken = payload.refreshToken
      state.loginChk = true
      state.loginToken = payload.accessToken
    },
  },
  actions: {
  },
  modules: {
  }
})

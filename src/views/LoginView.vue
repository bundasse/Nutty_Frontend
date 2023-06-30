<template>
      <div class="pt-80 flex flex-col gap-y-5 w-96 mx-auto">
        <input type="email" placeholder="이메일 주소" v-model="email" class="py-3 px-5 border-[#a1a1a1] border">
        <input type="password" placeholder="비밀번호" v-model="password" class="py-3 px-5 border-[#a1a1a1] border" @keyup.enter="login">
        <button class="bg-amber-600 hover:bg-point text-white hover:bg-amber-500 text-2xl py-4 font-bold border-black border" @click="login">로그인</button>
  
  
        <div class="flex justify-between">
          <router-link to="/join">
            <p class="text-[#a6a6a6] text-xs">회원이 아니신가요?</p>
          </router-link>
        </div>
      </div>
  </template>
  
  <script>
  import axios from 'axios';
  import store from '@/store/index.js';
  export default {
    name: "LoginView",
    data() {
      return {
        userdata: [],
        email: "",
        password: "",
        modal: false,
        userEmail: ""
      }
    },
    methods: {
      login() {
        if (this.email === "") {
          alert("이메일을 입력해주세요");
          return false
        }
        else if (this.password === "") {
          alert("비밀번호를 입력해주세요");
          return false;
        }
        else{
          axios.post(`http://175.45.205.235:8080/v1/api/login`,{
            "email":this.email,
            "password":this.password
            }).then((user) => {
              localStorage.setItem("refreshToken", user.data.refreshToken)
              localStorage.setItem("accessToken", user.data.accessToken)
              if (user.data.refreshToken) {
                store.commit("loginToken", { refreshToken: user.data.refreshToken, loginToken: user.data.accessToken })
              }
              axios.get(`http://175.45.205.235:8080/v1/api/info`,{
                headers: {'ACCESS_TOKEN' : user.data.accessToken, 'REFRESH_TOKEN' : user.data.refreshToken}
                  }).then((u) => {
                    console.log(u.data)
                store.commit("userData", { email: u.data.email, mbti: u.data.mbti, userName: u.data.userName})
                localStorage.setItem("displayName", u.data.userName)
                alert("로그인 성공")
                this.$router.push({path:'/'})
              })
            })
        }
      },
    },
  }
  </script>
  
  <style></style>
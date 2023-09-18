<template>
      <div class="pt-36 flex flex-col gap-y-5 w-96 mx-auto">
        <h2><img src="@/assets/logo.png" class="w-80 mx-auto mb-10"></h2>
        <input type="email" placeholder="이메일 주소" v-model="email" class="py-3 px-5 border-[#a1a1a1] border">
        <input type="password" placeholder="비밀번호" v-model="password" class="py-3 px-5 border-[#a1a1a1] border" @keyup.enter="login">
        <button class="bg-amber-500 hover:bg-point text-white hover:bg-amber-300 text-2xl py-4 font-bold border-black border" @click="login">로그인</button>
  
  
        <div class="flex justify-between">
          <router-link to="/home">
            <p class="text-[#a6a6a6] text-xs hover:underline">회원이 아니신가요?</p>
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
        else if(this.email === "nutty"&&this.password === "1111"){
            localStorage.setItem("refreshToken", 123456)
            localStorage.setItem("accessToken", 111111)
            store.commit("loginToken", { refreshToken: 123456, loginToken: 111111 })
            store.commit("userData", { email: "nutty", mbti: "F", userName: "너티"})
               localStorage.setItem("displayName", "너티")
               alert("로그인 성공")
               this.$router.push({path:'/'})
        // axios.post(`http://175.45.205.235:8080/v1/api/login`,{
        //   "email":this.email,
        //   "password":this.password
        //   }).then((user) => {
        //     localStorage.setItem("refreshToken", user.data.refreshToken)
        //     localStorage.setItem("accessToken", user.data.accessToken)
        //     if (user.data.refreshToken) {
        //       store.commit("loginToken", { refreshToken: user.data.refreshToken, loginToken: user.data.accessToken })
        //     }
        //     axios.get(`http://175.45.205.235:8080/v1/api/info`,{
        //       headers: {'ACCESS_TOKEN' : user.data.accessToken, 'REFRESH_TOKEN' : user.data.refreshToken}
        //         }).then((u) => {
        //           console.log(u.data)
        //       store.commit("userData", { email: u.data.email, mbti: u.data.mbti, userName: u.data.userName})
        //       localStorage.setItem("displayName", u.data.userName)
        //       alert("로그인 성공")
        //       this.$router.push({path:'/'})
        //     })
        //   })
        }else{
          alert("아이디와 비밀번호를 확인해주세요.")
        }
      },
    },
  }
  </script>
  
  <style></style>
<template>
      <div class="mt-20 flex flex-col gap-y-5 w-96 mx-auto">
        <input type="email" placeholder="이메일 주소" v-model="email" class="py-3 px-5 border-[#a1a1a1] border">
        <input type="password" placeholder="비밀번호" v-model="password" class="py-3 px-5 border-[#a1a1a1] border" @keyup.enter="login">
        <button class="bg-amber-600 hover:bg-point text-white hover:bg-amber-500 text-2xl py-4 font-bold border-black border" @click="login">로그인</button>
  
  
        <div class="flex justify-between">
          <p class="text-[#a6a6a6] text-xs cursor-pointer" @click="modal = true">아이디 / 비밀번호 찾기</p>
          <router-link to="/member">
            <p class="text-[#a6a6a6] text-xs">회원이 아니신가요?</p>
          </router-link>
        </div>
      </div>
      <!-- <div v-if="modal === true" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full flex justify-center items-center">
        <div class="w-64 h-72 rounded-lg bg-white flex justify-around items-center flex-col">
          <h4 class="p-2 text-lg">비밀번호 재설정</h4>
          <input type="email" class="border-2 rounded-md px-2 placeholder:text-xs" v-model="userEmail"
            placeholder="가입 시 입력한 이메일">
          <div class="flex w-full gap-2 justify-center">
            <button class="border rounded-md bg-yellow-100 text-white p-1 basis-4/12 hover:bg-amber-500 transition-all"
              @click="findPassword(this.userEmail); modal = false">제출</button>
            <button class="border rounded-md bg-yellow-100 text-white p-1 basis-4/12 hover:bg-amber-500 transition-all"
              @click="modal = false">취소</button>
          </div>
        </div>
      </div> -->
      <!-- axios.get(`http://175.45.205.235:8080/v1/api/info`,{
            "email":this.email,
            "password":this.password
            }).then(function(user){
              store.commit("userData", { email: user.data.email, mbti: user.data.mbti, userName: user.data.userName})
            }) -->
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
        if (!this.email) {
          alert("이메일을 입력해주세요");
          return false
        }
        else if (!this.password) {
          alert("비밀번호를 입력해주세요");
          return false;
        }
        else if (this.email && this.password) {
          axios.post(`http://175.45.205.235:8080/v1/api/login`,{
            "email":this.email,
            "password":this.password
            }).then(function(user){
              localStorage.setItem("refreshToken", user.data.refreshToken)
              if (user.data.refreshToken) {
                store.commit("loginToken", { refreshToken: user.data.refreshToken, loginToken: user.data.accessToken })
              }
              alert("로그인 성공")
              this.$router.push('/') 
              }).catch((error)=>{console.log(error)})
        }
      },
    },
  }
  </script>
  
  <style></style>
<template>
    <section>
      <div class="bg-vege-600 w-full flex flex-col justify-center items-center">
        <h2 class=" font-bold text-2xl sm:text-4xl relative pt-20 pb-4 text-white">Login<span
            class="w-20 h-[2px] bg-white absolute bottom-0 left-1/2 -translate-x-1/2 inline-block"></span>
        </h2>
        <p class="py-2 text-white">로그인</p>
        <p class="px-20 pb-20 text-mayo">로그인 페이지
        </p>
      </div>
      <div class="mt-20 flex flex-col gap-y-5 w-96 mx-auto">
        <input type="email" placeholder="이메일 주소" v-model="email" class="py-3 px-5 border-[#a1a1a1] border">
        <input type="password" placeholder="비밀번호" v-model="password" class="py-3 px-5 border-[#a1a1a1] border" @keyup.enter="login">
        <button class="bg-vege-400 hover:bg-point text-white hover:opacity-80 hover:duration-300 text-2xl py-4 font-bold border-black border" @click="login">로그인</button>
  
  
        <div class="flex justify-between">
          <p class="text-[#a6a6a6] text-xs cursor-pointer" @click="modal = true">아이디 / 비밀번호 찾기</p>
          <router-link to="/member">
            <p class="text-[#a6a6a6] text-xs">회원이 아니신가요?</p>
          </router-link>
        </div>
      </div>
      <div v-if="modal"
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full flex justify-center items-center">
        <div class="w-64 h-72 rounded-lg bg-white flex justify-around items-center flex-col">
          <h4 class="p-2 text-lg">비밀번호 재설정</h4>
          <input type="email" class="border-2 rounded-md px-2 placeholder:text-xs" v-model="userEmail"
            placeholder="가입 시 입력한 이메일">
          <div class="flex w-full gap-2 justify-center">
            <button class="border rounded-md bg-vege-200 text-white p-1 basis-4/12 hover:bg-vege-400 transition-all"
              @click="findPassword(this.userEmail); modal = false">제출</button>
            <button class="border rounded-md bg-vege-200 text-white p-1 basis-4/12 hover:bg-vege-400 transition-all"
              @click="modal = false">취소</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    data() {
      return {
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
          auth.signInWithEmailAndPassword(this.email, this.password).then(((user) => {
            localStorage.setItem("refreshToken", user.user.refreshToken)
            localStorage.setItem("displayName", user.user.displayName)
            if (user.user.refreshToken) {
              this.$store.commit("loginToken", { refreshToken: user.user.refreshToken, uid: user.user.uid })
            }
            this.$router.replace('/')
            window.scrollTo({ top: 0, behavior: 'auto' })
          }),
            ((error) => {
              alert(error.message)
            })
          )
        }
      },
      findPassword(email) {
        firebase.auth().sendPasswordResetEmail(email)
          .then((Res) => {
            Res
            alert('메일이 전송되었습니다.')
          })
          .catch((error) => {
            error
          })
      }
    },
  }
  </script>
  
  <style></style>
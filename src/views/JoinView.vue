<template>
  <section>
      <div class="mt-96 flex flex-col gap-y-5 w-96 mx-auto">
          <input type="text" placeholder="닉네임" v-model="nickname" class="py-3 px-5 border-[#a1a1a1] border">
          <input type="email" placeholder="이메일 주소" v-model="email" class="py-3 px-5 border-[#a1a1a1] border">
          <input type="password" placeholder="비밀번호" v-model="password" class="py-3 px-5 border-[#a1a1a1] border">
          <input type="password" placeholder="비밀번호 확인" v-model="passwordChk" class="py-3 px-5 border-[#a1a1a1] border">
          <div class="flex items-center gap-2 px-4 mt-5"><input type="checkbox" v-model="checked"><span class="text-xs">
                  이용 약관에 동의 해주세요</span></div>
          <button class="bg-amber-600 text-white hover:bg-amber-500 text-2xl py-4 font-bold border-black border" @click="signUp">회원가입</button>
          <router-link to="/login">
              <p class="text-[#a6a6a6] text-xs text-right">이미 회원계정이 있으신가요?</p>
          </router-link>
      </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: "JoinView",
  data() {
      return {
          email: "",
          mbti: this.$store.state.mbti,
          password: "",
          nickname: "",
          errorMsg: "",
          passwordChk: "",
          checked: false
      }
  },
  methods: {
      signUp() {
          const inputList = [this.nickname, this.email, this.password, this.passwordChk];
          const isInputEmpty = inputList.some(input => input === '');
          // input에 빈값체크
          if (this.checked) {
              if (this.password === this.passwordChk && this.password !== '') {
                axios.post(`http://175.45.205.235:8080/v1/api/signup`,{
                    "mbti": this.mbti,
                    "email": this.email,
                    "userName": this.userName,
                    "password": this.password
                }).then((result) => { result
                  }).catch(function(error) {console.log(error) })
                  this.$store.commit('UpdateDisplayName',  this.nickname)
                  localStorage.setItem("displayName", this.nickname)
                  alert("▶ 회원이 되신 것을 축하드립니다 ◀")
                  this.$router.push('/') 
                  
              } else if (this.password !== this.passwordChk) {
                  alert('비밀번호가 일치하지 않습니다.')
              } else if (isInputEmpty) {
                  alert('작성이 완료되지 않았습니다.')
              }
          }else{
              alert('이용약관에 동의해주세요')
          } 
      },
  }
}
</script>

<style lang="scss" scoped></style>
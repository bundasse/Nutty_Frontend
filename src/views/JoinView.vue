<template>
    <section>
        <div class="w-full min-h-screen h-full text-center font-bold text-lg bg-nutty flex items-center flex-wrap">
            <div class="basis-full">      
                <p>
                당신은 <span class="text-white">{{$store.state.mbti}}</span>타입 입니다.
                </p>
                <h2 class="text-9xl font-extrabold my-10">57%</h2>
                <p>NUTTY에서 {{$store.state.mbti}}인 사람은 이만큼 있어요!</p>
            </div>
        </div>
    </section>
    <section class="pt-80 flex flex-col gap-y-5 w-96 mx-auto">
        <div>
            <input type="text" placeholder="닉네임" v-model="nickname" class="py-3 px-5 border-[#a1a1a1] border">
            <button @click="userNameTest">중복확인</button>
            <span class="text-red-500" v-html="errorMsg"></span>
            <input type="email" placeholder="이메일 주소" v-model="email" class="py-3 px-5 border-[#a1a1a1] border">
            <input type="password" placeholder="비밀번호" v-model="password" class="py-3 px-5 border-[#a1a1a1] border">
            <input type="password" placeholder="비밀번호 확인" v-model="passwordChk" class="py-3 px-5 border-[#a1a1a1] border">
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
          checked: true
      }
  },
  mounted() {
    window.scrollTo({ top: 0 }) 
  },
  methods: {
    userNameTest(){
        axios.get(`http://175.45.205.235:8080/v1/api/signup/duplicate/${this.nickname}`).then(function(result){
            console.log(result)
            if(result=='1'){
                this.errorMsg = '중복된 닉네임입니다.'
                this.checked = false
            }else{
                this.errorMsg = ''
                this.checked = true
            }
})
    },
      signUp() {
          const inputList = [this.nickname, this.email, this.password, this.passwordChk];
          const isInputEmpty = inputList.some(input => input === '');
          // input에 빈값체크
          if (this.checked) {
              if (this.password === this.passwordChk && this.password !== '') {
                axios.post(`http://175.45.205.235:8080/v1/api/signup`,{
                    "mbti": this.mbti,
                    "email": this.email,
                    "userName": this.nickname,
                    "password": this.password
                }).then((result) => { result
                  }).catch(function(error) {console.log(error) })
                //   this.$store.commit('UpdateDisplayName',  this.nickname)
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
<template>
  <div class="w-full h-full min-h-screen relative">
      <!-- 문제영역 -->
      <div v-if="resultView === false" class="w-full min-w-screen">
          <section class="w-full min-h-screen h-full section flex flex-col pt-20 bg-nutty relative" v-for="(e,i) in dataList.QuizList" :key="i" :ref="'page-'+i">
            <p class="text-center z-20">문제 {{ i }} 번</p>
            <h3 class="text-5xl text-center mt-20 font-bold notoserif z-20" v-html="e.question"></h3>
            <ul>
              <li v-for="(el,index) in e.view" :key="index" @click="SelectValue(el, i)" :class="[index%2 === 0? 'left-0':'right-0']" class="absolute w-1/2 top-0 cursor-pointer h-full min-h-screen text-2xl text-center pt-96 hover:bg-nutty-light hover:font-semibold">
                <span :class="userSelect[i] === el.type? 'text-yellow-200 font-bold' : ''" class="notoserif block w-[320px] mx-auto text-center" v-html="el.text"></span>
              </li>
            </ul>
            <div v-if="i === 4" class="flex justify-center z-10 mt-80">
              <button @click="resultView = true" class=" my-10 px-5 py-3 text-center rounded bg-yellow-200 hover:bg-white">제 생각에 당신의 성향은요...</button>
            </div>
          </section>
      </div>
      <div v-else class="w-full min-h-screen h-full text-center font-bold text-lg bg-nutty flex items-center flex-wrap">
        <div class="basis-full">      
          <p>
            당신은 <span class="text-white">{{result}}</span>타입 입니다.
          </p>
          <h2 class="text-9xl font-extrabold my-10">57%</h2>
          <p>NUTTY에서 {{result}}인 사람은 이만큼 있어요!</p>
          <div class="w-full text-center mt-20">
            <router-link to="/join" @click="this.$store.state.mbti = result" class="hover:text-white">회원가입</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import QuizList from "../assets/QuizList.json"
export default {
    name:"TestPage",
    data() {
        return {
            dataList: QuizList,
            current: 0,
            userSelect: [],
            resultView: false,
        }
    },
    methods: {
      SelectValue(el,i){
        this.userSelect[i] = el.type
      },
    },
    computed:{
      result(){
        if(this.userSelect.filter(e => e === "F").length > 2 ){
          return "F"
        }else{
          return "T"
        }
      }
    },
}
</script>
<style>
</style>
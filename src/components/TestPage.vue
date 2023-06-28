<template>
<div class="w-screen h-full flex items-center justify-center flex-wrap">
      <!-- 문제영역 -->
      <div v-if="resultView === false" class="w-full min-w-screen">
        <div class="w-full min-h-screen h-full box-border bg-amber-500 flex items-center flex-wrap border relative" v-for="(e,index) in dataList.QuizList" :key="index">
          <p class="basis-full text-2xl text-center z-10" v-html="e.question"></p>
          <ul class="basis-full group">
            <li v-for="(e,index) in randomView[index]" :key="index" :class="[index%2 === 0? 'left-0':'right-0', selectedIndex !== index? 'blur-sm':'blur-0']" @mouseover="selectedIndex = index" @mouseleave="selectedIndex =null" class="absolute w-1/2 top-0 cursor-pointer h-full min-h-screen text-xl text-center pt-96 hover:bg-amber-300 transition-all duration-200">
              <span v-html="e[1].text"></span>
            </li>
          </ul>
          <div v-if="index === 4" class="basis-full flex justify-center z-10">
            <button @click="resultView = true" class=" my-10 p-5 text-center rounded border hover:bg-white">결과보기</button>
          </div>
        </div>
      </div>
      <div v-else class="basis-full bg-white rounded-lg my-10 p-10 text-center font-bold text-lg">
        <p>
          당신은 <span class="text-blue-500">{{result}}</span>타입 입니다.
        </p>
        <h2 class="text-9xl font-extrabold my-10">57%</h2>
        <p>NUTTY에서 {{result}}인 사람은 이만큼 있어요!</p>
        <router-link to="/join" @click="this.$store.state.mbti = result">회원가입</router-link>
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
            MaxCount:5,
            resultView: false,
            selectedIndex : null
        }
    },
    methods: {
    SelectValue(e){
      this.userSelect.push(e[1].type)
    },
    questionCount(){
      this.MaxCount = this.dataList.QuizList.length
    }
  },
  computed:{
    progress(){
      return Math.floor((this.current / Number(this.MaxCount))*100);
    },
    result(){
      if(this.userSelect.filter(e => e === "F").length > 2 ){
        return "F"
      }else{
        return "T"
      }
    },
    randomView(){
      return this.dataList.QuizList.map((e,index)=>{
        return Object.entries(this.dataList.QuizList[index].view).sort(()=> Math.random()-0.5)
      })
    }
  },
  created() {
    this.questionCount();
  },
}
</script>
<style lang="">
    
</style>
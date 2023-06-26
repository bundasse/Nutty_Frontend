<template>
<div class="w-full h-full flex items-center justify-center flex-wrap pt-28">
    <div class="mx-auto w-10/12 lg:w-7/12 flex items-center flex-wrap">
      <div class="h-5 bg-gray-300 basis-full relative rounded-lg">
        <div class="absolute rounded-lg h-5 bg-blue-500 transition-all duration-500" :style="{width: progress+'%'}"></div>
        <!-- 만약 현재 문제를 진행중이라면 x/전체 문제수 로 표시되고, 그게 아니라면 종료되었으므로 다른 메세지를 보여준다. -->
        <p v-if="current != Number(MaxCount)" class="absolute right-2 -top-5 text-xs">{{ current+1 }} / {{ MaxCount }}</p>
        <p v-else class="absolute right-2 -top-5 text-xs">종료</p>
        <p class="absolute right-2 top-0.5 text-xs">{{ progress+"%" }}</p>
      </div>
      <!-- 문제영역 -->
      <div v-if="current < Number(MaxCount)" class="basis-full bg-white rounded-lg my-10 p-10" >
        <p class="text-2xl text-center" v-html="this.dataList.QuizList[current].question"></p>
        <ul class="flex flex-wrap justify-between mt-10">
          <li v-for="(e,index) in randomView[current]" :key="index" class="cursor-pointer text-xl text-center font-bold px-5 py-20 basis-full lg:basis-[49%] rounded-lg border hover:bg-blue-500 transition-all duration-200 hover:text-white" @click="current++; SelectValue(e);">
            <span v-html="e[1].text"></span>
          </li>
        </ul>
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
            MaxCount:5
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
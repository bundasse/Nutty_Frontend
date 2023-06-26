<template>
<div class="w-full h-full flex items-center justify-center flex-wrap py-20">
    <div class="mx-auto w-10/12 lg:w-7/12 flex items-center flex-wrap">
      <div class="h-5 bg-gray-300 basis-full relative rounded-lg">
        <div class="absolute rounded-lg h-5 bg-blue-500 transition-all duration-500" :style="{width: progress+'%'}"></div>
        <!-- 만약 현재 문제를 진행중이라면 x/전체 문제수 로 표시되고, 그게 아니라면 종료되었으므로 다른 메세지를 보여준다. -->
        <p v-if="current != Number(MaxCount)" class="absolute right-2 -top-5 text-xs">{{ current+1 }} / {{ MaxCount }}</p>
        <p v-else class="absolute right-2 -top-5 text-xs">종료</p>
        <p class="absolute right-2 top-0.5 text-xs">{{ progress+"%" }}</p>
      </div>
      <!-- 문제영역 -->
      <div class="basis-full bg-white rounded-lg my-10 p-10" v-if="current < Number(MaxCount)">
        <p class="text-2xl text-center" v-html="this.dataList.QuizList[current].question"></p>
        <ul class="flex flex-wrap justify-between mt-10">
          <li v-for="(e,index) in randomView[current]" :key="index" class="cursor-pointer text-xl text-center font-bold px-5 py-20 basis-full lg:basis-[49%] rounded-lg border hover:bg-blue-500 transition-all duration-200 hover:text-white" @click="current++; SelectValue(e);">
            <span v-html="e[1].text"></span>
          </li>
        </ul>
      </div>
      <div class="basis-full bg-white rounded-lg my-10 p-10 text-center font-bold text-lg" v-else>
        <span class="text-blue-500">{{resultScore}}</span>개 맞았습니다! 당신의 점수는 <span class="text-blue-500">{{ resultScore100 }}</span>점 입니다.
        {{ userSelect }}
        <p class="mt-3">
          <router-link to="/" class="cursor-pointer font-bold px-3 py-1 text-sm rounded-lg mt-5 border hover:border-green-400 transition-all duration-100 hover:text-green-400">처음으로 돌아가기</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import QuizList from "../assets/QuizList.json"
export default {
    name: "JoinView",
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
      this.userSelect.push(e[1].type);
      console.log(this.userSelect)
    },
    questionCount(){
      this.MaxCount = this.dataList.QuizList.length
    }
  },
  computed:{
    progress(){
      return Math.floor((this.current / Number(this.MaxCount))*100);
    },
    resultScore(){
      return this.dataList.QuizList.filter((e,index)=>{
        return e.answer ===this.userSelect[index]
      }).length
    },
    resultScore100(){
      return Math.round((this.resultScore / Number(this.MaxCount))*100);
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
<style>
    
</style>
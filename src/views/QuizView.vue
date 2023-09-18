<template>
  <div class="w-full h-full min-h-screen relative">
      <!-- 문제영역 -->
      <div class="w-full min-w-screen">
          <section class="w-full min-h-screen h-full section flex flex-col pt-20 bg-nutty relative">
            <h3 class="text-5xl text-center mt-12 font-bold notoserif z-20">누가 더 마음에 들어?</h3>
            <ul>
              <li v-for="(e,index) in view" :key="index" @click="this.userSelect = e.type" :class="[index%2 === 0? 'left-0':'right-0', userSelect === e.type? 'bg-nutty-light font-bold' : '']" class="absolute w-1/2 top-0 cursor-pointer h-full min-h-screen text-2xl text-center pt-52 hover:bg-nutty-light hover:font-semibold">
              <img class="mx-auto" :src="index%2 ===0? require(`@/assets/natty.png`):require(`@/assets/naff.png`)" alt="">
              <h4 class="my-10 text-6xl">{{e.name}}</h4>
                <span class="block w-[320px] mx-auto mb-5" :class="index%2 === 0? 'text-left':'text-right'" v-html="e.desc"></span>
                <span class="notoserif text-base block w-[320px] mx-auto text-center" v-html="e.say"></span>
              </li>
            </ul>
          </section>
      </div>
  </div>
</template>
<script>
export default {
    name:'QuizView',
    data() {
        return {
            dataList: [],
            view:[
                {name:"나프",desc:"리액션을 많이 하다보니 꼬리가 느낌표로 변했다!",say:"와! 너도 글 쓰는 거 좋아하나봐!<br>같이 너티하자!",type:"T"},
                    {name:"나티",desc:"질문을 많이 하다 보니 꼬리가 물음표로 변했다!",say:"다른 사람의 글을 읽고,<br>내 글을 남기고 싶어서 여기로 왔어.",type:"F"}
                ],
            current: 0,
            userSelect: ""
        }
    },
}
</script>
<style>
    
</style>
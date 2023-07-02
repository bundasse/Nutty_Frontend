<template>
    <ul class="max-w-5xl mx-auto flex gap-x-3 mt-20">
        <li class="px-4 py-2 rounded-lg border shadow-sm cursor-pointer" :class="e.tag ===this.category && 'text-nutty'" v-for="e in catelist" :key="e" @click="category = e.tag">{{ e.name }}</li>
    </ul>
    <div class="w-full">
        <swiper
        :slidesPerView="3.5"
        :spaceBetween="50"
        :pagination="{
        clickable: true,
        }"
        :modules="modules"
        class="mySwiper">
        <swiper-slide v-for="(e,i) in datalist" :key="i" class="border rounded-md p-5 my-10 shadow-md">
            <router-link :to="{ path: '/board/read' , query:{noticeId : e.noticeId}}" @click="$store.commit('boardRead',e.noticeId)">
                <span>{{ i+1 }}위</span>
                <h4 class="font-bold text-3xl">{{ e.title }}</h4>
                <p class="line-clamp-4">{{ e.description }}</p>
                {{ e.noticeId }}
            </router-link>
        </swiper-slide>
    </swiper>
    </div>
    <div class="max-w-5xl mx-auto mt-20">
        <div class="w-full">
            <ul class="flex flex-col gap-5">
                <li v-for="(e,i) in contentList" :key="i" class="border rounded-md shadow-md">
                    <router-link :to="{ path: '/board/read' , query:{noticeId : e.noticeId}}" @click="$store.commit('boardRead',e.noticeId)" class="p-5">
                        <h4 class="font-bold text-3xl ">
                            {{ e.title }}
                        </h4>
                        <p class="line-clamp-4">
                            {{ e.description }}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
 import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';
import axios from 'axios'
export default {
    name:"BoardList",
    data() {
        return {
            catelist:[
                {name: 'SF/판타지', tag:'fantasy'},{name:'호러/스릴러',tag:'horror'},{name:'로맨스',tag:'romance'},{name:'자유',tag:'free'}],
            category:'',
            datalist : [],
            contentList : []
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Pagination],
      }
    },
    mounted() {
        axios.get('http://175.45.205.235:8080/v1/api/notice/main').then((res)=>{
            this.contentList = res.data
            this.datalist = res.data.slice(0,9)
        })
    },
}
</script>
<style>
    .swiper-pagination-bullet-active {
  background: #fff;
}
</style>
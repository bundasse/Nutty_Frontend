<template>
    <ul class="max-w-5xl mx-auto flex gap-x-3 mt-20">
        <li class="p-3 rounded-xl border shadow-sm cursor-pointer font-bold" :class="e.tag ===this.category && 'text-nutty'" v-for="e in catelist" :key="e" @click="selectCategory">{{ e.name }}</li>
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
                <h4 class="font-bold text-3xl mb-5">{{ e.title }}</h4>
                <p class="line-clamp-4 mb-5">{{ e.description }}</p>
                <ul class="text-gray-400 flex text-sm justify-between">
                    <li class="basis-8/12">{{ e.writer }} · {{ e.createDate }}</li>
                    <li><img :src="require(`@/assets/icon_view.png`)" class="w-4 opacity-40 inline-block" alt="조회 수"> 33</li>
                    <li><img :src="require(`@/assets/icon_comment.png`)" class="w-4 opacity-40 inline-block" alt="댓글 수"> {{ e.commentList.length }}</li>
                    <li><img :src="require(`@/assets/icon_like.png`)" class="w-4 opacity-40 inline-block" alt="좋아요 수"> 0</li>
                </ul>
            </router-link>
        </swiper-slide>
    </swiper>
    </div>
    <div class="max-w-5xl mx-auto mt-20">
        <div class="w-full">
            <ul class="flex flex-col gap-5">
                <li v-for="(e,i) in contentList" :key="i" class="border rounded-md shadow-md p-5">
                    <router-link :to="{ path: '/board/read' , query:{noticeId : e.noticeId}}" @click="$store.commit('boardRead',e.noticeId)">
                        <h4 class="font-bold text-3xl">
                            {{ e.title }}
                        </h4>
                        <p class="line-clamp-4 my-5">
                            {{ e.description }}
                        </p>
                        <ul class="text-gray-400 text-sm flex gap-x-5">
                            <li>{{ e.writer }} · {{ e.createDate }}</li>
                            <li><img :src="require(`@/assets/icon_view.png`)" class="w-4 opacity-40 inline-block" alt="조회 수"> 33</li>
                            <li><img :src="require(`@/assets/icon_comment.png`)" class="w-4 opacity-40 inline-block" alt="댓글 수"> {{ e.commentList.length }}</li>
                        </ul>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
 import BoardList from "@/assets/BoardList.json";
 import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper';
// import axios from 'axios'
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
    methods: {
        SelectCategory(){

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
    // mounted() {
    //     axios.get('http://175.45.205.235:8080/v1/api/notice/main').then((res)=>{
    //         this.contentList = res.data
    //         this.datalist = res.data.slice(0,9)
    //     })
    // },
    mounted() {
            this.contentList = BoardList.BoardList;
            this.datalist = BoardList.BoardList.slice(0,10);
    },
}
</script>
<style>
    .swiper-pagination-bullet-active {
  background: #FFB321;
}
</style>
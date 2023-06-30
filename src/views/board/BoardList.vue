<template>
    <div class="max-w-7xl mx-auto">
        <div  class="w-full">
            <swiper
            :slidesPerView="3"
            :spaceBetween="30"
            :pagination="{
            clickable: true,
            }"
            :modules="modules"
            class="mySwiper">
            <swiper-slide v-for="(e,i) in datalist" :key="i" class="border rounded-md p-5 shadow-md">
                <span>{{ i+1 }}위</span>
                <h4 class="font-bold text-3xl">{{ e.title }}</h4>
                <p class="line-clamp-3">{{ e.description }}</p>
            </swiper-slide>
        </swiper>
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
            datalist : [{noticeId:3, title:'제목',description:'내용'},{noticeId:4, title:'제목',description:'내용'},{noticeId:5, title:'제목',description:'내용'},{noticeId:3, title:'제목',description:'내용'},{noticeId:3, title:'제목',description:'내용'},{noticeId:3, title:'제목',description:'내용'}]
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
        axios.get('http://175.45.205.235:8080/v1/api/notice/main').then(function(data){
            console.log(data.data)
            // this.datalist = data.data;
        })
    },
}
</script>
<style>
    .swiper-pagination-bullet-active {
  background: #fff;
}
</style>
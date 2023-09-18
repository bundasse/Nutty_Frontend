<template>
    <section class="w-full h-full min-h-screen pt-32 box-border">
      <h2><img src="@/assets/logo_yellow.png" class="w-96 mx-auto"></h2>
        <p class="text-nutty-dark text-center text-lg font-semibold">
            Nutty는 MBTI(T/F) 성격에 따라 취향에 맞는 글을 추천해주고,<br/>
            주제와 관련된 짧은 글을 올릴 수 있는 글쓰기 서비스 입니다.
        </p>
        <p class="text-center text-nutty-dark text-lg mt-20 font-semibold">인기 top 10</p>
        <div class="w-full mt-5">
            <swiper
            :slidesPerView="3.5"
            :spaceBetween="50"
            :modules="modules"
            :autoplay="{
              delay: 2500,
              pauseOnMouseEnter:true
            }"
            class="mySwiper">
            <swiper-slide v-for="(e,i) in datalist" :key="i" class="border rounded-md shadow-md p-5">
                <router-link :to="{ path: '/board/read' , query:{noticeId : e.noticeId}}" @click="$store.commit('boardRead',e.noticeId)">
                    <span>{{ i+1 }}위</span>
                    <h4 class="font-bold text-3xl">{{ e.title }}</h4>
                    <p class="line-clamp-4 mt-5">{{ e.description }}</p>
                </router-link>
            </swiper-slide>
        </swiper>
        </div>
    </section>
    <div class="min-h-screen h-full box-border">
        <BoardWrite />
    </div>
</template>
<script>
 import BoardList from "@/assets/BoardList.json";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper';
// import axios from 'axios';
import BoardWrite from '@/views/board/BoardWrite.vue'
export default {
    name:'MainView',
    data() {
        return {
            datalist:[],
            inMove: false,
      inMoveDelay: 400,
      activeSection: 0,
      offsets: [],
      touchStartY: 0
        }
    },
    components: {
      Swiper,
      SwiperSlide,
      BoardWrite
    },
    methods: {
        calculateSectionOffsets() {
      let sections = document.getElementsByTagName('section');
      let length = sections.length;
      
      for(let i = 0; i < length; i++) {
        let sectionOffset = sections[i].offsetTop;
        this.offsets.push(sectionOffset);
      }
    },
    /**
     * Handle the 'mousewheel' event for other browsers
     */
    handleMouseWheel: function(e) {
      
      if (e.wheelDelta < 30 && !this.inMove) {
        this.moveUp();
      } else if (e.wheelDelta > 30 && !this.inMove) {
        this.moveDown();
      }
        
      e.preventDefault();
      return false;
    },
    /**
     * Handle the 'DOMMouseScroll' event for Firefox
     */
    handleMouseWheelDOM: function(e) {
      
      if (e.detail > 0 && !this.inMove) {
        this.moveUp();
      } else if (e.detail < 0 && !this.inMove) {
        this.moveDown();
      }
      
      return false;
    },
    /**
     * Move to the previous section or the last section if you're on the first section
     */
    moveDown() {
      this.inMove = true;
      this.activeSection--;
        
      if(this.activeSection < 0) this.activeSection = 0;
        
      this.scrollToSection(this.activeSection, true);
    },
    /**
     * Move to the next section or the first section if you're on the last section
     */
    moveUp() {
      this.inMove = true;
      this.activeSection++;
        
      if(this.activeSection > this.offsets.length - 1) this.activeSection = this.offsets.length -1;
        
      this.scrollToSection(this.activeSection, true);
    },
    /**
     * Scrolls to the passed section id if the section exists and the delay is over
     */
    scrollToSection(id, force = false) {
      if(this.inMove && !force) return false;
      
      this.activeSection = id;
      this.inMove = true;
      
      // get section and scroll into view if it exists
      let section = document.getElementsByTagName('section')[id];
      if(section) {
        document.getElementsByTagName('section')[id].scrollIntoView({behavior: 'smooth'});
      }
      
      setTimeout(() => {
        this.inMove = false;
      }, this.inMoveDelay);
      
    },
    /**
     * Handles the 'touchstart' event on mobile devices
     */
    touchStart(e) {
      e.preventDefault();
      
      this.touchStartY = e.touches[0].clientY;
    },
    /**
     * Handles the 'touchmove' event on mobile devices
     */
    touchMove(e) {
      if(this.inMove) return false;
      e.preventDefault();
      
      const currentY = e.touches[0].clientY;
      
      if(this.touchStartY < currentY) {
        this.moveDown();
      } else {
        this.moveUp();
      }
      
      this.touchStartY = 0;
      return false;
    }
    },
    setup() {
      return {
        modules: [Pagination],
      }
    },
    mounted() {
        // axios.get('http://175.45.205.235:8080/v1/api/notice/main').then((res)=>{
        //     this.datalist = res.data.slice(0,9)
        // })
        this.datalist = BoardList.BoardList.slice(0,10)
        this.calculateSectionOffsets();
        
        window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM);  // Mozilla Firefox
        window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }); // Other browsers
        
        window.addEventListener('touchstart', this.touchStart, { passive: false }); // mobile devices
        window.addEventListener('touchmove', this.touchMove, { passive: false }); // mobile devices
    },
  unmounted() {
    window.removeEventListener('DOMMouseScroll', this.handleMouseWheelDOM); // Mozilla Firefox
    window.removeEventListener('mousewheel', this.handleMouseWheel, { passive: false });  // Other browsers
    
    window.removeEventListener('touchstart', this.touchStart); // mobile devices
    window.removeEventListener('touchmove', this.touchMove); // mobile devices
  }
}
</script>
<style>
    
</style>
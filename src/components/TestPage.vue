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
        <ul class="sections-menu fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 items-center">
          <li class="rounded-full bg-white menu-point" v-for="(offset, ind) in offsets" :key="ind" :class="activeSection == ind? 'w-6 h-6 opacity-100' : 'w-3 h-3 opacity-80'" @click="scrollToSection(ind)" v-title="'Go to section ' + (ind+1)"></li>
        </ul> 
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
            inMove: false,
            inMoveDelay: 400,
            activeSection: 0,
            offsets: [],
            touchStartY: 0
        }
    },
    methods: {
      SelectValue(el,i){
        this.userSelect[i] = el.type
      },
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
      // onScroll(){
      //       if(this.ArrayList['page-0'].getBoundingClientRect().top -100 >= 0){
      //           this.nowIndex = 0;
      //       }else if(this.ArrayList['page-1'].getBoundingClientRect().top -100 >= 0){
      //           this.nowIndex = 1;
      //       }else if(this.ArrayList['page-2'].getBoundingClientRect().top -100 >= 0){
      //           this.nowIndex = 2;
      //       }else if(this.ArrayList['page-3'].getBoundingClientRect().top -100 >= 0){
      //           this.nowIndex = 3;
      //       }else{
      //           this.nowIndex = 4;
      //       }
      //   }
    computed:{
      result(){
        if(this.userSelect.filter(e => e === "F").length > 2 ){
          return "F"
        }else{
          return "T"
        }
      }
    },
    mounted() {
      this.calculateSectionOffsets();
    
    window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM);  // Mozilla Firefox
    window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }); // Other browsers
    
    window.addEventListener('touchstart', this.touchStart, { passive: false }); // mobile devices
    window.addEventListener('touchmove', this.touchMove, { passive: false }); // mobile devices
  },
  /**
   * destroyed() hook executes on page destroy and removes all registered event listeners
   */
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
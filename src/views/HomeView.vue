<template>
  <section class="w-full h-full min-h-screen pt-32 bg-nutty">
    <h2 class="text-9xl font-bold text-center">NUTTY?</h2>
    <p class="text-xl text-center w-30 mt-20">너티는<br/>솰라솰라<br/>이렇고저런<br/>재미있는<br/>서비스입니다.</p>
  </section>
  <div v-if="this.$route.path === '/' && this.$store.state.loginToken === null" class="min-h-screen h-full box-border bg-nutty">
    <TestPage/>
    <ul class="sections-menu fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 items-center">
      <li class="rounded-full bg-white menu-point" v-for="(offset, ind) in offsets" :key="ind" :class="activeSection == ind? 'w-6 h-6 opacity-100' : 'w-3 h-3 opacity-80'" @click="scrollToSection(ind)" v-title="'Go to section ' + (ind+1)"></li>
    </ul> 
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

import TestPage from '@/components/TestPage.vue'
export default {
  name: 'HomeView',
  data() {
    return {
      inMove: false,
            inMoveDelay: 400,
            activeSection: 0,
            offsets: [],
            touchStartY: 0
    }
  },
  components: {
    TestPage
  },methods: {
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

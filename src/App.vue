<template>
  <div class="min-h-screen h-full box-border">
    <NavPage />
    <router-view/>
  </div>
</template>
<script>
import NavPage from '@/components/NavPage.vue'
export default {
  name:"MainHome",
  components:{
    NavPage
  }
}
</script>
<style lang="">
  
</style>

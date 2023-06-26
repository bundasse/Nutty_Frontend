<template>
  <div class="min-h-screen h-full box-border">
    <NavPage />
    <router-view/>
  </div>
  <div class="min-h-screen h-full box-border">
    <TestPage/>
  </div>
</template>
<script>
import NavPage from '@/components/NavPage.vue'
import TestPage from '@/components/TestPage.vue'
export default {
  name:"MainHome",
  components:{
    NavPage,
    TestPage
  }
}
</script>
<style>
  
</style>

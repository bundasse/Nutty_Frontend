<template>
  <div class="min-h-screen h-full box-border">
    <NavPage />
    <router-view/>
  </div>
  <div class="min-h-screen h-full box-border">
    <JoinView/>
  </div>
</template>
<script>
import NavPage from '@/components/NavPage.vue'
import JoinView from '@/views/JoinView.vue'
export default {
  name:"MainHome",
  components:{
    NavPage,
    JoinView
  }
}
</script>
<style lang="">
  
</style>

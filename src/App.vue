<template>
  <div class="min-h-screen h-full box-border">
    <NavPage />
    <router-view/>
  </div>
</template>
<script>
import NavPage from '@/components/NavPage.vue'
// import axios from 'axios'
export default {
  name:"MainHome",
  data() {
    return {
      displayName: localStorage.getItem("displayName"),
      refreshToken: localStorage.getItem("refreshToken"),
      accessToken: localStorage.getItem("accessToken")
    }
  },
  mounted() {
    if (localStorage.getItem("refreshToken")) {
      this.$store.commit('loginState', { displayName: this.displayName, refreshToken: this.refreshToken, accessToken: this.accessToken })
    }
  },
  components:{
    NavPage,

  }
}
</script>
<style>
  
</style>

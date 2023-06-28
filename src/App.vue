<template>
  <div class="min-h-screen h-full box-border bg-amber-500">
    <NavPage />
    <router-view/>
  </div>
  <div v-if="this.$route.path === '/' && this.$store.state.loginToken === null" class="min-h-screen h-full box-border">
    <TestPage/>
  </div>
</template>
<script>
import NavPage from '@/components/NavPage.vue'
import TestPage from '@/components/TestPage.vue'
import axios from 'axios'
export default {
  name:"MainHome",
  data() {
    return {
      displayName: localStorage.getItem("displayName"),
      refreshToken: localStorage.getItem("refreshToken")
    }
  },
  mounted() {
    if (localStorage.getItem("refreshToken")) {
      this.$store.commit('loginState', { displayName: this.displayName, refreshToken: this.refreshToken })
      axios.get(`http://175.45.205.235:8080/v1/api/info`)
    }
  },
  components:{
    NavPage,
    TestPage
  }
}
</script>
<style>
  
</style>

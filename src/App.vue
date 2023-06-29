<template>
  <div class="min-h-screen h-full box-border bg-nutty">
    <NavPage />
    <router-view/>
  </div>

</template>
<script>
import NavPage from '@/components/NavPage.vue'
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

  }
}
</script>
<style>
  
</style>

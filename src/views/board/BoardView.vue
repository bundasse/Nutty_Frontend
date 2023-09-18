<template>
    <div class="mt-20">
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

export default {
    name: "BoardView",
    data() {
        return {
            datalist:
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
        // axios.get('http://175.45.205.235:8080/v1/api/notice/main').then((res)=>{
        //     this.contentList = res.data
        //     this.datalist = res.data.slice(0,9)
        // })
    },
}
</script>
<style>
    
</style>
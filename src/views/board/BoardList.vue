<template>
    <div>
        1234
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"BoardList",
    data() {
        return {
            datalist : []
        }
    },
    mounted() {
        axios.get('http://175.45.205.235:8080/v1/api/notice/main').then(function(data){console.log(data.data) })
    },
}
</script>
<style lang="">
    
</style>
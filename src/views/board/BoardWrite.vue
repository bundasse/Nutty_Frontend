<template>
    <div>
        <div class="max-w-7xl mx-auto flex justify-between">
            <ul class="flex gap-x-3">
                <li class="basis-10 h-10 rounded-sm border" :class="e ===this.category && 'bg-nutty'" v-for="e in catelist" :key="e" @click="category = e">{{ e }}</li>
            </ul>
            <button @click="write">작성 완료</button>
        </div>
        <div class="max-w-7xl mx-auto">
            <input type="text" v-model="title" class="w-full border-b-2">
            <textarea name="" id="" v-model="description" class="w-full h-[500px]" placeholder="마음껏 써봐!"></textarea>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "BoardWrite",
    data() {
        return {
            catelist:['fantasy', 'horror', 'romance', 'free'],
            category:'',
            title:'',
            description: ''
        }
    },
    methods: {
        write(){
            if(this.category === ''){
                alert('장르를 선택해 주세요.')
            }else if(this.title === '' || this.description === ''){
                alert('제목과 내용이 입력되지 않았습니다.')
            }else{
                const today = new Date()
                const data = {
                    "category": this.category,
                    "title": this.title,
                    "description": this.description,
                    "createDate": today}
                    console.log(data)
                //게시물 데이터를 data에 담는다
                //axios.post('주소',data,{header에 보낼거})
                axios.post('http://175.45.205.235:8080/v1/api/notice', JSON.stringify(data),
                    {headers: 
                        {
                            "ACCESS_TOKEN" : this.$store.state.loginToken,
                            "REFRESH_TOKEN" :  this.$store.state.refreshToken
                        }
                    }
            ).then(this.$router.push('/board')).catch((error)=>{console.log(error)})
            }
        }
    },
}
</script>
<style>
</style>
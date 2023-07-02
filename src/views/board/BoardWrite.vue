<template>
    <section class="w-full h-full min-h-screen">
        <div class="max-w-7xl mx-auto flex justify-between pt-20 mb-5">
            <ul class="flex gap-x-3">
                <li class="px-4 py-2 rounded-lg cursor-pointer border shadow-sm" :class="e.tag ===this.category && 'text-nutty'" v-for="e in catelist" :key="e" @click="category = e.tag">{{ e.name }}</li>
            </ul>
            <button class="px-4 py-2 rounded-lg cursor-pointer border shadow-sm bg-[#DBFF00]" @click="write">작성 완료</button>
        </div>
        <div class="max-w-7xl mx-auto border shadow-md rounded-lg p-5">
            <input type="text" v-model="title" class="w-full border-b-2 text-3xl font-bold pb-5" placeholder="제목은 뭐가 좋을까?">
            <textarea name="" id="" v-model="description" class="w-full h-[400px] mt-5" placeholder="너만의 스토리를 보여줘!"></textarea>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
    name: "BoardWrite",
    data() {
        return {
            catelist:[
                {name: 'SF/판타지', tag:'fantasy'},{name:'호러/스릴러',tag:'horror'},{name:'로맨스',tag:'romance'},{name:'자유',tag:'free'}],
            category:'',
            title:'',
            description: '',
        }
    },
    components: {
    },
    methods: {
        async GetDate(){
            const new_date = new Date()
            let month = ''
            let date = ''
            if(new_date.getMonth()<9){ month = '0'+(new_date.getMonth()+1) }else{ month = (new_date.getMonth()+1)}
            if(new_date.getDate()<9){ date = '0'+(new_date.getDate()) }else{ date = (new_date.getDate())}
            const formattedDate = ('' + new_date.getFullYear()) + '-'+ month + '-' + date;
            return formattedDate
        },
        async write(){
            const date = await this.GetDate()
            if(this.category === ''){
                alert('장르를 선택해 주세요.')
            }else if(this.title === '' || this.description === ''){
                alert('제목과 내용이 입력되지 않았습니다.')
            }else{
                const data = {
                    category: this.category,
                    title: this.title,
                    description: this.description,
                    createDate: date}
                //게시물 데이터를 data에 담는다
                //axios.post('주소',data,{header에 보낼거})
                axios.post('http://175.45.205.235:8080/v1/api/notice', JSON.stringify(data),
                    {headers: 
                        {
                            'Content-Type': 'application/json',
                            "ACCESS_TOKEN" : localStorage.getItem('accessToken'),
                            "REFRESH_TOKEN" : localStorage.getItem('refreshToken')
                        }
                    }
            ).then(this.$router.push('/board')).catch((error)=>{alert(error)})
            }
        },
    },
}
</script>
<style>
</style>
<template>
    <div class="mt-20 max-w-5xl mx-auto">
        <p class="text-sm text-gray-500 text-center">
            {{ category }}
        </p>
        <h4 class="text-3xl font-bold mb-3">{{ title }}</h4>
        <p class="flex justify-between border-b py-3 border-gray-300 text-gray-500">
            <span>{{ writer }}</span>
            <ul class="flex gap-x-3">
                <li>{{ createDate }}</li>
                <li><img :src="require(`@/assets/icon_view.png`)" class="w-5 opacity-50 inline-block" alt="조회 수"> 276</li>
                <li><img :src="require(`@/assets/icon_comment.png`)" class="w-5 opacity-50 inline-block" alt="댓글 수"> {{ commentList.length }}</li>
                <li><img :src="require(`@/assets/icon_like.png`)" class="w-5 opacity-50 inline-block" alt="좋아요 수"> 0</li>
            </ul>
        </p>
        <div class="py-5 whitespace-pre-line">
            {{ description }}
        </div>
        <ul>
            <li v-for="(e,i) in commentList" :key="i" class="flex items-start justify-between p-5">
                <p class="basis-1/12 font-bold">{{ e.writer }}</p>
                <p class="basis-9/12">{{ e.comment }}</p>
                <span class="basis-2/12 text-center text-gray-500">{{ e.createDate }}</span></li>
        </ul>
        <!-- 댓글란 -->
        <div class="flex items-start justify-between border p-5 rounded-lg">
            <p class="basis-1/12">
                {{ this.$store.state.displayName }}
            </p>
            <textarea class="basis-9/12" v-model="comment" placeholder="자유롭게 감상을 남겨봐!"></textarea>
            <button @click="reply" class="basis-1/12 border px-2 py-1 cursor-pointer hover:bg-nutty rounded-sm">등록</button>
        </div>
    </div>
</template>
<script>
 import BoardList from "@/assets/BoardList.json";
import axios from 'axios';
export default {
    name:"BoardRead",
    data() {
        return {
            catelist:[
                {name: 'SF/판타지', tag:'fantasy'},{name:'호러/스릴러',tag:'horror'},{name:'로맨스',tag:'romance'},{name:'자유',tag:'free'}],
            noticeId :'',
            category:'',
            writer:'',
            title:'',
            description:'',
            createDate:'',
            commentList:[],
            comment:''
        }
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
        async reply(){
            const date = await this.GetDate()
            const data = {
                    noticeId : this.noticeId,
                    comment: this.comment,
                    createDate: date}
            axios.post('http://175.45.205.235:8080/v1/api/comment', JSON.stringify(data),
                    {headers: 
                        {
                            'Content-Type': 'application/json',
                            "ACCESS_TOKEN" : localStorage.getItem('accessToken'),
                            "REFRESH_TOKEN" : localStorage.getItem('refreshToken')
                        }
                    }
            ).then(alert("댓글이 등록되었습니다")).catch((error)=>{alert(error)})
        }
    },
    mounted() {
        // axios.get(`http://175.45.205.235:8080/v1/api/notice/${this.$route.query.noticeId}`).then((res)=>{
        //     console.log(res.data)
        //     this.category = res.data.category
        //     this.description = res.data.description
        //     this.title = res.data.title
        //     this.writer = res.data.writer
        //     this.createDate = res.data.createDate
        //     this.commentList = res.data.commentList
        // })
            this.category = BoardList.BoardList[this.noticeId].category;
            this.description = BoardList.BoardList[this.noticeId].description
            this.title = BoardList.BoardList[this.noticeId].title
            this.writer = BoardList.BoardList[this.noticeId].writer
            this.createDate = BoardList.BoardList[this.noticeId].createDate
            this.commentList = BoardList.BoardList[this.noticeId].commentList
    },
    created() {
        this.noticeId = this.$route.query.noticeId
    },
}
</script>
<style>
    
</style>
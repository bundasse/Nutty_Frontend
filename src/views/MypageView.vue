<template lang="">
    <div class="max-w-5xl mx-auto my-20">
        <div class="h-40 flex">
            <img class="w-32" :src="this.$store.state.mbti === 'T'? require(`@/assets/natty.png`):require(`@/assets/naff.png`)">
            <h3 class="mt-10 ml-20 text-5xl font-bold">{{this.$store.state.mbti}} 성향</h3>
        </div>
        <div class="mt-10 mb-20 flex gap-x-3 align-middle">
            <h3 class="text-2xl font-bold">{{this.$store.state.displayName}}</h3>
            <button @click="changeName"><img class="w-5 opacity-50" :src="require(`@/assets/icon_write.png`)" alt="닉네임 수정"></button>
        </div>
        <section>
            <ul class="flex justify-between">
                <h4 class="text-2xl font-bold mb-3">내가 작성한 글</h4>
                <span class="">더보기<img class="w-5 inline-block opacity-50" :src="require(`@/assets/icon_ArrowNavigateNext.png`)" alt="더보기 버튼"></span>
            </ul>
            <ul class="flex flex-wrap justify-between gap-y-5">
                <li v-for="(e,i) in contentList" :key="i" class="basis-[32%] border rounded-md shadow-md p-5">
                    <router-link :to="{ path: '/board/read' , query:{noticeId : e.noticeId}}" @click="$store.commit('boardRead',e.noticeId)">
                        <h4 class="font-bold text-3xl">
                            {{ e.title }}
                        </h4>
                        <p class="line-clamp-3 my-5">
                            {{ e.description }}
                        </p>
                        <ul class="text-gray-400 text-sm flex gap-x-5">
                            <li>{{ e.writer }} · {{ e.createDate }}</li>
                            <li><img :src="require(`@/assets/icon_view.png`)" class="w-4 opacity-40 inline-block" alt="조회 수"> 33</li>
                            <li><img :src="require(`@/assets/icon_comment.png`)" class="w-4 opacity-40 inline-block" alt="댓글 수"> {{ e.commentList.length }}</li>
                        </ul>
                    </router-link>
                </li>
            </ul>
        </section>
        <router-link class="mt-20 mb-5 hover:font-bold block" to="/" @click="logOut">로그아웃</router-link>
        <h4 class="text-red-600 font-bold" @click="resign()">서비스 탈퇴</h4>
    </div>
</template>
<script>
 import BoardList from "@/assets/BoardList.json";
export default {
    name: 'MypageView',
    data() {
        return {
            contentList: BoardList.BoardList.slice(0,9)
        }
    },
    methods: {
        changeName(){
            alert("닉네임 수정 기능")
        },
        logOut(){
            this.$store.commit("logOutToken")
            this.$router.replace('/home')
        },
        resing(){
            alert("탈퇴 기능")
        }
    },
}
</script>
<style lang="">
    
</style>
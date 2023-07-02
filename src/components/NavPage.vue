<template>
    <div class="w-full py-5 z-20 fixed top-0" :class="this.$route.path !== '/home' && 'bg-white'">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-10">
            <div class="z-50" @click="isOpen === true ? isOpen = false : isOpen = true" :class="isOpen && 'on'">
                <div v-for="e in 3" :key="e" class="h-0.5 w-7 bg-black rounded transition-all duration-500 m-1.5 top-5" :class="isOpen && ' on'"></div>
            </div>
            <div :class="isOpen === true && '!left-0'" class="w-60 pl-10 bg-white h-full z-30 top-0 transiton-all duration-500 -left-60 fixed">
                <ul class="mt-28">
                    <li v-for="(e, index) in NavList[0]" :key="e" class="mb-12">
                        <router-link :to="NavList[1][index]" @click="isOpen=false" class="hover:text-nutty font-bold text-lg text-center mb-3">{{ e }}</router-link>
                        <ul v-if="index === 0" class="submenu ml-10">
                        <li v-for="(el, i) in SubList" :key="el"><button @click="GoTo(SubMenuLink[i])"
                            class="hover:text-nutty hover:font-bold"> {{ el }}</button></li>
                        </ul>
                    </li>
                </ul>
                <div v-if="this.$store.state.loginChk === true" class="text-sm text-gray-500 absolute bottom-10">
                    <router-link class="hover:font-bold block mb-2" to="/mypage">마이 페이지</router-link>
                    <router-link class="hover:font-bold block" to="/" @click="logOut">로그아웃</router-link>
                </div>
            </div>
            <h1 class="basis-10/12"><router-link :to="this.$store.state.loginChk === true ? '/': '/home'">로고</router-link></h1>
            <ul class="basis-1/12 flex justify-end gap-x-4">
                <li v-if="this.$store.state.loginChk === false"><router-link to="/login">로그인</router-link></li>
                <li v-else><router-link to="/mypage">{{this.$store.state.displayName}}</router-link></li>
            </ul>
        </div>
    </div>
</template>
<script>
import Nav from '../assets/Nav.json'
export default {
    name: "NavPage",
    data() {
        return {
            NavList: Nav.Nav,
            isOpen: false,
            SubList: Nav.SubMenu,
            SubMenuOpen: false,
            NavSelectIndex: null,
            SubMenuLink: Nav.SubLink,
            isSubDown: '',
            isSubOpen: false,
        }
    },
    mounted() {
    },
    methods: {
        logOut(){
            this.$store.commit("logOutToken")
            this.$router.replace('/home')
        },
        GoTo(e){
            alert(e)
        }
    }
}
</script>
<style>
.on div:nth-child(1) {
  transform: rotate(45deg) translateY(12px)
}

.on div:nth-child(2) {
  opacity: 0;
}

.on div:nth-child(3) {
  transform: rotate(-45deg) translateY(-12px)
}
</style>
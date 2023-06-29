<template>
    <div class="max-w-7xl mx-auto py-10 flex justify-between items-center">
        <div class="top-4 z-50 pt-5 left-10 fixed" @click="isOpen == true ? isOpen = false : isOpen = true" :class="isOpen && 'on'">
            <div v-for="e in 3" :key="e" class="h-0.5 w-7 bg-black rounded transition-all duration-500 m-1.5 top-5" :class="isOpen && ' on'"></div>
        </div>
        <div :class="isOpen === true && '!left-0'" class="w-60 bg-white h-full z-30 top-0 transiton-all duration-500 -left-60 fixed">
            <ul class="mt-20">
                <li v-for="(e, index) in NavList[0]" :key="e" class="text-center mb-12">
                    <router-link :to="NavList[1][index]" class="hover:text-nutty hover:font-bold relative after:absolute after:h-[1px] after:bg-gray-800 after:w-[80px] after:left-1/2 after:-translate-x-1/2 after:bottom-0 text-center">{{ e }}</router-link>
                    <ul v-if="index === 2" class="submenu">
                    <li v-for="(el, i) in SubList" :key="el"><router-link :to="SubMenuLink[i]"
                        class="hover:text-nutty hover:font-bold"> {{ el }}</router-link></li>
                    </ul>
                </li>
            </ul>
            <div v-if="this.$store.state.loginChk === true" class="text-center">
                <router-link class="hover:font-bold block" to="/mypage">마이 페이지</router-link>
                <router-link class="hover:font-bold block" to="/" @click="logOut">로그아웃</router-link>
            </div>
        </div>
        <h1 class=""><router-link to="/">로고</router-link></h1>
        <ul class="flex justify-end gap-x-4">
            <li v-if="this.$store.state.loginChk === false"><router-link to="/login">로그인</router-link></li>
            <li v-else><router-link to="/mypage">{{this.$store.state.displayName}}</router-link></li>
        </ul>
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
    methods: {
        logOut(){
            this.$store.commit("logOutToken")
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
<template>
    <div class="max-w-7xl mx-auto py-10">
        <ul class="flex justify-end gap-x-4">
            <li v-if="this.$store.state.loginChk === false"><router-link to="/login">로그인</router-link></li>
            <li v-else><router-link to="/mypage">마이페이지</router-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "NavPage"
}
</script>
<style>
    
</style>
<template>
    <div class="mt-32">
        <div class="border-nutty border-2">
            <router-view></router-view>
        </div>
        <router-link to="/board/write" class="cursor-pointer border rounded-md">글쓰기</router-link>
    </div>
</template>
<script>

export default {
    name: "BoardView",
    data() {
        return {
        }
    },
}
</script>
<style>
    
</style>
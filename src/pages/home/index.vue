<template>
    <div class="anime-card-container">
        <AnimeCard :animeList="animeList" />
    </div>

</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import request from '@/utils/request'

let animeList = reactive([
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
    { mikan_id: 3061, anime_name: "无职转生第三季", img_url: "3061.jpg", subscribe_status: 0 },
    { mikan_id: 3062, anime_name: "无职转生第四季", img_url: "3062.jpg", subscribe_status: 0 },
])

// onMounted(() => {
//     console.log("onmounted")
//     // request.get('/anime/detail/3221').then(res => {
//     //     console.log(res)
//     // })
// })


</script>

<style scoped lang="scss"></style>
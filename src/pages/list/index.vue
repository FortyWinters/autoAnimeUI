<template>

    <AnimeCard :animeArr="animeArr" />

</template>

<script setup lang="ts">
import { reactive } from 'vue'

let animeArr = reactive([
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
    { mikan_id: 3061, anime_name: "无职转生第三季", img_url: "3061.jpg", subscribe_status: 0 },
    { mikan_id: 3062, anime_name: "无职转生第四季", img_url: "3062.jpg", subscribe_status: 0 },
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
    { mikan_id: 3061, anime_name: "无职转生第三季", img_url: "3061.jpg", subscribe_status: 0 },
    { mikan_id: 3062, anime_name: "无职转生第四季", img_url: "3062.jpg", subscribe_status: 0 },
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
    { mikan_id: 3061, anime_name: "无职转生第三季", img_url: "3061.jpg", subscribe_status: 0 },
    { mikan_id: 3062, anime_name: "无职转生第四季", img_url: "3062.jpg", subscribe_status: 0 },
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
    { mikan_id: 3061, anime_name: "无职转生第三季", img_url: "3061.jpg", subscribe_status: 0 },
    { mikan_id: 3062, anime_name: "无职转生第四季", img_url: "3062.jpg", subscribe_status: 0 },
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
    { mikan_id: 3061, anime_name: "无职转生第三季", img_url: "3061.jpg", subscribe_status: 0 },
    { mikan_id: 3062, anime_name: "无职转生第四季", img_url: "3062.jpg", subscribe_status: 0 },
])
</script>

<style scoped lang="scss"></style>
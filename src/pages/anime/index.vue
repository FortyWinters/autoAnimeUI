<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive } from 'vue'

const $route = useRoute()
let mikan_id = $route.query.mikan_id

let animeList = reactive([
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
])
</script>

<style scoped lang="scss"></style>
<template>
    <div class="anime-container">
        <div class="anime-left">
            <img :src="anime.img_url" alt="">
        </div>
        <div class="anime-right">
            <div class="anime-name">{{ anime.anime_name }}</div>
            <div class="anime-button">
                <el-button :icon="Star" color="red" circle />
                <el-button type="primary" :icon="RefreshRight" circle />
                <el-button type="success" :icon="Download" circle />
                <el-button type="danger" :icon="Delete" circle />
            </div>
            <div class="subgroup-tab">
                <Tab :subgroupArr="subgroupArr" :mikanId="mikanId"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import Tab from './tab/index.vue'
import {
    Star,
    RefreshRight,
    Download,
    Delete
} from '@element-plus/icons-vue'

const $route = useRoute()
let mikanId = $route.query.mikan_id

let anime = reactive(
    { mikan_id: 3060, anime_name: "无职转生第二季", img_url: "3060.jpg", subscribe_status: 1 },
)

let subgroupArr = reactive([
    {subgroup_id: 1, subgroup_name: "字幕组1"},
    {subgroup_id: 2, subgroup_name: "字幕组2"},
    {subgroup_id: 3, subgroup_name: "字幕组3"},
    {subgroup_id: 4, subgroup_name: "字幕组4"}
])
</script>

<style scoped lang="scss">
.anime-container {
    display: flex;
    height: 400px;
    margin-top: 15px;

    .anime-left {
        margin-right: 20px;
        width: 200px;
        height: 100%;
        display: flex;
        justify-content: center;

        img {
            width: 180px;
            height: 240px;
        }
    }

    .anime-right {
        width: 70%;
        height: 100%;
        .anime-name {
            font-size:24px;
            margin-bottom: 10px;
        }
        .anime-button {
            margin-bottom: 40px;
        }
    }
}
</style>
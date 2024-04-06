<template>
    <div class="topbar">
        <router-link :to="'/home'" class="link">Home</router-link>
        <span> >> </span>
        <router-link :to="`/anime?mikan_id=${$route.query.mikan_id}`" class="link">Anime</router-link>
        <span> >> </span>
        <span class="link"> {{ animeInfo.anime_name }} - 第{{ $route.query.episode }}集 - {{ subgroup_name }}</span>
    </div>

    <div style="display: flex; justify-content: center;">
        <el-row :gutter="0">
            <el-col :span="1" />
            <el-col :span="2">
                <div class="grid-content ep-bg-purple">
                    <img src="@/assets/images/1.gif" alt="GIF Image" class="leftImage">
                </div>
            </el-col>
            <el-col :span="1" />
            <el-col :span="16">
                <el-row :gutter="0">
                    <div class="grid-content ep-bg-purple">
                        <Player :videoPath="videoPath" :key="videoPath" class="player" />
                    </div>
                </el-row>
            </el-col>
            <el-col :span="1" />
            <el-col :span="2">
                <div class="grid-content ep-bg-purple">
                    <img src="@/assets/images/1.gif" alt="GIF Image" class="rightImage">
                </div>
            </el-col>
            <el-col :span="1" />
        </el-row>
    </div>
    
    <div class="tab">
        <Tab />
    </div>

    <div class="bottom">
        <span class="text">BanG(umi) Dream! It's My AutoAnime ! ! ! ! ! ✌️🥵✌️</span>
        <!-- <span style="font-size: 25px;"> ✌️🥵✌️</span> -->
    </div>


</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import Tab from '../anime/tab/index.vue'
import { useAnimeStore } from '@/store/modules/anime'
import Player from './player/index.vue'
import { storeToRefs } from 'pinia'

const $route = useRoute()

let animeStore = useAnimeStore()
const { animeInfo, animeSubgroupInfo } = storeToRefs(animeStore)

onMounted(() => {
    animeStore.getAnime(Number($route.query.mikan_id))
    animeStore.getSeed(Number($route.query.mikan_id))
    animeStore.getSubgroup()
    animeStore.getTask(Number($route.query.mikan_id))
})

const baseUrl = "http://127.0.0.1:9999"

const subgroup_name = computed(() => {
    return animeSubgroupInfo.value.find(subgroup => subgroup.subgroup_id === Number($route.query.subgroup_id))?.subgroup_name
})

const videoPath = computed(() => {
    return baseUrl + '/' + animeInfo.value.anime_name + "(" + $route.query.mikan_id + ")" + '/' + animeInfo.value.anime_name + " - " + $route.query.episode + " - " + subgroup_name.value + ".mp4"
})

console.log(animeInfo.value.anime_name)
</script>

<style scoped lang="scss">
.el-row {
    margin-bottom: 0px;
}

.el-row:last-child {
    margin-bottom: 0px;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 10px;
}

.topbar {
    font-family: Serif;
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 20px;
    width: 100%;
    overflow: hidden;
}

.link {
    font-family: Serif;
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    font-size: 20px;
    margin-left: 6px;
    margin-right: 6px;
    white-space: nowrap;
    color: #686868;
}

.player {
    width: 100%;
    height: 100%;
}

.leftImage {
    margin-top: 250%;
    width: 100%;
    height: 100%;
}

.rightImage {
    margin-top: 250%;
    width: 100%;
    height: 100%;
    transform: scaleX(-1);
}

.tab {
    margin-top: 20px;
    margin-bottom: 15px;
    width: 100%;
}

.bottom {
    display: flex;
    justify-content: left;
    margin-top: 30px;
    width: 100%;
    overflow: hidden;
}

.text {
    font-family: Serif;
    font-weight: 100;
    font-size: 20px;
    font-style: italic;
    white-space: nowrap;

    color: rgb(100, 100, 100);
}
</style>@/store/modules/anime
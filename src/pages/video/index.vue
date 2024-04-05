<template>
    <el-row :gutter="0">
        <el-col :span="3">
            <div class="grid-content ep-bg-purple">
                <img src="@/assets/images/1.gif" alt="GIF Image" class="leftImage">
            </div>
        </el-col>
        <el-col :span="16">
            <el-row :gutter="1">
                <div class="topbar">
                    <router-link :to="'/home'" class="link">Home</router-link>
                    <span> >> </span>
                    <router-link :to="`/anime?mikan_id=${$route.query.mikan_id}`" class="link">Anime</router-link>
                    <span> >> </span>
                    <span class="link"> {{ animeInfo.anime_name }} - 第{{ $route.query.episode }}集 - {{ subgroup_name
                        }}</span>
                </div>
                <el-divider />
            </el-row>
            <el-row :gutter="1">
                <div class="grid-content ep-bg-purple">
                    <Player :videoPath="videoPath" :key="videoPath" />
                </div>
            </el-row>
            <el-row :gutter="1">
                <div class="grid-content ep-bg-purple" style="width: 800px;">
                    <Tab />
                </div>
            </el-row>
        </el-col>
        <el-col :span="3">
            <div class="grid-content ep-bg-purple">
                <img src="@/assets/images/1.gif" alt="GIF Image" class="rightImage">
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="1">
        <div class="grid-content ep-bg-purple" style="margin-top: 30px;">
            <span class="text">BanG(umi) Dream! It's My AutoAnime ! ! ! ! !</span>
            <span style="font-size: 25px;"> ✌️🥵✌️</span>
        </div>
    </el-row>
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

const episode = ref($route.query.episode);
const subgroup_name = computed(() => {
    return animeSubgroupInfo.value.find(subgroup => subgroup.subgroup_id === Number($route.query.subgroup_id))?.subgroup_name
})

const videoPath = computed(() => {
    return baseUrl + '/' + animeInfo.value.anime_name + '/' + animeInfo.value.anime_name + " - " + episode.value + " - " + subgroup_name.value + ".mp4"
})

</script>

<style scoped lang="scss">
.topbar {
    font-family: Serif;
    margin-left: 0px;
    margin-top: 20px;
    height: 15px;
    line-height: 30px;
}

.link {
    font-family: Serif;
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    font-size: 20px;
    margin-left: 6px;
    margin-right: 6px;
    color: #686868;
}

.el-row {
    margin-bottom: 10px;
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

.leftImage {
    margin-top: 150%;
    width: 100px;
    height: 100px;
}

.rightImage {
    margin-top: 150%;
    margin-left: 40px;
    width: 100px;
    height: 100px;
    transform: scaleX(-1);
}

.text {
    margin-left: 600px;
    font-family: Serif;
    font-weight: 100;
    font-size: 20px;
    font-style: italic;
    color: rgb(100, 100, 100);
}
</style>@/store/modules/anime
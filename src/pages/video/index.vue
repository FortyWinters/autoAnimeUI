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
                        <Player :videoPath="videoPath" :subtitlePath="subtitlePath" :key="videoPath" class="player" />
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
import { onMounted, ref, computed, watch, watchEffect } from 'vue'
import Tab from '../anime/tab/index.vue'
import { useAnimeStore } from '@/store/modules/anime'
import Player from './player/index.vue'
import { storeToRefs } from 'pinia'
import { getAnimeTask, getSubtitlePath } from '@/api/video'

const $route = useRoute()
const animeStore = useAnimeStore()
const { animeInfo, animeSubgroupInfo } = storeToRefs(animeStore)

interface AnimeTask {
    filename: string;
    id: number;
    mikan_id: number;
    qb_task_status: number;
    rename_status: number;
    torrent_name: string;
}

interface SubtitlePath {
    subtitle: string
}

const baseUrl = "/file_server"

let anime_task = ref<AnimeTask>();
let subtitle_path = ref<SubtitlePath>();
let subgroup_name = ref<string | undefined>(undefined);
let videoPath = ref<string | undefined>(undefined);
let subtitlePath = ref<string | undefined>(undefined);

onMounted(() => {
    animeStore.getAnime(Number($route.query.mikan_id))
    animeStore.getSeed(Number($route.query.mikan_id))
    animeStore.getSubgroup()
    animeStore.getTask(Number($route.query.mikan_id))
    doInit()
})

const doInit = async () => {
    let anime_res = await getAnimeTask({ torrent_name: String($route.query.torrent_name) })
    anime_task.value = anime_res.data

    let res = await getSubtitlePath({ video_name: String(anime_task.value?.filename) })
    subtitle_path.value = res.data
}

watch(
    [() => $route.query, anime_task, subtitle_path],
    ([query, newAnimeTask, newSubtitlePath], [oldQuery, oldAnimeTask, oldSubtitlePath]) => {
        if (query !== oldQuery) {
            animeStore.getAnime(Number(query.mikan_id));
            animeStore.getSeed(Number(query.mikan_id));
            animeStore.getSubgroup();
            animeStore.getTask(Number(query.mikan_id));
            doInit();
        }

        else if (newAnimeTask !== undefined && newSubtitlePath !== undefined) {
            subgroup_name.value = animeSubgroupInfo.value.find(subgroup => subgroup.subgroup_id === Number(query.subgroup_id))?.subgroup_name;
            videoPath.value = baseUrl + '/' + animeInfo.value.anime_name + "(" + query.mikan_id + ")" + '/' + newAnimeTask?.filename;
            subtitlePath.value = baseUrl + '/' + animeInfo.value.anime_name + "(" + query.mikan_id + ")" + '/' + newSubtitlePath;
        }
    }
);


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
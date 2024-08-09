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
                        <Player v-if="videoPath !== undefined" :videoPath="videoPath" :subtitlePath="subtitlePath"
                            :key="`${videoPath}-${subtitlePath}`" class="player" />
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

    <div class="video-setting">
        <div class="mb-4">
            <el-button type="primary" plain @click="doReGenSubtilte">重新提取字幕</el-button>
        </div>
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
import { onMounted, ref, watch } from 'vue'
import Tab from '../anime/tab/index.vue'
import { useAnimeStore } from '@/store/modules/anime'
import Player from './player/index.vue'
import { storeToRefs } from 'pinia'
import { getVideoDetail, postReGenSubtitle } from '@/api/video'

const $route = useRoute()
const animeStore = useAnimeStore()
const { animeInfo, animeSubgroupInfo } = storeToRefs(animeStore)

interface VideoDetail {
    anime_name: string;
    subgroup_name: string;
    video_path: string;
    subtitle_vec: string[];
}

const baseUrl = "/file_server"

let video_detail = ref<VideoDetail>();
let subgroup_name = ref<string | undefined>(undefined);
let videoPath = ref<string | undefined>(undefined);
let subtitlePath = ref<string | undefined>(undefined);

const doReGenSubtilte = async () => {
    await postReGenSubtitle({ torrent_name: String($route.query.torrent_name) })
}

const doInit = async () => {
    let video_res = await getVideoDetail({ torrent_name: String($route.query.torrent_name) });
    video_detail.value = video_res.data
}

onMounted(() => {
    animeStore.setupWatchers();
    animeStore.getAnimeDetail(Number($route.query.mikan_id))
    doInit()
})

watch(
    [() => $route.query, video_detail],
    ([query, newVideoDetail], [oldQuery, oldVideoDetail]) => {
        if (query !== oldQuery) {
            animeStore.getAnimeDetail(Number(query.mikan_id));
            doInit();
        }

        else if (newVideoDetail !== undefined) {
            subgroup_name.value = newVideoDetail?.anime_name;
            videoPath.value = baseUrl + '/' + newVideoDetail?.video_path
            subtitlePath.value = baseUrl + '/' + newVideoDetail?.subtitle_vec[0];
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

.video-setting {
    display: flex;
    justify-content: right;
    margin-top: 30px;
    width: 100%;
    overflow: hidden;
}
</style>@/store/modules/anime
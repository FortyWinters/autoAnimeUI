<template>
    <div class="anime-container">
        <div class="anime-left">
            <img :src="img_url" alt="">
        </div>
        <div class="anime-right">
            <div class="anime-name">{{ animeInfo.anime_name }}</div>
            <div class="anime-button">
                <el-button :icon="Star" circle type="warning" @click="subscribeAnime"
                    :class="{ 'is-subscribed': animeInfo.subscribe_status == 1, 'is-not-subscribed': animeInfo.subscribe_status != 1 }" />
                <el-button type="primary" :icon="RefreshRight" circle @click="updateAnimeSeed" />
                <el-button type="success" :icon="Download" circle />
                <el-button type="danger" :icon="Delete" circle @click="deleteAnimeSeed" />
            </div>
            <div class="subgroup-tab">
                <Tab />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useAnimeStore } from '@/store/modules/anime'
import { ElMessage } from "element-plus";
import Tab from './tab/index.vue'
import {
    Star,
    RefreshRight,
    Download,
    Delete
} from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

let animeStore = useAnimeStore()
const { animeInfo, img_url } = storeToRefs(animeStore)

let $route = useRoute()

onMounted(() => {
    animeStore.getAnime(Number($route.query.mikan_id))
    animeStore.getSeed(Number($route.query.mikan_id))
    animeStore.getSubgroup()
    animeStore.getTask(Number($route.query.mikan_id))
})

async function subscribeAnime() {
    await animeStore.updateSubscribeStatus();
}

async function updateAnimeSeed() {
    animeStore.updateSeed()
}

async function deleteAnimeSeed() {
    animeStore.deleteSeed()
}
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
            font-size: 24px;
            margin-bottom: 10px;
        }

        .anime-button {
            margin-bottom: 40px;

            .is-subscribed {
                background-color: red;
                border-color: red;
            }

            .is-subscribed:hover {
                background-color: rgb(249, 104, 104);
                border-color: rgb(249, 104, 104);
            }

            .is-not-subscribed {
                background-color: #d6d6d6;
                border-color: #d6d6d6;
            }

            .is-not-subscribed:hover {
                background-color: red;
                border-color: red;
            }
        }
    }
}
</style>@/store/modules/anime
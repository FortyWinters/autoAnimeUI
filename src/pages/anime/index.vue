<template>
    <div class="anime-page-content">
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
                    <el-button type="info" :icon="Delete" circle @click="deleteAnimeSeed" />
                </div>
            </div>
        </div>
        <div class="subgroup-tab">
            <Tab />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useAnimeStore } from '@/store/modules/anime'
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
.anime-page-content {
    padding-left: 7px;

    .anime-container {
        display: flex;
        margin-top: 15px;
        margin-bottom: 15px;

        .anime-left {
            margin-right: 20px;
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

    .subgroup-tab {
        min-width: 100px;
    }
}
</style>
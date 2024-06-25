<template>
    <div class="anime-page-content">
        <div class="anime-container">
            <div class="anime-left">
                <el-image :src="img_url" style="width: 180px; height: 240px;" />
            </div>
            <div class="anime-right">
                <div class="anime-name">{{ animeInfo.anime_name }}</div>
                <div class="anime-button">
                    <el-button :icon="Star" circle type="warning" @click="subscribeAnime"
                        :class="{ 'is-subscribed': animeInfo.subscribe_status == 1, 'is-not-subscribed': animeInfo.subscribe_status != 1 }" />
                    <el-button type="primary" :icon="RefreshRight" circle @click="updateAnimeSeed" />
                    <el-button type="info" :icon="Delete" circle @click="deleteAnimeSeed" />
                </div>
                <div class="anime-info">
                    <div class="anime-rank">
                        bangumi评分:
                        <a :href="`https://bgm.tv/subject/${animeInfo.bangumi_id}#;`">{{ animeInfo.bangumi_rank }}</a>
                    </div>
                    <div class="anime-site">
                        官方网站:
                        <a :href="`${animeInfo.website}`">{{ animeInfo.website }}</a>
                    </div>
                    <div class="anime-summary">{{ animeInfo.bangumi_summary }}</div>
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
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useAnimeStore } from '@/store/modules/anime'
import Tab from './tab/index.vue'
import {
    Star,
    RefreshRight,
    Delete
} from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

let animeStore = useAnimeStore()
const { animeInfo, img_url, taskInfo } = storeToRefs(animeStore)

let $route = useRoute()

const fetchAnimeDetail = (mikan_id: number) => {
    animeStore.getAnimeDetail(mikan_id)
}

onMounted(() => {
    animeStore.setupWatchers();
    fetchAnimeDetail(Number($route.query.mikan_id))
})

onBeforeUnmount(() => {
    if (taskInfo.value.filter((task) => task.qb_task_status === 0).length !== 0) {
        animeStore.sendStopSignal();
    }
})

watch(() => $route.query.mikan_id, (newMikanId) => {
    if (newMikanId) {
        fetchAnimeDetail(Number(newMikanId))
    }
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
        height: 240px;

        .anime-left {
            margin-right: 20px;

            img {
                width: 180px;
                height: 240px;
            }
        }

        .anime-right {
            width: 70%;

            .anime-name {
                font-size: 24px;
                margin-bottom: 10px;
            }

            .anime-button {
                margin-bottom: 10px;

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

            .anime-info {
                height: 164px;

                .anime-rank {
                    margin-bottom: 5px;
                }

                .anime-site {
                    margin-bottom: 10px;
                }

                .anime-summary {
                    border-top: 2px solid rgb(224, 224, 224);
                    padding-top: 5px;
                    width: 1200px;
                    height: 100px;
                }


            }
        }
    }

    .subgroup-tab {
        min-width: 100px;
    }
}
</style>
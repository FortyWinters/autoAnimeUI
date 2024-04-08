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

onMounted(() => {
    console.log("(onMounted)获得动画与种子与任务信息")
    animeStore.getAnimeDetail(Number($route.query.mikan_id))
})

onBeforeUnmount(() => {
    if (taskInfo.value.filter((task) => task.qb_task_status === 0).length !== 0) {
        console.log("(onBeforeUnmount)离开anime页面,发送stop信号,切断ws")
        animeStore.seedStopSignal();
    }
})

watch(
    () => animeStore.taskInfo,
    (currentTasks, previousTasks) => {
        const tasksWithStatusZero = currentTasks.filter(task => task.qb_task_status === 0);
        const previousTasksWithStatusZero = previousTasks ? previousTasks.filter(task => task.qb_task_status === 0) : [];

        if (tasksWithStatusZero.length !== previousTasksWithStatusZero.length) {
            if (tasksWithStatusZero.length !== 0) {
                console.log("(0)当taskInfo变化,先切断旧ws")
                animeStore.seedStopSignal();
                console.log("(1)如果taskInfo中存在状态为0的任务,就建立ws")
                animeStore.connectWs()
            } else {
                console.log("(1)如果taskInfo中不存在状态为0的任务,就切断ws(当最后一个任务完成)")
                animeStore.seedStopSignal()
            }
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

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
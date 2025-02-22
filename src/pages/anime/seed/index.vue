<template>
    <div class="seed-container">
        <el-dropdown v-for="s in seedArr" :key="s.seed_url">
            <div class="episode-container">
                <div :class="episodeClass(s.seed_status)" class="button-with-badge">
                    <span v-if="s.is_new === 1" class="notification-badge">New</span>
                    <span v-if="s.seed_status !== 2" style="font-size: 13px; margin: 10px 10px;" :title="s.seed_name">
                        {{ s.episode === -1 ? '合 集' : `第 ${s.episode} 集` }}
                    </span>
                    <div v-else class="download-bar" :title="s.seed_name">
                        <el-progress :text-inside="true" :stroke-width="25" :percentage="s.progress" />
                    </div>
                </div>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="download" @click="downloadAnimeSeed(s)"
                        :disabled="s.seed_status !== 0 && s.seed_status !== 1">下载</el-dropdown-item>
                    <el-dropdown-item command="play"
                        @click="jumpToVideo(s.mikan_id, s.episode, s.subgroup_id, s.seed_url)"
                        :disabled="s.seed_status !== 3"> 网页播放
                    </el-dropdown-item>
                    <el-dropdown-item command="delete" divided @click="deleteAnimeTask(s)"
                        :disabled="s.seed_status !== 2 && s.seed_status !== 3">删除</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAnimeStore } from '@/store/modules/anime';
import { inject } from "vue"
import { WSClient } from '@/ws/wsClient'
import type { Seed } from '@/types'
import { storeToRefs } from 'pinia'

let animeStore = useAnimeStore()

defineProps(['seedArr'])
const $router = useRouter()
const wsClient: WSClient | undefined = inject('wsClient');
const { taskInfo } = storeToRefs(animeStore)

function jumpToVideo(mikan_id: number, episode: number, subgroup_id: number, seed_url: string) {
    $router.push({
        path: '/video',
        query: {
            mikan_id: mikan_id,
            episode: episode,
            subgroup_id: subgroup_id,
            torrent_name: seed_url.split("/")[3],
        }
    })
}

const execGetSeedsProgressTask = async () => {
    if (wsClient) {
        // 等待连接建立
        const interval = setInterval(() => {
            if (wsClient.isConnected) {
                wsClient.getSeedsProgressTask(taskInfo.value.filter((task) => task.qb_task_status === 0))
                clearInterval(interval);
            }
        }, 100); 
    }
}

async function downloadAnimeSeed(seed: Seed) {
    await animeStore.downloadSeed(seed)
    execGetSeedsProgressTask()
}

async function deleteAnimeTask(seed: Seed) {
    await animeStore.deleteTask(seed)
}

function episodeClass(seed_status: number): string {
    switch (seed_status) {
        case 1:
            return 'episode-used'; // 种子已使用，但不存在对应task
        case 2:
            return 'episode-downloading'; // 下载中
        case 3:
            return 'episode-downloaded'; // 下载完成
        default:
            return 'episode'; // 种子未使用
    }
}
</script>

<style scoped lang="scss">
.link {
    text-decoration: none;
}

.link:visited {
    color: inherit;
}

.download-bar {
    font-size: 15px;
    margin: 10px 10px;
    width: 80px;

    :deep(.el-progress-bar__outer) {
        border-radius: 3px;
        width: 80px;
        border: 1px solid rgb(220, 217, 217);

        .el-progress-bar__inner {
            border-radius: 3px;
            background-color: rgb(88, 202, 255);
        }
    }
}

.episode-container {
    height: 35px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;

    .episode,
    .episode-used,
    .episode-downloading,
    .episode-downloaded {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
        width: 80px;
        border-radius: 3px;
        border: 1px solid rgb(220, 217, 217);
    }

    .episode:hover,
    .episode-used:hover,
    .episode-downloading:hover,
    .episode-downloaded:hover {
        box-shadow: 2px 2px 2px 0px rgba(236, 236, 236, 0.75);
    }

    .episode-downloading {
        background-color: rgb(88, 202, 255);
        border: 0px;

        span {
            color: #ffffff;
        }
    }

    .episode-downloaded {
        background-color: rgb(67, 227, 155);
        border: 0px;

        span {
            color: #ffffff;
        }
    }

    .episode-used {
        background-color: rgb(194, 190, 190);
        border: 0px;

        span {
            color: #ffffff;
        }
    }

    .button-with-badge {
        position: relative;
        // padding: 10px 20px;
        font-size: 1rem;
        margin-top: 5%;

        .notification-badge {
            position: absolute;
            top: 10;
            right: 6%;
            transform: translate(50%, -50%);
            background-color: red;
            color: white;
            padding: 4px;
            border-radius: 70%;
            font-size: 0.6rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 20px;
            min-height: 20px;
            animation: flashAndBounce 2s infinite;
        }

        @keyframes flashAndBounce {
            100% {
                opacity: 1;
                transform: translateY(50%, -50%);
            }

            50% {
                opacity: 0;
                transform: translateY(50%, -50%);
            }
        }
    }
}
</style>
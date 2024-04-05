<template>
    <div class="seed-container">
        <el-dropdown v-for="s in seedArr" :key="s.seed_url">
            <div class="episode-container">
                <div class="episode">
                    <span style="font-size: 15px; margin: 10px 10px; color: black;" :title="s.seed_name">
                        {{ s.episode === -1 ? '合 集' : `第 ${s.episode} 集` }}
                    </span>
                </div>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="download" @click="downloadAnimeSeed(s)">下载</el-dropdown-item>
                    <el-dropdown-item command="recover">恢复</el-dropdown-item>
                    <el-dropdown-item command="subscribe">开始订阅</el-dropdown-item>
                    <el-dropdown-item command="play" @click="jumpToVideo(s.mikan_id, s.episode, s.subgroup_id)"> 网页播放
                    </el-dropdown-item>
                    <el-dropdown-item command="delete" divided disabled>删除</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAnimeStore } from '@/store/modules/anime';
import type { Seed } from '@/types'

let animeStore = useAnimeStore()

defineProps(['seedArr'])
const $router = useRouter()

function jumpToVideo(mikan_id: number, episode: number, subgroup_id: number) {
    $router.push({
        path: '/video',
        query: {
            mikan_id: mikan_id,
            episode: episode,
            subgroup_id: subgroup_id,
        }
    })
}

async function downloadAnimeSeed(seed: Seed) {
    await animeStore.downloadSeed(seed)
}
</script>

<style scoped lang="scss">
.link {
    text-decoration: none;
}

.link:visited {
    color: inherit;
}

.episode-container {
    height: 30px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;

    .episode {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
        width: 80px;
        border-radius: 3px;
        border: 1px solid rgb(220, 217, 217);
    }
}
</style>
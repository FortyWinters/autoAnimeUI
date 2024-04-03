<template>
    <div class="seed-container">
        <el-dropdown v-for="s in seedArr" :key="s.seed_name" @command="handleCommand">
            <span style="font-size: 15px; margin: 10px 10px;">第{{ s.index }}集</span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="download">下载</el-dropdown-item>
                    <el-dropdown-item command="recover">恢复</el-dropdown-item>
                    <el-dropdown-item command="subscribe">开始订阅</el-dropdown-item>
                    <el-dropdown-item command="play" @click="jumpToVideo(mikanId, s.index, s.subgroup_id)"> 网页播放
                    </el-dropdown-item>
                    <el-dropdown-item command="delete" divided disabled>删除</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const $router = useRouter()
const handleCommand = (command: string | number | object) => {
    console.log(command)
}

let $route = useRoute()
let mikanId = Number($route.query.mikan_id)

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

defineProps(['seedArr'])
</script>

<style scoped lang="scss">
.link {
    text-decoration: none;
}

.link:visited {
    color: inherit;
}
</style>
<template>
    <div class="list">
        <el-scrollbar height="700px">
            <el-space wrap :size="20" class="anime-container">
                <el-card v-for="a in animeList" :key="a.mikan_id" class="box-card"
                    style="width: 180px;height: 280px;--el-card-padding:0px;">
                    <div style="height: 240px;width:180px;background-color: snow;" @click="jumpToAnime(a.mikan_id)">
                    </div>
                    <el-text class="w-150px mb-2" truncated
                        style="margin-top: 12px; margin-left: 5px;width: 140px;font-size: 12px;">
                        {{ a.anime_name }}
                    </el-text>
                    <el-button class="button"
                        style="margin-right:5px;float: right;padding: 0px;width: 24px;height: 24px;margin-top: 8px;"></el-button>
                </el-card>
            </el-space>
        </el-scrollbar>
    </div>

</template>

<script lang="ts" setup name="List">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

let animeList = reactive([
    { mikan_id: 3060, anime_name: "无职转生第二季" },
    { mikan_id: 3061, anime_name: "无职转生第三季" },
    { mikan_id: 3062, anime_name: "无职转生第四季" },
])

let $router = useRouter()
function jumpToAnime(mikan_id: number) {
    $router.push({
        path: '/Anime',
        query: {
            mikan_id,
        }
    })
}
</script>

<style scoped>
.list {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
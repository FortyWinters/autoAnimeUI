<template>
    <div class="anime-card-container">
        <el-card v-for="a in animeArr" :key="a.mikan_id" class="anime-card" shadow="hover">
            <div class="card-top" @click="jumpToAnime(a.mikan_id)">
                <img :src="a.img_url" alt="">
            </div>
            <div class="card-bottom">
                <div class="card-left">
                    <el-text class="anime-name" truncated>
                        {{ a.anime_name }}
                    </el-text>
                </div>
                <div class="card-right">
                    <el-button type="warning" :icon="Star" circle size="small" color="red"
                        @click="updateAnimeSubscribeStatus(a.mikan_id, a.subscribe_status)" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { Star } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const $router = useRouter()
defineProps(['animeArr'])

function updateAnimeSubscribeStatus(mikan_id: number, subscribe_status: number) {
    console.log("updateAnimeSubscribeStatus", mikan_id, subscribe_status)
}

function jumpToAnime(mikan_id: number) {
    $router.push({
        path: '/anime',
        query: {
            mikan_id: mikan_id,
        }
    })
}
</script>

<style scoped lang="scss">
.anime-card-container {
    display: flex;
    flex-wrap: wrap;

    .anime-card {
        width: 180px;
        height: 280px;
        margin: 15px 10px;

        :deep(.el-card__body) {
            padding: 0px;

            .card-top {
                width: 100%;
                height: 240px;

                img {
                    height: 100%;
                    width: 100%;
                }
            }

            .card-bottom {
                width: 100%;
                height: 40px;
                display: flex;

                .card-left {
                    width: 80%;
                    height: 100%;
                    padding-left: 10px;
                    padding-top: 12px;
                }

                .card-right {
                    width: 20%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }
            }
        }
    }
}
</style>
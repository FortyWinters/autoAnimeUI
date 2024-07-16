<template>
    <div class="outter" ref="outter">
        <div class="anime-card-container" :style="{ width: animeCardContainerWidth + 'px' }">
            <el-card v-for="a in animeList" :key="a.mikan_id" class="anime-card" shadow="hover">
                <div class="card-top" @click="jumpToAnime(a.mikan_id)">
                    <el-image :src="fileServer + `/images/anime_list/${a.img_url}`" style="width: 180px; height: 240px;" />
                </div>
                <div class="card-bottom">
                    <div class="card-left">
                        <el-text class="anime-name" truncated>
                            {{ a.anime_name }}
                        </el-text>
                    </div>
                    <div class="card-right">
                        <el-button type="warning" :icon="Star" circle size="small"
                            @click="updateAnimeSubscribeStatus(a.mikan_id, a.subscribe_status)"
                            :class="{ 'is-subscribed': a.subscribe_status == 1, 'is-not-subscribed': a.subscribe_status != 1 }" />
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { reqSubscribeAnime } from '@/api/anime';
import type { ReqAnimeBroadcast, ReqSubscribeAnime } from '@/types';
import { ElMessage } from 'element-plus';
import { useListStore } from '@/store/modules/list';
import { storeToRefs } from 'pinia';
import { Star } from '@element-plus/icons-vue';

const listStore = useListStore();
const { animeList } = storeToRefs(listStore);
const fileServer = ref(import.meta.env.VITE_APT_FILE_SERVER_URL);

const $router = useRouter();
const $route = useRoute();

const outter = ref<HTMLElement | null>(null);
const animeCardContainerWidth = ref(0);
const maxCardWidth = 194;

const adjustAnimeCardContainerWidth = () => {
    if (outter.value) {
        const outterWidth = outter.value.clientWidth;
        animeCardContainerWidth.value = Math.floor(outterWidth / maxCardWidth) * maxCardWidth;
    }
};

onMounted(() => {
    adjustAnimeCardContainerWidth();
    window.addEventListener('resize', adjustAnimeCardContainerWidth);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', adjustAnimeCardContainerWidth);
});

async function updateAnimeSubscribeStatus(mikan_id: number, subscribe_status: number) {
    let item: ReqSubscribeAnime = {
        mikan_id: mikan_id,
        subscribe_status: subscribe_status
    }
    try {
        await reqSubscribeAnime(item);
        ElMessage({
            message: subscribe_status == 0 ? '订阅成功' : '取消订阅成功',
            type: 'success'
        });

        if ($route.path == '/home') {
            listStore.getHomeList();
        } else {
            let broadcastItem: ReqAnimeBroadcast = {
                year: Number($route.query.year),
                season: Number($route.query.season),
            }
            listStore.getBroadcastList(broadcastItem);
        }
    } catch (error) {
        ElMessage({
            message: (error as Error).message,
            type: 'error'
        });
    }
}

function jumpToAnime(mikan_id: number) {
    $router.push({
        path: '/anime',
        query: {
            mikan_id: mikan_id,
        }
    });
}
</script>

<style scoped lang="scss">
.outter {
    display: flex;
    justify-content: center;

    .anime-card-container {
        display: flex;
        flex-wrap: wrap;

        .anime-card {
            width: 180px;
            height: 280px;
            margin: 10px 7px;

            :deep(.el-card__body) {
                padding: 0px;

                .card-top {
                    width: 100%;
                    height: 240px;
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
        }
    }
}
</style>

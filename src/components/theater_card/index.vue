<template>
    <div class="outter" ref="outter">
        <div class="theater-card-container" :style="{ width: theaterCardContainerWidth + 'px' }">
            <el-card v-for="theater in theaterList" :key="theater.theater_id" class="theater-card" shadow="hover">
                <div class="card-content">
                    <h3 class="theater-name">{{ theater.theater_name }}</h3>
                    <p class="anime-name">{{ theater.anime_name }}</p>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useTheaterStore } from '@/store/modules/theater';

const theaterStore = useTheaterStore();
const { theaterList } = storeToRefs(theaterStore);

// 添加测试数据
theaterStore.$patch({
    theaterList: [
        { theater_id: 1, theater_name: '剧场1', anime_name: '动画1' },
        { theater_id: 2, theater_name: '剧场2', anime_name: '动画2' },
        { theater_id: 3, theater_name: '剧场3', anime_name: '动画3' }
    ]
});

const outter = ref<HTMLElement | null>(null);
const theaterCardContainerWidth = ref(0);
const maxCardWidth = 300; // 每个卡片的最大宽度

const adjustTheaterCardContainerWidth = () => {
    if (outter.value) {
        const outterWidth = outter.value.clientWidth;
        theaterCardContainerWidth.value = Math.floor(outterWidth / maxCardWidth) * maxCardWidth;
    }
};

onMounted(async () => {
    await theaterStore.getTheaterList();  // 添加这行来获取剧场数据
    adjustTheaterCardContainerWidth();
    window.addEventListener('resize', adjustTheaterCardContainerWidth);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', adjustTheaterCardContainerWidth);
});
</script>

<style scoped lang="scss">
.outter {
    display: flex;
    justify-content: center;

    .theater-card-container {
        display: flex;
        flex-wrap: wrap;

        .theater-card {
            width: 280px;
            height: 120px;
            margin: 10px;

            .card-content {
                padding: 15px;
                text-align: center;

                .theater-name {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #409EFF;
                }

                .anime-name {
                    font-size: 1rem;
                    color: #606266;
                }
            }
        }
    }
}
</style>
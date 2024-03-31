<template>
    <div class="cascader-content">
        <div class="cascader">
            <el-cascader v-model="value" :options="calendarList" :props="props" @change="handleChange"
                placeholder="番剧列表" />
        </div>
        <el-button :icon="RefreshRight" circle @click="updateAnimeList" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useCalendar } from '@/hooks/useCalendar';
import { RefreshRight } from '@element-plus/icons-vue'

const value = ref([])
const $router = useRouter()
const $route = useRoute()
const { calendarList } = useCalendar()

const props = {
    expandTrigger: 'hover' as const,
}

const handleChange = (value: string[]) => {
    $router.push({
        path: '/List',
        query: {
            year: value[0],
            season: value[1]
        }
    })
}

function updateAnimeList() {
    let year = $route.query.year
    let season = $route.query.season

    console.log(year, season)
}
// TODO 当离开/List路径时，番剧列表内容清空
</script>

<style scoped lang="scss">
.cascader-content {
    width: 200px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    .cascader {
        width: 150px;
        margin-right: 10px;
    }
}
</style>
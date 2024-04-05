<template>
    <div class="cascader-content">
        <div class="cascader">
            <el-cascader v-model="value" :options="calendarList" :props="props" @change="handleChange"
                placeholder="番剧列表" />
        </div>
        <el-button :icon="RefreshRight" circle @click="updateAnimeList" :disabled="isDisabled"
            style="height: 24px;width: 24px;" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useCalendar } from '@/hooks/useCalendar';
import { RefreshRight } from '@element-plus/icons-vue'
import type { ReqAnimeBroadcast } from '@/types'
import { useListStore } from '@/store/modules/list'

let listStore = useListStore()
const value = ref([])
const $router = useRouter()
const $route = useRoute()
const { calendarList } = useCalendar()

const props = {
    expandTrigger: 'hover' as const,
}

const isDisabled = computed(() => {
    return $route.path !== '/list';
});

const handleChange = (value: string[]) => {
    $router.push({
        path: '/list',
        query: {
            year: value[0],
            season: value[1]
        }
    })
}

async function updateAnimeList() {
    let item: ReqAnimeBroadcast = {
        year: Number($route.query.year),
        season: Number($route.query.season),
    }
    listStore.updateBroadcastList(item)
}
</script>

<style scoped lang="scss">
.cascader-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;

    .cascader {
        width: 164px;
        margin-right: 5px;
    }
}
</style>
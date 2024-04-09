<template>
    <el-tabs v-model="activeTabName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="s in seedArrBySubgroupId" :key="s.subgroup_id" :label="s.subgroup_name"
            :name="s.subgroup_id.toString()">
            <Seed :seedArr="s.seedArr" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onBeforeUnmount} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Seed from '../seed/index.vue'
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '@/store/modules/anime'
import { useRoute } from 'vue-router'

const $route = useRoute()
const activeTabName = ref('');
let animeStore = useAnimeStore()
const { animeSubgroupInfo, animeSeedInfo, activeSubgroupId } = storeToRefs(animeStore)

const handleClick = (tab: TabsPaneContext) => {
    // 检查 tab.props?.name 是否为 undefined 并确保它是一个数字
    if (typeof tab.props?.name !== 'undefined') {
        const subgroupId = Number(tab.props.name);
        // 确保转换后的 subgroupId 是有效的数字
        if (!isNaN(subgroupId)) {
            animeStore.setActiveSubgroupId(subgroupId);
        } else {
            console.error('subgroupId is not a valid number');
        }
    } else {
        console.error('subgroupId is undefined');
    }
}

const seedArrBySubgroupId = computed(() => {
    return animeSubgroupInfo.value.map(subgroup => ({
        ...subgroup,
        seedArr: animeSeedInfo.value
            .filter(seed => seed.subgroup_id === subgroup.subgroup_id)
            .sort((a, b) => a.episode - b.episode),
    }));
});

watchEffect(() => {
    if ($route.path === "/video") {
        activeTabName.value = String($route.query.subgroup_id);
    }
    else {
        if (seedArrBySubgroupId.value.length > 0) {
            if (activeSubgroupId.value !== -1) {
                activeTabName.value = activeSubgroupId.value.toString()
            } else {
                activeTabName.value = seedArrBySubgroupId.value[0].subgroup_id.toString();
            }
        }
    }
});

onBeforeUnmount(() => {
    activeSubgroupId.value = -1
})
</script>

<style scoped lang="scss">
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
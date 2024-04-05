<template>
    <el-tabs v-model="activeTabName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="s in seedArrBySubgroupId" :key="s.subgroup_id" :label="s.subgroup_name"
            :name="s.subgroup_id.toString()">
            <Seed :seedArr="s.seedArr" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Seed from '../seed/index.vue'
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '@/store/modules/anime'
import { useRoute } from 'vue-router'

const $route = useRoute()
const activeTabName = ref('');
let animeStore = useAnimeStore()
const { animeSubgroupInfo, animeSeedInfo } = storeToRefs(animeStore)

const handleClick = (tab: TabsPaneContext) => {
    console.log(tab.props.name)
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
            activeTabName.value = seedArrBySubgroupId.value[0].subgroup_id.toString();
        }
    }
});

</script>

<style scoped lang="scss">
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
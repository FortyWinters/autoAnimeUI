<template>
    <el-tabs v-model="activeTabName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="s in seedArrBySubgroupId" :key="s.subgroup_id" :label="s.subgroup_name"
            :name="s.subgroup_id.toString()">
            <template #label>
                <div class="tab-label">
                    {{ s.subgroup_name }}
                    <span v-if="s.seedArr.some(seed => seed.is_new === 1)" class="new-label">New</span>
                </div>
            </template>
            <Seed :seedArr="s.seedArr" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onBeforeUnmount } from 'vue'
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
    if (typeof tab.props?.name !== 'undefined') {
        const subgroupId = Number(tab.props.name);
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
        const subgroupId = $route.query.subgroup_id;
        if (subgroupId && seedArrBySubgroupId.value.some(s => s.subgroup_id === Number(subgroupId))) {
            activeTabName.value = String(subgroupId);
        }
    } else {
        if (seedArrBySubgroupId.value.length > 0) {
            if (activeSubgroupId.value !== -1) {
                activeTabName.value = activeSubgroupId.value.toString();
            } else {
                activeTabName.value = seedArrBySubgroupId.value[0].subgroup_id.toString();
            }
        }
    }
});

onBeforeUnmount(() => {
    activeSubgroupId.value = -1;
})
</script>

<style scoped lang="scss">
.el-tabs__nav {
    overflow: visible !important;
}

.el-tabs__nav-wrap {
    overflow: visible !important;
}

.demo-tabs>.el-tabs__content {
    overflow: visible !important;
    white-space: nowrap;
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.tab-label {
    position: relative;
    display: inline-block;
    overflow: visible !important;
    white-space: nowrap;
    height: auto;

    .new-label {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(100%, -70%);
        background-color: red;
        color: white;
        padding: 4px;
        border-radius: 70%;
        font-size: 0.6rem;
        font-weight: bold;
        z-index: 100;
        display: flex;
        white-space: nowrap;
        align-items: center;
        justify-content: center;
        animation: flashAndBounce 2s infinite;
    }

    @keyframes flashAndBounce {

        100% {
            opacity: 1;
            transform: translateY(50%, -50%);
        }

        50% {
            opacity: 0;
            transform: translateY(50%, -50%);
        }
    }
}
</style>
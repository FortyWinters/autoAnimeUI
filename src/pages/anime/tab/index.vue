<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="更新集数" name="-1">
            <Seed :seedArr />
        </el-tab-pane>
        <el-tab-pane v-for="s in subgroupArr" :key="s.subgroup_id" :label="s.subgroup_name" :name="s.subgroup_id">
            <Seed :seedArr />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Seed from '../seed/index.vue'

const activeName = ref('-1')
defineProps(['subgroupArr', 'mikanId'])

const handleClick = (tab: TabsPaneContext) => {
    console.log(tab.props.name)
}

let seedArr = reactive([
    { index: 1,seed_name: "name_1", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
    { index: 2,seed_name: "name_2", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
    { index: 3,seed_name: "name_3", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
    { index: 4,seed_name: "name_4", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
    { index: 5,seed_name: "name_5", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
    { index: 6,seed_name: "name_6", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
    { index: 7,seed_name: "name_7", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
    { index: 8,seed_name: "name_8", seed_url: "/seed/url.torrent", episode: "", mikan_id: 3060, subgroup_id: 24, seed_status: 0, seed_size: "1G" },
])
</script>

<style scoped lang="scss">
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
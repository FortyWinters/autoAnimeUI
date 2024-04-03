<template>
    <el-row :gutter="0">
        <el-col :span="3">
            <div class="grid-content ep-bg-purple" />
            <img src="http://127.0.0.1:9999/1.gif" alt="GIF Image" class="leftImage">
        </el-col>
        <el-col :span="16">
            <el-row :gutter="1">
                <div class="topbar">
                    <router-link :to="'../home'" class="link">Home</router-link>
                    <span>></span>
                    <router-link :to="'../anime?mikan_id=3240'" class="link">Anime</router-link>
                    <span>></span>
                    <router-link :to="'../video'" class="link">Video</router-link>
                </div>
            </el-row>
            <el-row :gutter="1">
                <div class="grid-content ep-bg-purple" />
                <video controls ref="videoPlaye" autoplay="false" width="800" height="460">
                    <source :src="videoPath" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </el-row>
            <el-row :gutter="1">
                <div class="grid-content ep-bg-purple" />
                <div class="subgroup-tab" style="">
                    <Tab :subgroupArr="subgroupArr" :mikanId="mikanId" />
                </div>
            </el-row>
        </el-col>
        <el-col :span="3">
            <div class="grid-content ep-bg-purple" />
            <img src="http://127.0.0.1:9999/1.gif" alt="GIF Image" class="rightImage">
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import Tab from '../anime/tab/index.vue'

const $route = useRoute()

let mikanId = $route.query.mikan_id
let videoPath = ref("http://127.0.0.1:9999/迷宫饭/迷宫饭 - 13 - 喵萌奶茶屋.mp4")

let subgroupArr = reactive([
    { subgroup_id: 1, subgroup_name: "字幕组1" },
    { subgroup_id: 2, subgroup_name: "字幕组2" },
    { subgroup_id: 3, subgroup_name: "字幕组3" },
    { subgroup_id: 4, subgroup_name: "字幕组4" }
])
</script>

<style scoped lang="scss">
.topbar {
    margin-left: 0px;
    margin-bottom: 10px;
    height: 15px;
    line-height: 30px;
}

.link {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    font-size: 18px;
    margin-left: 6px;
    margin-right: 6px;
}

.el-row {
    margin-bottom: 10px;
}

.el-row:last-child {
    margin-bottom: 0px;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 10px;
}

.leftImage {
    margin-top: 150%;
    width: 100px;
    height: 100px;
}

.rightImage {
    margin-top: 150%;
    margin-left: 40px;
    width: 100px;
    height: 100px;
    transform: scaleX(-1);
}
</style>@/store/modules/anime
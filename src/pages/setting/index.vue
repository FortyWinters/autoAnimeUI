<template>
    <div>我是设置页</div>

    <el-row :gutter="10">
        <el-col :span="3">
            <div class="grid-content ep-bg-purple" />
            <div class="container" style="height: 40px">
            <!-- <div class="container" style="height: 40px; background-color:brown;"> -->
                <span class="text">自动模式： </span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple" />
            <div class="container" style="height: 40px;  display: flex; justify-content: center;">
                <span class="text"> {{ Status }} </span>
            </div>
        </el-col>
    </el-row>

    <el-row :gutter="10">
        <el-col :span="3" :offset="3">
            <div class="grid-content ep-bg-purple" />
            <div class="container" style="height: 40px; display: flex; justify-content: center;">
                <el-button type="primary" plain @click="doAutoModeOn()">🦍神，启动！</el-button>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="grid-content ep-bg-purple" />
            <div class="container" style="height: 40px;  display: flex; justify-content: center;">
                <el-button type="primary" plain @click="doAutoModeOff()">🦍神，关闭！</el-button>
            </div>
        </el-col>
    </el-row>

    <el-row :gutter="10">
        <el-col :span="3">
            <div class="grid-content ep-bg-purple" />
            <div class="container" style="height: 40px">
            <!-- <div class="container" style="height: 40px; background-color:brown;"> -->
                <span class="text">同步本地文件： </span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="grid-content ep-bg-purple" />
            <div class="container" style="height: 40px;  display: flex; justify-content: center;">
                <el-button type="primary" plain @click="doReloadTask()" class="button">🦍神，同步！</el-button>
            </div>
        </el-col>
    </el-row>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { autoModeOn, autoModeOff, reloadTask, autoModeStatus } from '@/api/setting'
import type { AxiosResponse } from 'axios'
import type { Animes } from '@/types'

let animeArr = ref<Animes>([])
const Status = ref('')

const doReloadTask = async () => {
    let result = await reloadTask()
    animeArr.value = result.data
    window.location.reload()
}

const doAutoModeOn = async () => {
    let result = await autoModeOn()
    animeArr.value = result.data
    console.log('123');
    window.location.reload()
}

const doAutoModeOff = async () => {
    let result = await autoModeOff()
    // animeArr.value = result.data
    console.log('123');
    window.location.reload()
}

onMounted(async () => {
    try {
        const response: AxiosResponse<string> = await autoModeStatus();
            Status.value = response.data;
    } catch (error) {
        console.error('Error fetching Status:', error);
    }
});

</script>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    /* 居中对齐 */
}

.text {
    margin-right: 10px;
}

.el-row {
    margin-bottom: 0px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 10px;
}
</style>
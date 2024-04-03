<template>
    <div class="menu">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <el-menu-item index="/home">订阅</el-menu-item>
            <el-menu-item index="/">视频</el-menu-item>
            <el-menu-item index="/download">下载</el-menu-item>
            <el-menu-item index="/setting">设置</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

const handleSelect = (key: string) => {
    $router.push({
        path: key,
    })
}
</script>

<style scoped lang="scss">
.menu {
    height: 100%;
    width: 272px;

    :deep(.el-menu) {
        height: 54px;
    }
}
</style>
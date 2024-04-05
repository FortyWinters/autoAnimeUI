<template>
    <div class="menu">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect"
            style="height: 45px;">
            <el-menu-item index="/home">订阅</el-menu-item>
            <el-menu-item index="/resource">视频</el-menu-item>
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
    :deep(.el-menu-item) {
        padding-left: 17px;
        padding-right: 17px;
    }
}
</style>
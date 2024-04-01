<template>
    <div class="seed-container">
        <el-dropdown v-for="s in seedArr" :key="s.seed_name" @command="handleCommand">
            <span style="font-size: 15px; margin: 10px 10px;">第{{ s.index }}集</span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="download">下载</el-dropdown-item>
                    <el-dropdown-item command="recover">恢复</el-dropdown-item>
                    <el-dropdown-item command="subscribe">开始订阅</el-dropdown-item>
                    <el-dropdown-item command="delete" divided disabled>删除</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">

const handleCommand = (command: string | number | object) => {
    console.log(command)
}

defineProps(['seedArr'])
</script>

<style scoped lang="scss">
</style>
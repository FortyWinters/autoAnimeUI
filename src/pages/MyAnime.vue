<template>
    <div class="myAnime">
        <el-scrollbar height="700px">
            <el-space wrap :size="20" class="anime-container">
                <el-card v-for="i in 40" :key="i" class="box-card"
                    style="width: 180px;height: 280px;--el-card-padding:0px;">
                    <div style="height: 240px;width:180px;background-color: snow;">
                    </div>
                    <el-text class="w-150px mb-2" truncated
                        style="margin-top: 12px; margin-left: 5px;width: 140px;font-size: 12px;">
                        浪客剑心 －明治剑客浪漫谭－
                    </el-text>
                    <el-button class="button"
                        style="margin-right:5px;float: right;padding: 0px;width: 24px;height: 24px;margin-top: 8px;"></el-button>
                </el-card>
            </el-space>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup name="MyAnime">
import { ElButton } from 'element-plus'
</script>

<style scoped>
.myAnime {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
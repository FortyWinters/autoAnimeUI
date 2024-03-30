<template>
    <div class="app">
        <div class="common-layout">
            <el-container style="padding-top: 20px;">
                <el-header style="height: 45px;">
                    <div style="width: 500px; float: left;font-weight: bold;font-size: 28px;">It's My autoAnime!!!!!</div>
                    <el-button type="primary" style="float: right;width: 70px;">更新</el-button>
                    <div class="m-4" style="float: right;margin-right: 10px;">
                        <el-cascader v-model="value" :options="calendarList" :props="props" @change="handleChange" />
                    </div>
                </el-header>
                <el-container>
                    <el-aside width="100px">
                        <el-row class="tac">
                            <el-col :span="50">
                                <el-menu class="el-menu-vertical-demo" :default-active="$route.path">
                                    <el-menu-item index="/">
                                        <el-icon><Star /></el-icon>
                                        <RouterLink :to="{ name: 'myAnime' }"
                                            style="text-decoration: none; color: inherit;">番剧
                                        </RouterLink>
                                    </el-menu-item>
                                    <el-menu-item index="/download">
                                        <el-icon><Clock /></el-icon>
                                        <RouterLink :to="{ name: 'download' }"
                                            style="text-decoration: none; color: inherit;">下载
                                        </RouterLink>
                                    </el-menu-item>
                                    <el-menu-item index="/setting">
                                        <el-icon><setting /></el-icon>
                                        <RouterLink :to="{ name: 'setting' }"
                                            style="text-decoration: none; color: inherit;">设置
                                        </RouterLink>
                                    </el-menu-item>
                                </el-menu>
                            </el-col>
                        </el-row>
                    </el-aside>
                    <el-main style="padding: 0px;padding-left: 30px;">
                        <div class="main-content">
                            <RouterView></RouterView>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script lang="ts" setup name="App">
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router';
import { Star, Clock, Setting } from '@element-plus/icons-vue'
import { useCalendar } from '@/hooks/useCalendar'
import { ref } from 'vue'

let $router = useRouter()
let $route = useRoute()

const props = {
    expandTrigger: 'hover' as const,
}

const value = ref([])
const handleChange = (value: any) => {
    $router.push({
        path: '/List',
        query: {
            year: value[0],
            season: value[1]
        }
    })
}

let { calendarList } = useCalendar()
</script>

<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}

.el-menu-item a navi-active {
    background-color: black;
}
</style>
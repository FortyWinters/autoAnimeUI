<template>
    <div class="page-container">
        <div class="h">
            <div class="wrapper">
                <div class="h-inner"> </div>
            </div>
        </div>
        <div class="col-full clearfix wrapper">
            <div class="setting-block">
                <h3 class="section-title">订阅设置</h3>
                <div class="base-setting-left">
                    <div class="setting-item">
                        <el-text class="mx-1 el-text-margin-right">开启自动任务：</el-text>
                        <el-switch v-model="TaskStatus" :active-icon="Check" :inactive-icon="Close"
                            @change="changAutoMode(TaskStatus)" style="margin-right: 30px;" />
                        <el-text class="mx-1">{{ Status }}</el-text>
                    </div>
                    <div class="setting-item">
                        <el-text class="mx-1 el-text-margin-right">同步本地文件：</el-text>
                        <el-button style="margin-left: 20px;" size="small" type="primary" plain @click="doReloadTask()"
                            class="button">Load</el-button>
                    </div>
                </div>
            </div>
            <br>
            <div class="setting-block">
                <h3 class="section-title">下载设置</h3>
                <div class="base-setting-left">
                    <div class="setting-item">
                        <el-form :model="form" label-position="left" label-width="auto" style="max-width: 550px">
                            <el-form-item label="部署方式">
                                <el-select v-model="form.deploy_mode" placeholder="本地部署">
                                    <el-option label="本地部署" value="local" />
                                    <el-option label="容器部署" value="docker" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="视频下载位置">
                                <el-input v-model="form.download_path" :placeholder=defautform.download_path
                                    :disabled="isDockerDeployment" />
                            </el-form-item>
                            <el-form-item label="封面图片下载位置">
                                <el-input v-model="form.img_path"
                                    :placeholder=defautform.img_path
                                    :disabled="isDockerDeployment" />
                            </el-form-item>
                            <h4 class="section-title-qb">qbittorrent设置</h4>
                            <div class="setting-item-qb">
                                <el-form-item label="Web API 地址">
                                    <el-input v-model="form.qb_config.qb_url" :placeholder=defautform.qb_config.qb_url />
                                </el-form-item>
                                <el-form-item label="用户名">
                                    <el-input v-model="form.qb_config.username" :placeholder=defautform.qb_config.username />
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="form.qb_config.password" :placeholder=defautform.qb_config.password />
                                </el-form-item>
                            </div>
                        </el-form>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">修改</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { autoModeOn, autoModeOff, reloadTask, autoModeStatus, modifyConfig, getConfig } from '@/api/setting'
import type { AxiosResponse } from 'axios'
import { Check, Close } from '@element-plus/icons-vue'

const Status = ref('')

const TaskStatus = ref(false)

const form = reactive({
    deploy_mode: '',
    download_path: '',
    img_path: '',
    ui_url: '',
    qb_config: {
        qb_url: '',
        username: '',
        password: '',
    }
})

const defautform = reactive({
    deploy_mode: '',
    download_path: '',
    img_path: '',
    ui_url: '',
    qb_config: {
        qb_url: '',
        username: '',
        password: '',
    }
})

const isDockerDeployment = computed(() => form.deploy_mode === 'docker');


const doGetTaskStatus = async() => {
    let res = await autoModeStatus();
    Status.value = res.data;
    
    if (res.data == "Task is Running") {
        TaskStatus.value = true;
    } else {
        TaskStatus.value = false;
    }
    
}

const doGetConfig = async() => {
    let res = await getConfig();
    Object.assign(defautform, res.data);
    if (defautform.deploy_mode == "docker") {
        defautform.deploy_mode = "容器部署"
    }
    else {
        defautform.deploy_mode = "本地部署"
    }
    // console.log(defautform);
}

const onSubmit = async () => {
    await modifyConfig(form);
    console.log(form);
}

const doReloadTask = async () => {
    await reloadTask()
    console.log('doReloadTask');
}

const changAutoMode = async (TaskStatus: boolean) => {
    if (TaskStatus) {
        await autoModeOn()
        console.log('doAutoModeOn');
    }
    else {
        await autoModeOff()
        console.log('doAutoModeOff');
    }
}

onMounted(async () => {
    doGetConfig();
    doGetTaskStatus();
});

</script>

<style scoped lang="scss">
.h {
    .h-inner {
        background-image: url("src/assets/images/bilibili.webp");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        padding-top: 15.3%;
    }
}

.col-full {
    border-radius: 4px;
    padding: 20px;
    padding-top: 40px;
    min-height: 100vh;
    padding: 20px;
}

.clearfix {
    display: block;
}

.wrapper {
    width: 80%;
    margin: 0 auto;
    position: relative;
}

.setting-block {
    padding: 1%;
    background-color: rgb(255, 255, 255);

    .section-title {
        border-bottom: 1.5px solid rgb(224, 224, 224);
        color: #000;
        font-size: 20px;
        font-weight: 400;
        line-height: 33px;
        padding: 0 0 15px;
        position: relative;
    }

    .section-title-qb {
        color: #000;
        font-size: 15px;
        font-weight: 400;
        line-height: 33px;
        padding: 0 0 15px;
        position: relative;
    }

    .base-setting-left {
        padding-top: 10px;
        margin-right: 60px;

        .setting-item {
            margin: 15px;

            .setting-text {
                display: inline-block;
                width: 138px;
                font-size: 14px;
                color: #222;
            }

            .el-text-margin-right {
                margin-right: 40px;
            }
        }

        .setting-item-qb {
            margin-left: 0px;
        }
    }
}

.page-container {
    background-color: rgb(246, 245, 245);
    min-height: 100vh;
    padding: 20px;
}
</style>
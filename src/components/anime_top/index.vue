<template>
    <div class="top">
        <div class="content">
            <div class="left">
                <img src="../../assets/images/logo.png" alt="" @click="jumpToHome()">
            </div>
            <div class="right">
                <Cascader />
                <Menu />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import Cascader from './cascader/index.vue'
import { useRouter } from 'vue-router';

const $router = useRouter()

function jumpToHome() {
    $router.push({
        path: '/',
    })
}
</script>

<style scoped lang="scss">
.top {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 54px;
    background-color: #ffff;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 54px;
        background-color: #ffff;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                height: 54px;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
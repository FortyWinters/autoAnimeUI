<template>
    <div class="top">
        <div class="left">
            <img src="../../assets/images/logo.png" alt="" @click="jumpToHome()">
            <Search />
        </div>
        <div class="right">
            <Cascader />
            <Menu />
            <div class="github">
                <a href="https://github.com/FortyWinters/autoAnimeR">
                    <img src="../../assets/images/github.png" alt="">
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import Cascader from './cascader/index.vue'
import Search from './search/index.vue'
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
    width: 100%;
    flex-wrap: wrap;
    display: flex;

    .left {
        flex: 5 5 auto;
        display: flex;
        align-items: center;
        height: 45px;

        img {
            height: 45px;
        }
    }

    .right {
        height: 45px;
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        .github {
            margin-left: 15px;
            margin-right: 2px;

            img {
                height: 32px;
            }
        }
    }
}
</style>
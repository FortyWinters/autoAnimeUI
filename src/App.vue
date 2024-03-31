<template>
    <div class="container">
        <AnimeTop />
        <div class="content">
            <router-view></router-view>
        </div>
        <AnimeBottom />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
        margin-top: 54px;
        width: 1200px;
        min-height: 700px;
    }
}
</style>
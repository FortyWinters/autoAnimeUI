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
    width:100%;

    .content {
        width: 100%;
        min-height: 700px;
    }
}
</style>
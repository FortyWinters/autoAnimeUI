<template>
    <AnimeCard :animeArr="animeArr" :updateAnimeArr="updateAnimeArr" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Animes } from '@/types'

let animeArr = ref<Animes>([])

const updateAnimeArr = (mikan_id: number, newStatus: number) => {
    const index = animeArr.value.findIndex((anime) => anime.mikan_id === mikan_id);
    if (index !== -1) {
        animeArr.value[index].subscribe_status = newStatus;
    }
};
</script>

<style scoped lang="scss"></style>
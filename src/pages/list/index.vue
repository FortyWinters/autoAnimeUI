<template>
    <AnimeCard :animeArr="animeArr" :updateAnimeArr="updateAnimeArr" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Animes } from '@/types'
import { reqAnimeBroadcast } from '@/api/list'
import { useRoute } from 'vue-router';

let animeArr = ref<Animes>([])

let $route = useRoute()
let year = $route.query.year
let season = $route.query.season

onMounted(() => {
    getAnimeHome(Number(year), Number(season))
})

watch(() => $route.query, (newQuery) => {
    getAnimeHome(Number(newQuery.year), Number(newQuery.season))
});

const getAnimeHome = async (year: number, season: number) => {
    let result = await reqAnimeBroadcast(year, season)
    animeArr.value = result.data
}

const updateAnimeArr = (mikan_id: number, newStatus: number) => {
    const index = animeArr.value.findIndex((anime) => anime.mikan_id === mikan_id);
    if (index !== -1) {
        animeArr.value[index].subscribe_status = newStatus;
    }
};
</script>

<style scoped lang="scss"></style>
<template>
    <div class="anime-card-container">
        <AnimeCard :animeArr="animeArr" :updateAnimeArr="updateAnimeArr" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqAnimeHome } from '@/api/home'
import type { Animes } from '@/types'

let animeArr = ref<Animes>([])

onMounted(() => {
    getAnimeHome()
})

const getAnimeHome = async () => {
    let result = await reqAnimeHome()
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
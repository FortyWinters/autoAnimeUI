<template>
    <div class="anime-card-container">
        <AnimeCard :animeArr="animeArr" />
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

</script>

<style scoped lang="scss"></style>
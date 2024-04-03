<template>
    <div class="anime-card-container">
        <AnimeCard />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useListStore } from '@/store/modules/list'

let listStore = useListStore()

onMounted(() => {
    listStore.getHomeList()
})
</script>

<style scoped lang="scss"></style>
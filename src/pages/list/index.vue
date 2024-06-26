<template>
    <AnimeCard />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import type { ReqAnimeBroadcast } from '@/types'
import { useRoute } from 'vue-router';
import { useListStore } from '@/store/modules/list'

let listStore = useListStore()

let $route = useRoute()

onMounted(() => {
    let item: ReqAnimeBroadcast = {
        year: Number($route.query.year),
        season: Number($route.query.season),
    }
    listStore.getBroadcastList(item)
})

watch(() => $route.query, (newQuery) => {
    let newItem: ReqAnimeBroadcast = {
        year: Number(newQuery.year),
        season: Number(newQuery.season),
    }
    listStore.getBroadcastList(newItem)
});
</script>

<style scoped lang="scss"></style>
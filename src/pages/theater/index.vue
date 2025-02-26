<template>
    <div class="theater-page">
        <theater-card></theater-card>
    </div>
</template>

<script setup lang="ts">
import TheaterCard from '@/components/theater_card/index.vue';
import { onMounted } from 'vue';
import { useTheaterStore } from '@/store/modules/theater';

const theaterStore = useTheaterStore();

onMounted(() => {
    theaterStore.getTheaterList();
});
</script>

<style scoped lang="scss">
.theater-page {
    padding: 20px;
}
</style>
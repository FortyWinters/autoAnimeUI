<template>
    <div class="anime">
        <div>{{ mikan_id }}</div>
        <ul>
            <li v-for="s in subgroupList" :key="s.subgroup_id">
                <RouterLink :to="{
            name: 'detail',
            query: {
                mikan_id: mikan_id,
                subgroup_id: s.subgroup_id
            }
        }">{{ s.subgroup_name }}</RouterLink>
            </li>
        </ul>
        <div class="subgroup-content">
            <RouterView></RouterView>
        </div>
    </div>

    
</template>

<script lang="ts" setup name="Anime">
import { reactive } from 'vue'
import { RouterView } from 'vue-router';

defineProps(['mikan_id'])

let subgroupList = reactive([
    { subgroup_id: 1, subgroup_name: "LoliHouse" },
    { subgroup_id: 2, subgroup_name: "喵萌奶茶屋" },
])
</script>

<style>
.anime {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
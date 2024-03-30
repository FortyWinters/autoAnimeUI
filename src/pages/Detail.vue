<template>
    <div class="detail">
        {{ subgroup_id }}
    </div>
</template>

<script lang="ts" setup name="Detail">
defineProps(['mikna_id', 'subgroup_id'])
</script>

<style>
.detail {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
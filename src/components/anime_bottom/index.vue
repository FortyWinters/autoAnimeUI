<template>
    <div class="bottom">
        <div class="content">
            <div class="github">GitHub</div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.bottom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: end;
        align-items: center;

        .github {
            margin-right: 10px;
        }
    }
}
</style>
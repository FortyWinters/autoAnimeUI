<template>
    <video id="myVideoTwo" controls autoplay="false" width="800" height="460">
        <source :src=props.videoPath type="video/mp4">
        Your browser does not support the video tag.
    </video>
</template>

<script setup lang="ts">
const props = defineProps({
  videoPath: String
});
// require()
console.log(props.videoPath)

</script>

<style scoped lang="scss"></style>
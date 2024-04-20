<template>
	<div id="dplayer" style="width: 800px; height: 460px;"></div>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue';
import DPlayer from 'dplayer';

const props = defineProps({
	videoPath: String,
	subtitlePath: String,
})

const videoPath = String(props.videoPath)
const subtitlePath = String(props.subtitlePath)

let dp: DPlayer | null = null;

onMounted(() => {
	dp = new DPlayer({
		container: document.getElementById('dplayer'),
		screenshot: true,
		video: {
			url: videoPath,

		},
		subtitle: {
			url: subtitlePath,
		},
	});
})

onBeforeUnmount(() => {
	if (dp) {
		dp.destroy();
		dp = null;
	}
});

</script>

<style scoped lang="scss"></style>
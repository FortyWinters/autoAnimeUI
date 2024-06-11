<template>
    <div ref="dplayerContainer" class="dplayer-container">
        <div id="dplayer"></div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue';
import DPlayer from 'dplayer';

const props = defineProps({
    videoPath: String,
    subtitlePath: String,
});

const videoPath = String(props.videoPath)
const subtitlePath = String(props.subtitlePath)


const dplayerContainer = ref<HTMLElement | null>(null);
const dp = ref<DPlayer | null>(null);

const adjustSubtitleFontSize = () => {
    if (dp.value && dp.value.video) {
        const container = dplayerContainer.value;
        if (container) {
            const subtitleElement = container.querySelector('.dplayer-subtitle') as HTMLElement;
            if (subtitleElement) {
                const videoWidth = dp.value.video.offsetWidth;
                if (videoWidth) {
                    const newFontSize = `${videoWidth * 0.04}px`;
                    subtitleElement.style.fontSize = newFontSize;
                    console.log(newFontSize);
                }
            }
        }
    }
};

const initializeDPlayer = () => {
    dp.value = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        video: {
            url: videoPath,
        },
        subtitle: {
            url: subtitlePath,
            fontSize: '30px', // Initial font size
        },
    });
};

onMounted(() => {
    initializeDPlayer();

    if (dplayerContainer.value) {
        // Utilize ResizeObserver to monitor container size changes
        const resizeObserver = new ResizeObserver(adjustSubtitleFontSize);
        resizeObserver.observe(dplayerContainer.value);

        // Disconnect the observer when the component is unmounted
        onBeforeUnmount(() => {
            resizeObserver.disconnect();
        });
    }
});

</script>

<style scoped lang="scss">
.dplayer-container {
    width: 100%;
    max-width: 800px;
    margin: auto;
}

#dplayer {
    width: 100%;
    height: auto;
}
</style>

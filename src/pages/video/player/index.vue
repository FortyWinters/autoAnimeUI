<template>
    <div ref="dplayerContainer" class="dplayer-container">
        <div id="dplayer"></div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineProps, onBeforeUnmount, onMounted, ref, onUnmounted } from 'vue';
import DPlayer from 'dplayer';
import { setVideoProgress, getVideoProgress } from '@/api/video'

const $route = useRoute()

const props = defineProps({
    videoPath: String,
    subtitlePath: String,
});

const videoPath = String(props.videoPath);
const subtitlePath = String(props.subtitlePath)
const dplayerContainer = ref<HTMLElement | null>(null);
const dp = ref<DPlayer | null>(null);
const TorrentName = String($route.query.torrent_name);

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
                }
            }
        }
    }
};

interface ReqVideoProgress {
    progress_id: string,
    torrent_name: string,
    progress_status: number
}

const doGetVideoProgress = async () => {
    const videoProgress: ReqVideoProgress = {
        progress_id: "Default",
        torrent_name: TorrentName,
        progress_status: -1,
    };
    return await getVideoProgress(videoProgress);
}

const doSetVideoProgress = async () => {
    const progress = dp.value?.video.currentTime;
    if (progress !== undefined) {
        const integerProgress = Math.floor(progress);
        console.log(integerProgress);

        const videoProgress: ReqVideoProgress = {
            progress_id: "Default",
            torrent_name: TorrentName,
            progress_status: integerProgress,
        };

        // console.log("set time: ", videoProgress);
        await setVideoProgress(videoProgress);
    }
}

const initializeDPlayer = async () => {
    dp.value = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        autoplay: true,
        video: {
            url: videoPath,
        },
        subtitle: {
            url: subtitlePath,
            fontSize: '30px',
        },
    });

    const videoProgress = await doGetVideoProgress();
    if (videoProgress.data > 0) {
        dp.value?.seek(videoProgress.data);
    }
};

onMounted(() => {
    initializeDPlayer();
    if (dplayerContainer.value) {
        const resizeObserver = new ResizeObserver(adjustSubtitleFontSize);
        resizeObserver.observe(dplayerContainer.value);

        onBeforeUnmount(() => {
            doSetVideoProgress();
            resizeObserver.disconnect();
        });
    }
});

</script>

<style scoped lang="scss">
.dplayer-container {
    width: 100%;
    margin: auto;
}

#dplayer {
    width: 100%;
    height: 100%;
}
</style>

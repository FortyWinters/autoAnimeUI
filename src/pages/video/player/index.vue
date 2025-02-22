<template>
    <div ref="dplayerContainer" class="dplayer-container">
        <div id="dplayer"></div>
        <button @click="enterPictureInPicture" class="pip-button">画中画</button>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineProps, onBeforeUnmount, onMounted, ref, inject } from 'vue';
import DPlayer from 'dplayer';
import { setVideoProgress, getVideoProgress, updateSeenStatus } from '@/api/video'
import { WSClient } from '@/ws/wsClient'

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
const wsClient: WSClient | undefined = inject('wsClient');

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

const doGetVideoProgress = async () => {
    return await getVideoProgress({
        progress_id: "Default",
        torrent_name: TorrentName,
        progress_status: -1,
    });
}

const doSetVideoProgress = async () => {
    const progress = dp.value?.video.currentTime;
    if (progress !== undefined) {

        // console.log("set time: ", videoProgress);
        await setVideoProgress({
            progress_id: "Default",
            torrent_name: TorrentName,
            progress_status: Math.floor(progress),
        });
    }
}

const doUpdateSeenStatus = async () => {
    await updateSeenStatus({ torrent_name: String($route.query.torrent_name) });
}

const initializeDPlayer = async () => {
    const playerOptions = {
        container: document.getElementById('dplayer'),
        screenshot: true,
        autoplay: true,
        video: {
            url: videoPath,
        },
        ...(subtitlePath !== "/file_server/undefined" && {
            subtitle: {
                url: subtitlePath,
                fontSize: '30px',
            }
        }),
    };
    dp.value = new DPlayer(playerOptions);

    const videoProgress = await doGetVideoProgress();
    if (videoProgress.data > 0) {
        dp.value?.seek(videoProgress.data);
    }
};

const enterPictureInPicture = () => {
    const videoElement = dp.value?.video;
    if (videoElement && videoElement.requestPictureInPicture) {
        videoElement.requestPictureInPicture()
            .then(() => {
                console.log("Entered Picture-in-Picture mode");
            })
            .catch(error => {
                console.error("Failed to enter Picture-in-Picture mode:", error);
            });
    } else {
        console.warn("Picture-in-Picture is not supported");
    }
};

const startGetVideoProgress = () => {
    if (wsClient) {
        wsClient.connect();
        wsClient.sendMessage({
            task_type: "StartGetVideoProgressRequest",
            task_data: {
                torrent_name: TorrentName
            }
        });
        wsClient.player = dp.value
        wsClient.torrent_name = TorrentName
    }

}

onMounted(() => {
    initializeDPlayer();
    if (dplayerContainer.value) {
        const resizeObserver = new ResizeObserver(adjustSubtitleFontSize);
        resizeObserver.observe(dplayerContainer.value);

        onBeforeUnmount(() => {
            doSetVideoProgress();
            resizeObserver.disconnect();
            wsClient?.stopGetVideoProgressTask();
        });
    }

    startGetVideoProgress();
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

.pip-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
}
</style>

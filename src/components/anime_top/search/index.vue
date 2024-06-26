<template>
  <div class="search">
    <button class="search-button" @click="showDialog">
      <span style="margin-left: 5px;margin-right: 5px;margin-top: 4px;">
        <el-icon style="width: 20px;height: 20px;">
          <Search />
        </el-icon>
      </span>
      <span style="margin-right: 5px;font-size: 16px;">搜索</span>
      <span style="margin-right: 10px;">
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </span>
    </button>
    <el-dialog v-model="centerDialogVisible" width="550" align-center :modal="false" :show-close="false"
      @opened="handleDialogOpened" @closed="handleDialogClosed">
      <el-autocomplete ref="autocompleteRef" v-model="animeName" clearable placeholder="番剧搜索"
        :fetch-suggestions="fetchData" :trigger-on-focus="false" @select="handleSelect" style="width: 515px">
        <template #default="{ item }">
          <div>
            <span>{{ item.value }}</span>
          </div>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { reqSearchAnime } from "@/api/home";

const centerDialogVisible = ref(false);
const autocompleteRef = ref(null);
const animeName = ref<string>('');
const router = useRouter();

const handleKeydown = (event: KeyboardEvent) => {
  if (event.metaKey && event.key === 'k') {
    event.preventDefault();
    centerDialogVisible.value = !centerDialogVisible.value;
  }
};

const fetchData = async (keyword: string, cb: (suggestions: any[]) => void) => {
  try {
    let result = await reqSearchAnime(keyword);
    if (result.status === 200) {
      if (result.data.length === 0) {
        cb([]);
      } else {
        const suggestions = result.data.map((anime: any) => ({
          value: anime.anime_name,
          mikan_id: anime.mikan_id
        }));
        cb(suggestions);
      }
    }
  } catch (error) {
    ElMessage.error('Error fetching data');
    cb([]);
  }
};

const handleSelect = (item: any) => {
  animeName.value = item.anime_name;
  centerDialogVisible.value = false;
  goAnime(item.mikan_id);
};

const goAnime = (mikan_id: number) => {
  router.push({
    path: '/anime',
    query: {
      mikan_id: mikan_id,
    },
  });
};

const showDialog = () => {
  centerDialogVisible.value = true;
};

const handleDialogOpened = () => {
  if (autocompleteRef.value) {
    (autocompleteRef.value as any).focus();
  }
};

const handleDialogClosed = () => {
  animeName.value = '';
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped lang="scss">
.search {
  margin-left: 10px;

  .search-button {
    height: 30px;
    border-radius: 15px;
    border: 0px;
    background-color: white;
    color: rgb(181, 181, 181);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-button:hover {
    background-color: rgb(243, 243, 243);
    color: rgb(132, 132, 132);
    border: 1px solid;
    border-color: rgb(110, 182, 241);
  }

  :deep(.el-dialog) {
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  :deep(.el-dialog__header) {
    padding-bottom: 0px;
  }

  :deep(.el-input__wrapper) {
    border-color: green;
  }
}
</style>

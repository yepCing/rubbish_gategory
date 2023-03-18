<template>
  <div class="search-container vh100 bg-white">
    <h2 class="my-6">匹配结果</h2>
    <van-search
      v-model="searchKey"
      @search="onSearch"
      class="pa-0"
      shape="round"
      background="transparent"
      placeholder="请输入搜索关键词"
    />
    <div class="hot-search mt-6">
      <h3 class="mb-2">热门搜索</h3>
      <div>
        <template v-for="it in hotSearchList" :key="it">
          <van-tag
            plain
            @click="onSearch(it)"
            class="ml-3 mt-4 pa-1 pl-2 pr-2"
            round
            type="primary"
            >{{ it }}</van-tag
          >
        </template>
      </div>
    </div>
    <div class="history-search mt-6">
      <h3 class="mb-2">搜索历史</h3>
      <div
        class="ta-r fz-12"
        v-show="historyList.list.length"
        @click="onClearHistory"
      >
        清空历史
      </div>
      <div v-if="historyList.list.length">
        <div
          class="al-c history-item"
          v-for="it in historyList.list"
          :key="it"
          @click="onSearch(it)"
        >
          <van-icon name="underway-o" />
          <p class="py-2 fz-12 ml-2">{{ it }}</p>
        </div>
      </div>
      <van-empty v-else image-size="100" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import localCache from "@/utils/cache";
const openLink = inject("$openLink");

const searchKey = ref("");
const hotSearchList = reactive([
  "苹果",
  "指甲刀",
  "果皮",
  "纸壳",
  "剩饭剩菜",
  "电池",
  "钻石",
]);
const historyList = reactive<{ list: string[] }>({
  list: [],
});
const onSearch = (key: string) => {
  openLink("/detail/" + encodeURI(key));
  putHistory(key);
};

const putHistory = (key: string) => {
  const index = historyList.list.findIndex((it) => it == key);
  if (index != -1) historyList.list.splice(index, 1);
  historyList.list.unshift(key);
  localCache.setCache("history-search", historyList.list);
};
// Get history from localstorage
const getHistoryList = () => {
  const history = localCache.getCache<[]>("history-search");
  if (!history) localCache.setCache("history-search", []);
  historyList.list = history ?? [];
};
getHistoryList();

// Clear history
const onClearHistory = () => {
  historyList.list = [];
  localCache.deleteCache("history-search");
};
</script>

<style scoped lang="scss">
.search-container {
  padding: 0 20px;
  .history-item {
    border-bottom: 1px solid #ccc;
    color: #666;
  }
}
</style>

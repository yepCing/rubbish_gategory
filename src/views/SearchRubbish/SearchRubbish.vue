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
    <div class="hot-search mt-4">
      <h3 class="mb-2">热门搜索</h3>
      <div>
        <template v-for="it in hotSearchList" :key="it">
          <van-tag
            @click="onSearch(it)"
            class="ml-2 mt-3"
            round
            type="primary"
            >{{ it }}</van-tag
          >
        </template>
      </div>
    </div>
    <div class="history-search mt-4" v-if="historyList.list.length">
      <h3 class="mb-2">搜索历史</h3>
      <div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import localCache from "@/utils/cache";
const router = useRouter();
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
  router.push("/detail/" + key);
  putHistory(key);
};

const putHistory = (key: string) => {
  historyList.list.unshift(key);
  localCache.setCache("history-search", historyList.list);
};
// 历史记录
const getHistoryList = () => {
  const history = localCache.getCache<[]>("history-search");
  console.log(typeof history);
  if (!history) localCache.setCache("history-search", []);
  historyList.list = history ?? [];
};
getHistoryList();
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

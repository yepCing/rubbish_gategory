<template>
  <div class="detail-container px-5 bg-white vh100">
    <h2 class="pt-4">搜索结果</h2>
    <div class="seach-result al-c h-flex flex-center">
      <p class="fz-14">{{ name }}为</p>
      <h3 class="mt-4">{{ type }}</h3>
    </div>
    <div class="recommend-result">
      <p class="fz-14">你可能要找的是</p>
      <ul class="recommend-list" v-if="recommendList.list.length != 0">
        <li
          class="recommend-item fz-14 mt-2 py-2"
          v-for="it in recommendList.list"
          :key="it.id"
          @click="onRecommend(it.name)"
        >
          <p>{{ it.name }}</p>
          <p class="mt-1">{{ getType(it.type) }}</p>
        </li>
      </ul>
      <van-empty v-else image-size="100" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, onErrorCaptured, reactive, ref, watch } from "vue";
import { getDetail, getRecommendList } from "@/service/detailRubbish";
import { IData, IRubbishObj } from "@/service/detailRubbish/types";

onErrorCaptured((error) => {
  console.log(error);
});
const route = useRoute();
const router = useRouter();
let name = ref<string>("");
name.value = route.params.name as string;

// rubbish detail
let result = ref<IData<IRubbishObj>>();
// get rubbish detail
const onDetail = async () => {
  const data = await getDetail(name.value);
  result.value = data;
};

const recommendList = reactive<{ list: IRubbishObj[] }>({
  list: [],
});
const fetchRecommendList = async () => {
  try {
    let { rows } = await getRecommendList({
      name: "%" + name.value + "%",
    });
    rows = rows?.filter((it) => {
      return it.name != name.value;
    });
    recommendList.list = rows ? rows : [];
  } catch (err) {
    console.log(err);
  }
};

await onDetail();
await fetchRecommendList();
const type = computed(() => {
  if (result.value?.row?.type == 1) return "可回收垃圾";
  if (result.value?.row?.type == 2) return "有害垃圾";
  if (result.value?.row?.type == 3) return "湿垃圾";
  if (result.value?.row?.type == 4) return "干垃圾";
  return "未知垃圾";
});
const getType = (type: string | number) => {
  if (type == 1) return "可回收垃圾";
  if (type == 2) return "有害垃圾";
  if (type == 3) return "湿垃圾";
  if (type == 4) return "干垃圾";
  return "未知垃圾";
};
const onRecommend = (key: string) => {
  router.push("/detail/" + key);
};
watch(
  () => route.params.name,
  async (val) => {
    name.value = val as string;
    await onDetail();
    await fetchRecommendList();
  }
);
</script>

<style scoped lang="scss">
.seach-result {
  min-height: 300px;
}
.recommend-result {
  width: 100%;
  .recommend-list {
    width: 100%;
    .recommend-item {
      border-bottom: 1px solid #ccc;
      color: #666;
    }
  }
}
</style>

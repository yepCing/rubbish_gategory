<template>
  <div class="bg-white vh100">
    <div class="pa-5">
      <h3>{{ type }}</h3>
      <div class="mt-3 discription fz-14 gray">
        {{ categoryRubbishDetail.data.explain }}
      </div>
    </div>

    <div v-if="list.length">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          @click="router.push('/detail/' + item.name)"
        />
      </van-list>
    </div>
    <van-empty v-else image-size="100" description="暂无数据" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getCategoryRubbish,
  getCategoryItem,
} from "../../service/detailRubbish/index";
import {
  IRubbishObj,
  ICategoryParmas,
  ICategoryObj,
} from "@/service/detailRubbish/types";

const route = useRoute();
const router = useRouter();
const queryType = reactive({
  type: "",
});
const page = ref(1);
const limit = ref(20);
const list = ref<IRubbishObj[]>([]);
const categoryRubbishDetail = reactive<{ data: ICategoryObj }>({
  data: {
    common: "",
    explain: "",
    require: "",
    createdAt: "",
    id: 0,
    name: "",
    updatedAt: "",
    userId: 0,
  },
});
const loading = ref(false);
const finished = ref(false);
const fetchGategoryRubbish = async (params: ICategoryParmas) => {
  try {
    loading.value = true;
    const result = await getCategoryRubbish(params);
    if (!result.rows?.length) {
      finished.value = true;
    } else {
      list.value = list.value.concat(result.rows);
      page.value++;
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const fetchGetCategoryItem = async (id: string) => {
  try {
    const result = await getCategoryItem({
      id,
    });
    if (result.row) {
      categoryRubbishDetail.data = result.row;
    }
  } catch (error) {
    console.log(error);
  }
};
if (typeof route.query.type == "string") {
  queryType.type = route.query.type;
}
const type = computed(() => {
  if (queryType.type == "1") return "可回收垃圾";
  if (queryType.type == "2") return "有害垃圾";
  if (queryType.type == "3") return "湿垃圾";
  if (queryType.type == "4") return "干垃圾";
  return "未知垃圾";
});
fetchGategoryRubbish({
  _page: page.value,
  _limit: limit.value,
  type: queryType.type,
});
fetchGetCategoryItem(queryType.type);
const onLoad = () => {
  fetchGategoryRubbish({
    _page: page.value,
    _limit: limit.value,
    type: queryType.type,
  });
};
watch(
  () => route.query.type,
  (val) => {
    queryType.type = val as string;
    page.value = 1;
    list.value = [];
    fetchGategoryRubbish({
      _page: page.value,
      _limit: limit.value,
      type: queryType.type,
    });
    fetchGetCategoryItem(queryType.type);
  }
);
</script>

<style scoped></style>

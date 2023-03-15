<template>
  <div class="home">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="currentDate"
          is-link
          readonly
          name="datePicker"
          label="时间选择"
          placeholder="点击选择时间"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
            @confirm="onConfirm"
            @cancel="showPicker = false"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// import {  } from 'vant'
interface IForm {
  name: string;
  password: number;
  currentDate: string;
}
const username = ref("");
const password = ref<number>();
const currentDate = ref("");
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 5, 1);
const showPicker = ref(false);
const onConfirm = ({ selectedValues }: any) => {
  currentDate.value = selectedValues.join("/");
  showPicker.value = false;
};
const onSubmit = (values: IForm) => {
  console.log("submit", values);
};
</script>

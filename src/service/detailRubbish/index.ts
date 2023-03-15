import { AxiosHeaders } from "axios";
import { h5Request } from "../index";
import { IData, IRubbishObj, ICategoryParmas, ICategoryObj } from "./types";
// 获取垃圾详情
export function getDetail(key: string) {
  return h5Request.get<IData<IRubbishObj>>({
    headers: new AxiosHeaders(),
    url: "/data/item/rubbish?name=" + key,
  });
}

// 根据参数获取不同分类的垃圾
export function getCategoryRubbish(params: ICategoryParmas) {
  return h5Request.get<IData<IRubbishObj[]>>({
    headers: new AxiosHeaders(),
    url: "/data/list/rubbish",
    params,
  });
}

// recommend List
export function getRecommendList(body: ICategoryParmas) {
  return h5Request.post<IData<IRubbishObj[]>>({
    headers: new AxiosHeaders(),
    url: "/data/list/rubbish",
    data: body,
  });
}

// 获取垃圾分类其中一种
export function getCategoryItem(params: { id: string }) {
  return h5Request.get<IData<ICategoryObj>>({
    headers: new AxiosHeaders(),
    url: "/data/item/rubbish_category",
    params,
  });
}

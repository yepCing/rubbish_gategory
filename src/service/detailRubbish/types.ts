export interface IData<T = any> {
  row?: T | null;
  rows?: T | null;
  offset?: number;
  limit?: number;
  count?: number;
}

export interface IRubbishObj {
  createdAt: string;
  id: number;
  name: string;
  type: number;
  updatedAt: string;
  userId: number;
}

export interface ICategoryParmas {
  _page?: number;
  _limit?: number;
  type?: string;
  name?: string;
}

export interface ICategoryObj extends Omit<IRubbishObj, "type"> {
  common: string;
  explain: string;
  require: string;
}

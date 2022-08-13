export type TIngredient = {
  _id: string;
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  count: number,
}

export type TUser = {
  email: string,
  name: string
}

export type TOrderIngredient = {
  uuid: string,
} & TIngredient

export type DefaultResponse<T>  = {
  headers: Headers,
  ok: boolean,
  status: number,
  bodyUsed: boolean,
  redirected: boolean,
  statusText: string,
  type: string,
  url: string,
  clone(): Response,
  json(): Promise<T>
} & Body

export type TDeleteRefreshToken = {
  success: boolean,
  message: string,
}

export type TFetchUserInfo = {
  success: boolean,
  user: TUser
}

export type TGetNewToken = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
}

export type TFetchOrder = {
  success: boolean,
  name: string,
  order: TOrder
}

export type TOrder = {
  createdAt: string,
  ingredients: TIngredient[],
  name: string,
  number: number
  owner: TOwner,
  price: number,
  status: string,
  updatedAt: string,
  _id: string
}

type TOwner = {
  createdAt: string;
  email: string,
  name: string,
  updatedAt: string
}

export type TFetchBody = {
  ingredients: string[]
}

export interface ISocketOrders extends Omit<TOrder, 'ingredients'> {
  ingredients: string[],
  status: 'done' | 'pending' | 'created'
}

export type TWsMessageActions = {
  orders: ISocketOrders[],
  total: number,
  totalToday: number,
  success: string
}

export type TFetchOnceOrder = {
  success: string,
  orders: ISocketOrders[]
}

export type TCurrentOrderWithCount = {
  count?: number
} & TIngredient
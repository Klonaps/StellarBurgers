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
  count: number
}

export type TUser = {
  email: string,
  name: string
}

export type TOrderIngredient = {
  uuid: string,
} & TIngredient

export type TStore = {
  bun: TIngredient[],
  ingredients: TIngredient[]
}

export type TStoreOrderIngredient = {
  ingredients: TOrderIngredient[],
  bun: TOrderIngredient[],
}

export type TStoreRecovery = {
  emailSended: boolean,
  isRequest: boolean,
  isFailed: boolean,
  passwordRecovered: boolean,
  errorMessage: string
}

export type TStoreOrder = {
  currentOrder: TOrder,
  orderRequest: boolean,
  orderFailed: boolean,
}

export type TStoreUser = {
  user: TUser | null,
  userChecked: boolean,
  loginRequest: boolean,
  loginFailed: boolean,
  registerRequest: boolean,
  registerFailed: boolean,
  registerMessage: string,
  message: string,
  updateInfoRequest: boolean,
  updateInfoFailed: boolean,
  updateInfoSuccess: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
  isLogout: boolean
}

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

type TOrder = {
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
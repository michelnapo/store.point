export enum FetchStatus {
  success = "SUCCESS",
  error = "ERROR",
  ready = "READY"
}

export enum StoreContract {
  name = "Store",
  owner = "owner",
  addProductToStore = "addProductToStore",
  buyProduct = "buyProduct",
  getProducts = "getProducts",
  getProductByTokenId = "getProductByTokenId",
  getTheme = "getTheme",
  setTheme = "setTheme",
  getStoreConfig = "getStoreConfig",
  setStoreConfig = "setStoreConfig",
}

export enum RoutesEnum {
  home = "/",
  product_details="/product",
  admin = "/admin",
  create = "/create",
  edit = "/edit",
  profile = "/profile",
  edit_profile = "/edit_profile",
  customize = "/customize",
  create_store = "/create_store",
  settings = "/settings"
}

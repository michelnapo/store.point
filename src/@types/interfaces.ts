import { ChangeEvent, Dispatch, ReactEventHandler, SetStateAction } from "react";
import { FetchStatus } from "./enums";
import { NFTMetadata, Theme } from "./types";

export interface ButtonProps {
  children: string;
  disabled?: boolean;
  onClick?: ReactEventHandler;
}

export interface InputProps {
  style?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  value?: string;
}

export interface AppContentInterface {
  getStoreConfig: () => Promise<{ status: FetchStatus, message: string }>;
  storeConfig: StoreConfigState;
  getUserInfo?: () => void;
  getDataFromStorage?: (storageHash: string) => Promise<any>;
  isOwner: boolean;
  loading: boolean;
  ownerAddress: string;
  ownerIdentity: string;
  setTheme: Dispatch<SetStateAction<Theme>>;
  setToast: Dispatch<SetStateAction<ToastNotification>>;
  theme: Theme;
  toast?: ToastNotification;
  visitorAddress: string;
  visitorIdentity: string;
}

export interface StoreConfigData {
  name: string;
  description: string;
  logo: string;
}

export interface UserInfo {
  avatar: string;
  about: string;
}

export interface StoreConfigState {
  loading: boolean;
  data: StoreConfigData;
}

export interface UserInfoContractData {
  walletAddress: string;
  dataStorageHash: string;
}

export interface UserInfoState {
  loading: boolean;
  data: UserInfoContractData & UserInfo;
  error?: string;
}

export interface ToastNotification {
  color: "green-500" | "red-500";
  message: string;
}

export interface ProductInfo {
  name: string;
  price: number;
  metadata: string;
  sold: boolean;
}

export interface Product {
  name: string;
  description: string;
  image: string;
  price: number;
  sold: boolean;
  tokenId: number;
  address: string;
}

export interface NFTInfo {
  data: NFTContract;
  metadata: NFTMetadata;
}

export interface NFTContract {
  address: string;
  tokenId: number;
  tokenURI: string;
  price: number;
  sold: boolean;
}

export interface ProductDetailsParams {
  address: string,
  tokenId: number,
}

import { ChangeEvent, Dispatch, ReactEventHandler, SetStateAction } from "react";
import { Theme } from "./types";

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


export interface UserInfo {
  avatar: string;
  about: string;
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

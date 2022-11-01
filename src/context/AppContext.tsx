import type { ReactNode } from "react";
import type { StoreConfigState } from "../@types/interfaces";
import { createContext, useContext, useState, useEffect } from "react";
import {
  AppContentInterface,
  ToastNotification
  // UserInfoState
} from "../@types/interfaces";
import { StoreContract, FetchStatus /* RoutesEnum */ } from "../@types/enums";
// import { useNavigate } from "react-router-dom";
import utils from "./utils";
import { Theme } from "../@types/types";

const AppContext = createContext({
  getStoreConfig: () => (
    Promise.resolve({ status: FetchStatus.ready, message: "Ready" })
  ),
  isOwner: false,
  loading: true,
  ownerAddress: "",
  ownerIdentity: "",
  setTheme: () => {},
  setToast: () => {},
  storeConfig: {
    loading: true,
    data: { name: "", description: "", logo: "" },
    status: FetchStatus.ready,
    message: "ready"
  },
  theme: ["", "", ""],
  toast: { color: "green-500", message: "" },
  // userInfo: {
  //   loading: true,
  //   data: { about: "", walletAddress: "", dataStorageHash: "", avatar: "" }
  // },
  visitorAddress: "",
  visitorIdentity: ""
} as AppContentInterface);

export const useAppContext = () => useContext(AppContext);

export const ProvideAppContext = ({ children }: { children: ReactNode }) => {
  // const navigate = useNavigate();

  const [toast, setToast] = useState<ToastNotification>({
    color: "green-500",
    message: ""
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  // const [userInfo, setUserInfo] = useState<UserInfoState>({
  //   loading: true,
  //   data: {
  //     walletAddress: "",
  //     about: "",
  //     avatar: "",
  //     dataStorageHash: ""
  //   }
  // });
  const [visitorAddress, setVisitorAddress] = useState<string>("");
  const [visitorIdentity, setVisitorIdentity] = useState<string>("");
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [ownerIdentity, setOwnerIdentity] = useState<string>("");
  const [theme, setTheme] = useState<Theme>(["white", "indigo", "black"]);
  const [storeConfig, setStoreConfig] = useState<StoreConfigState>({
    loading: true,
    data: { name: "", description: "", logo: "" }
  });

  // const Blogs = useBlogs({ setToast });

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data }: { data: Theme } = await window.point.contract.call({
        contract: StoreContract.name,
        method: StoreContract.getTheme
      });
      setTheme(data);

      const { data: owner } = await window.point.contract.call({
        contract: StoreContract.name,
        method: StoreContract.owner,
        params: []
      });
      setOwnerAddress(owner);

      const ownerId = await utils.getIdentityFromAddress(owner);
      setOwnerIdentity(ownerId);

      const visitor = await utils.getWalletAddress();
      setVisitorAddress(visitor);

      const visitorId = await utils.getIdentityFromAddress(visitor);
      setVisitorIdentity(visitorId);

      const visitorIsOwner = visitor.toLowerCase() === owner.toLowerCase();
      setIsOwner(visitorIsOwner);

      // const hash = await getUserInfo();
      // if (!hash && visitorIsOwner) {
      //   navigate(RoutesEnum.profile, {replace: true});
      // } else {
      //   Blogs.getAllBlogs();
      // }

      setLoading(false);
    })();
  }, []);

  const getStoreConfig = async () => {
    setStoreConfig((prevState) => ({ ...prevState, loading: true }));

    try {
      const { data } = await window.point.contract.call({
        contract: StoreContract.name,
        method: StoreContract.getStoreConfig
      });
      const [name, description, logo] = data;

      setStoreConfig((prevState) => ({
        ...prevState,
        loading: false,
        data: { name: name, description: description, logo: logo }
      }));
      
      return {
        status: FetchStatus.success,
        message: "Store config fetched successfully"
      };
    } catch (error) {
      setStoreConfig((prevState) => ({
        ...prevState,
        loading: false
      }));

      return {
        status: FetchStatus.error,
        message: `The following error has ocurred when fetching store config: ${JSON.stringify(error)}`
      };
    }
  };

  return (
    <AppContext.Provider
      value={{
        toast,
        setToast,
        loading,
        isOwner,
        visitorAddress,
        ownerAddress,
        ownerIdentity,
        // getUserInfo,
        // userInfo,
        visitorIdentity,
        getStoreConfig,
        getDataFromStorage: utils.getDataFromStorage,
        theme,
        storeConfig,
        setTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

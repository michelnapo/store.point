import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FetchStatus, StoreContract } from "../@types/enums";
import { SettingsHeader, PrimaryButton, OutlinedButton, TextInput, MainTitle } from "../components";
import { StorePictureUploader } from "../appComponents";
import { checkOnlySpaceOnString } from "../utils";
import PageLayout from "../layouts/PageLayout";

const Settings = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [storeDescription, setStoreDescription] = useState<string>("");
  const [storeLogo, setStoreLogo] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const { theme, setToast, getStoreConfig, storeConfig } = useAppContext();

  useEffect(() => {

    (async () => {
      const resp = await getStoreConfig();
      
      if (resp.status === FetchStatus.error) {
        alert(`The following error has ocurred: ${resp.message}`);
      }
    })();
    
  }, []);

  useEffect(() => {
    (async () => {
      const { name, description, logo } = storeConfig.data;
      setStoreName(name);
      setStoreDescription(description);
      if (logo) {
        const logoBlob = await window.point.storage.getFile({ id: logo });
        setStoreLogo(logoBlob);
      }
    })();
  }, [storeConfig]);

  const handlePost = async () => {
    setIsLoading(true);
    let storeLogoHash = "";
    if (storeLogo) {
      const storeLogoFormData = new FormData();
      storeLogoFormData.append("files", storeLogo);

      const { data } = await window.point.storage.postFile(storeLogoFormData);
      storeLogoHash = data;
    }

    await window.point.contract.send({
      contract: StoreContract.name,
      method: StoreContract.setStoreConfig,
      params: [storeName.trim(), storeDescription.trim(), storeLogoHash]
    });

    setToast({ color: "green-500", message: "Store settings updated sucessfully" });

    setTimeout(() => navigate(0), 3000); 
    setIsLoading(false);
  };

  const checkIfButtonIsDisabled = (): boolean => (
    storeName === "" || checkOnlySpaceOnString(storeName) ||
    storeDescription === "" || checkOnlySpaceOnString(storeDescription) ||
    storeLogo === null || isLoading
  );

  const isButtonDisabled = checkIfButtonIsDisabled();

  return (
    <PageLayout>
      <SettingsHeader />
      <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
        <MainTitle>Settings</MainTitle>
        <div className="flex mb-8 mt-10">
          <div className="flex flex-row">
            <div className="mr-24 flex flex-col gap-5">
              <label htmlFor="store-picture" className="font-semibold text-2xl">Upload store picture</label> 
              <StorePictureUploader id="store-picture" storePicture={storeLogo} setStorePicture={setStoreLogo} />
            </div>
          </div>
          <div className="flex-1 flex-col">
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="store-name" className="font-semibold text-2xl">Store name</label>
              <TextInput id="store-name" onChange={evt => evt.target.value.length <= 200 && setStoreName(evt.target.value)} value={storeName} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-semibold text-2xl">About</label>
              <textarea id="description" className={`text-${theme[2]} w-full h-40 p-1 border-2 border-gray`} onChange={evt => evt.target.value.length <= 1000 && setStoreDescription(evt.target.value)} value={storeDescription}></textarea>
              <div
                className={`flex justify-end mb-3 text-sm text-${theme[2]} text-opacity-40 m-1`}
              >
                {storeDescription.length}/1000
              </div>
 
            </div>
            <div className="flex space-x-3 mt-5">
              <PrimaryButton disabled={isButtonDisabled} onClick={handlePost}>
                {isLoading ? "Please Wait" : "Update Settings"}
              </PrimaryButton>
              <OutlinedButton>
                Cancel
              </OutlinedButton>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Settings;

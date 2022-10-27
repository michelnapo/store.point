import { useState } from "react";
import { SettingsHeader, PrimaryButton, OutlinedButton, TextInput, MainTitle } from "../components";
import { StoreContract } from "../@types/enums";
import { StorePictureUploader } from "../appComponents";
import { checkOnlySpaceOnString } from "../utils";
import { useAppContext } from "../context/AppContext";
import PageLayout from "../layouts/PageLayout";

const Settings = () => {
  const [storeLogo, setStoreLogo] = useState<Blob | null>(null);
  const [storeName, setStoreName] = useState<string>("");
  const [storeDescription, setStoreDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { theme, setToast } = useAppContext();

  const handlePost = async () => {
    setIsLoading(true);

    try {
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setToast({
        color: "red-500",
        message: "Failed to update store settings. Please try again"
      });
    }
    
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

import { Fragment, useState } from "react";
import { SettingsHeader, PrimaryButton, OutlinedButton, TextInput, MainTitle } from "../components";
import { StorePictureUploader } from "../appComponents";

const Settings = () => {
  const [storePicture, setStorePicture] = useState<Blob | null>(null);

  return (
    <Fragment>
      <SettingsHeader />
      <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
        <MainTitle>Settings</MainTitle>
        <div className="flex mb-8 mt-10">
          <div className="flex flex-row">
            <div className="mr-24 flex flex-col gap-5">
              <label htmlFor="store-picture" className="font-semibold text-2xl">Upload store picture</label> 
              <StorePictureUploader id="store-picture" storePicture={storePicture} setStorePicture={setStorePicture} />
            </div>
          </div>
          <div className="flex-1 flex-col">
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="store-name" className="font-semibold text-2xl">Store name</label>
              <TextInput id="store-name" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-semibold text-2xl">About</label>
              <textarea id="description" className="w-full h-40 p-1 border-2 border-gray"></textarea>
            </div>
            <div className="flex space-x-3 mt-5">
              <PrimaryButton>
                Update Settings
              </PrimaryButton>
              <OutlinedButton>
                Cancel
              </OutlinedButton>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Settings;

import { Fragment, useState } from "react";
import { SettingsHeader, PrimaryButton, TextInput, MainTitle } from "../components";

const CreateStore = () => {
  const [storeName, setStoreName] = useState<string>("");
  
  return (
    <Fragment>
      <SettingsHeader />
      <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
        <MainTitle>Create your store</MainTitle>
        <div className="flex items-end flex-row gap-3 mt-10">
          <TextInput onChange={evt => setStoreName(evt.target.value)} />
          <span>.store.point</span>
          <PrimaryButton disabled={storeName === ""}>Create</PrimaryButton>
        </div>
      </main>
    </Fragment>
  );
};

export default CreateStore;

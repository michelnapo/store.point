import {Fragment, useState} from 'react';
import {SettingsHeader, PrimaryButton, TextInput} from '../components';

const Settings = () => {
  const [storeName, setStoreName] = useState<string>('');
  
  return (
    <Fragment>
      <SettingsHeader />
      <main className="mt-12 mx-auto" style={{maxWidth: '1000px'}}>
        <h1 className="text-3xl font-semibold pb-4 border-solid border-b-2 border-gray">Create your store</h1>
        <div className="flex items-end flex-row gap-3 mt-10">
          <TextInput onChange={evt => setStoreName(evt.target.value)} />
          <span>.store.point</span>
          <PrimaryButton disabled={storeName === ''}>Create</PrimaryButton>
        </div>
      </main>
    </Fragment>
  );
};

export default Settings;

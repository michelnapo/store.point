import NFTImageURL from "../../fake/nft.png";
import { StoreContract } from "../@types/enums";

const getWalletAddress = async () => {
  const { data: { address } } = await window.point.wallet.address();
  return address;
};

const getAddressFromIdentity = async (identity: string) => {
  const { data: { owner } } = await window.point.identity.identityToOwner({ identity });
  return owner;
};

const getIdentityFromAddress = async (owner: string) => {
  const { data: { identity } } = await window.point.identity.ownerToIdentity({ owner });
  return identity;
};

const getDataFromStorage = async (storageHash: string) => {
  const { data } = await window.point.storage.getString({ id: storageHash });
  return JSON.parse(data);
};

/* TEMPORARY FUNCTION */
const createFakeNFTs = async (quantity: number) => {
  for (let i = 0; i < quantity; ++i) {
    const NFTImageFormData = new FormData();
    const NFTImageBlob = new Blob([NFTImageURL], { type: "image/png" });
    NFTImageFormData.append("files", NFTImageBlob);
    
    const { data } = await window.point.storage.postFile(NFTImageFormData);
    const NFTImageHash = data; 

    const NFTMetadataJSON = {
      title: "store.point NFT metadata",
      type: "object",
      properties: {
        name: {
          type: "string",
          description: `Kitaro ${i}`
        },
        description: {
          type: "string",
          description: `Kitaro NFT ${i}`
        },
        image: {
          type: "string",
          description: NFTImageHash
        }
      }
    };
    
    const postResp = await window.point.storage.putString({ data: JSON.stringify(NFTMetadataJSON) });

    const NFTMetadataHash = postResp.data;

    await window.point.contract.send({
      contract: StoreContract.name,
      method: StoreContract.addProductToStore,
      params: [
        `http://localhost:1984/${NFTMetadataHash}`,
        "0x95Ce45A438210eEC3ab9864977ca9C49148Ae1F0",
        100,
        false
      ]
    });
  }
};

/* TEMPORARY FUNCTION */
const getFakeNFTs = async () => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getProducts
  });

  const fakeNFTs = data.map((fakeNFT: any) => ({
    URI: fakeNFT[0],
    id: fakeNFT[1],
    price: fakeNFT[2],
    sold: fakeNFT[3]
  }));

  return fakeNFTs;
};

const addNftProduct = async (ownerAddress: string, data: string) => {
  const { responseData } = 
    await window.point.contract.send({
        contract: StoreContract.name,
        method: StoreContract.addProductToStore,
        params: [ownerAddress, data]
    });
  }

const utils = Object.freeze({
  getWalletAddress,
  getAddressFromIdentity,
  getIdentityFromAddress,
  getDataFromStorage,
  createFakeNFTs,
  getFakeNFTs,
  addNftProduct
});
export default utils;

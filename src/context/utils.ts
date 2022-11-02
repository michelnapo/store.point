import NFTImageURL from "../../fake/nft.png";
import { StoreContract } from "../@types/enums";
import { NFTContract, NFTInfo, Product } from "../@types/interfaces";

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
          description: `http://localhost:1984/${NFTImageHash}`
        }
      }
    };

    const postResp = await window.
      point.storage.putString({ data: JSON.stringify(NFTMetadataJSON) });

    const NFTMetadataHash = postResp.data;

    await window.point.contract.send({
      contract: StoreContract.name,
      method: StoreContract.addProductToStore,
      params: [
        NFTMetadataHash,
        "0x95Ce45A438210eEC3ab9864977ca9C49148Ae1F0",
        100
      ]
    });
  }
};

const getTokenURI = (
  contractAddress: string,
  tokenId: number
) => window.point.contract.call({
  contract: StoreContract.name,
  method: StoreContract.getTokenURI,
  params: [contractAddress, tokenId]
});

/* TEMPORARY FUNCTION */
const getFakeNFTs = async (): Promise<NFTContract[]> => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getProducts
  });

  const fakeNFTs: NFTContract[] = await Promise.all(data.map(async (fakeNFT: any) => {
    const resp = await getTokenURI("0x95Ce45A438210eEC3ab9864977ca9C49148Ae1F0", fakeNFT[1]);
    const tokenURI = resp.data;

    return {
      address: fakeNFT[0],
      tokenId: fakeNFT[1] as number,
      tokenURI: tokenURI,
      price: fakeNFT[2],
      sold: fakeNFT[3]
    };
  }));

  return fakeNFTs;
};

const getNFTInfo = async (nft: NFTContract): Promise<NFTInfo> => {
  const metadata = await getDataFromStorage(nft.tokenURI);
  return { data: { ...nft }, metadata: { ...metadata } };
};

const getProductFromNFT = (nftInfo: NFTInfo): Product => {
  const { name, description, image } = nftInfo.metadata.properties;
  const { address, price, sold, tokenId } = nftInfo.data;

  return {
    name: name.description,
    description: description.description,
    image: image.description,
    price: price,
    sold: sold,
    address: address,
    tokenId: tokenId
  };
};

const getFakeNFTByTokenId = async (tokenId: number) => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getProductByTokenId,
    params: [
      tokenId
    ]
  });

  const fakeNFTs: NFTContract[] = data.map((fakeNFT: any) => ({
    address: fakeNFT[0],
    tokenId: fakeNFT[1] as number,
    price: fakeNFT[2],
    sold: fakeNFT[3]
  }));

  return fakeNFTs[0];
};

const addNftProduct = async (ownerAddress: string, data: any, price: number) => {
  const { responseData } = 
    await window.point.contract.send({
        contract: StoreContract.name,
        method: StoreContract.addProductToStore,
        params: [ownerAddress, data, price]
    });
  }

const utils = Object.freeze({
  getWalletAddress,
  getAddressFromIdentity,
  getIdentityFromAddress,
  getDataFromStorage,
  createFakeNFTs,
  getFakeNFTs,
  addNftProduct,
  getFakeNFTByTokenId,
  getNFTInfo,
  getProductFromNFT
});

export default utils;

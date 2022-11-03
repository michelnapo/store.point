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

const getTokenURI = (
  contractAddress: string,
  tokenId: number
) => window.point.contract.call({
  contract: StoreContract.name,
  method: StoreContract.getTokenURI,
  params: [contractAddress, tokenId]
});

/* TEMPORARY FUNCTION */
const getNFTs = async (): Promise<NFTContract[]> => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getProducts
  });

  const NFTs: NFTContract[] = await Promise.all(data.map(async (nft: any) => {
    const resp = await getTokenURI("0x95Ce45A438210eEC3ab9864977ca9C49148Ae1F0", nft[1]);
    const tokenURI = resp.data;

    return {
      address: nft[0],
      tokenId: nft[1] as number,
      tokenURI: tokenURI,
      price: nft[2],
      sold: nft[3]
    };
  }));

  return NFTs;
};

const getNFTInfo = async (nft: NFTContract): Promise<NFTInfo> => {
  const metadata = await getDataFromStorage(nft.tokenURI);
  return { data: { ...nft }, metadata: { ...metadata } };
};

const getProductFromNFT = (nftInfo: NFTInfo): Product => {
  const { name, description, image } = nftInfo.metadata;
  const { address, price, sold, tokenId } = nftInfo.data;

  return {
    name: name,
    description: description,
    image: image,
    price: price,
    sold: sold,
    address: address,
    tokenId: tokenId
  };
};

const getNFTByTokenId = async (tokenId: number) => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getProductByTokenId,
    params: [
      tokenId
    ]
  });

  const NFTs: NFTContract[] = data.map((nft: any) => ({
    address: nft[0],
    tokenId: nft[1] as number,
    price: nft[2],
    sold: nft[3]
  }));

  return NFTs[0];
};

const createNFT = async (
  name: string,
  description: string,
  NFTImageBlob: Blob,
  price: number
) => {
  const NFTImageFormData = new FormData();
  NFTImageFormData.append("files", NFTImageBlob);

  const { data } = await window.point.storage.postFile(NFTImageFormData);
  const NFTImageHash = data;

  const NFTMetadataJSON = {
    description: description,
    image: NFTImageHash,
    name: name
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
      price
    ]
  });
};

const addNftProduct = async (data: any, ownerAddress: string, price: number) => {
  await window.point.contract.send({
    contract: StoreContract.name,
    method: StoreContract.addProductToStore,
    params: [data, ownerAddress, price]
  });
};

const utils = Object.freeze({
  createNFT,
  getWalletAddress,
  getAddressFromIdentity,
  getIdentityFromAddress,
  getDataFromStorage,
  getNFTs,
  addNftProduct,
  getNFTByTokenId,
  getNFTInfo,
  getProductFromNFT
});

export default utils;

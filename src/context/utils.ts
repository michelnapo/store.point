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

  const NFTs: NFTContract[] = await Promise.all(data.map(async (fakeNFT: any) => {
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

  return NFTs;
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

  const NFTs: NFTContract[] = data.map((fakeNFT: any) => ({
    address: fakeNFT[0],
    tokenId: fakeNFT[1] as number,
    price: fakeNFT[2],
    sold: fakeNFT[3]
  }));

  return NFTs[0];
};

const addNftProduct = async (data: any, ownerAddress: string, price: number) => {
  await window.point.contract.send({
    contract: StoreContract.name,
    method: StoreContract.addProductToStore,
    params: [data, ownerAddress, price]
  });
};

const utils = Object.freeze({
  getWalletAddress,
  getAddressFromIdentity,
  getIdentityFromAddress,
  getDataFromStorage,
  getNFTs,
  addNftProduct,
  getFakeNFTByTokenId,
  getNFTInfo,
  getProductFromNFT
});

export default utils;

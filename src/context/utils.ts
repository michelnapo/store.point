import { StoreContract } from "../@types/enums";
import { NFTContract, Product, StoreProduct, Nft } from "../@types/interfaces";

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

const getTokenURI = async (
  contractAddress: string,
  tokenId: number
): Promise<string> => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getTokenURI,
    params: [contractAddress, tokenId]
  });

  return data;
};

const getTokensURIs = async (tokenIds: number[]): Promise<string[]> => {
  const tokensURIs: string[] = await Promise.all(tokenIds.map(async (tokenId: number) => {
    const tokenURI = await getTokenURI("0x95Ce45A438210eEC3ab9864977ca9C49148Ae1F0", tokenId);

    return tokenURI;
  }));

  return tokensURIs;
};

const getTokenIds = async (): Promise<number[]> => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getTokenIds
  });

  return data;
};

const getNFTsFromStorage = async (uris: string[]): Promise<any> => {
  const nfts = await Promise.all(uris.map(async (uri: string) => {
    const nft = await getDataFromStorage(uri);

    return nft;
  }));

  return nfts;
};

const getStoreProduct = (product: Product, nft: Nft): StoreProduct => {
  const { name, description, image } = nft;
  const { nftContractAddress, price, sold, tokenId } = product;

  return {
    name: name,
    description: description,
    image: image,
    price: price,
    sold: sold,
    nftContractAddress: nftContractAddress,
    tokenId: tokenId
  };
};

const getStoreProducts = (products: Product[], nfts: Nft[]): StoreProduct[] => {
  const storeProducts: StoreProduct[] = [];
  for (let i = 0; i < products.length; ++i) {
    storeProducts.push(getStoreProduct(products[i], nfts[i]));
  }

  return storeProducts;
};

const getProductByTokenId = async (tokenId: number): Promise<Product> => {
  const { data } = await window.point.contract.call({
    contract: StoreContract.name,
    method: StoreContract.getProductByTokenId,
    params: [tokenId]
  });

  return {
    nftContractAddress: data[0],
    tokenId: data[1],
    price: data[2],
    sold: data[3]
  };
};

const getProductsByTokenIds = async (tokenIds: number[]): Promise<Product[]> => {
  const products = await Promise.all(tokenIds.map(async (tokenId: number) => {
    const product = await getProductByTokenId(tokenId);

    return product;
  }));

  return products;
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
  addNftProduct,
  getNFTByTokenId,
  getTokenIds,
  getNFTsFromStorage,
  getStoreProduct,
  getProductByTokenId,
  getProductsByTokenIds,
  getStoreProducts,
  getTokenURI,
  getTokensURIs
});

export default utils;

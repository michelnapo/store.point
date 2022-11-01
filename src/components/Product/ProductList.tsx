import { useEffect, useState } from "react";
import { PrimaryButton } from "..";
import { ProductCard } from "./ProductCard";
import utils from "../../context/utils";
import { Product } from "../../@types/interfaces";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    (async () => {
      const NFTs = await utils.getFakeNFTs();
      const NFTsInfo = await Promise.all(NFTs.map(async (nft) => utils.getNFTInfo(nft)));
      const _products = NFTsInfo.map(NFTInfo => utils.getProductFromNFT(NFTInfo));

      setProducts(_products);
      if (products.length === 0) {
        utils.createFakeNFTs(4);
      }
    })();
  }, []);

  return (
    <ul className="grid grid-cols-4 gap-4 flex-row flex-wrap">
      {products?.map((product, index) => (
        <li key={index}>
          <div className="flex flex-col gap-2 mb-2">
            <ProductCard product={product} />
            <PrimaryButton>Add to cart</PrimaryButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

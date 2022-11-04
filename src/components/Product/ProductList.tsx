import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "..";
import { ProductCard } from "./ProductCard";
import utils from "../../context/utils";
import { StoreProduct } from "../../@types/interfaces";
import { RoutesEnum } from "../../@types/enums";

export const ProductList = () => {
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tokenIds = await utils.getTokenIds();
      const tokenURIs = await utils.getTokensURIs(tokenIds);

      const nfts = await utils.getNFTsFromStorage(tokenURIs);
      const products = await utils.getProductsByTokenIds(tokenIds);

      const _storeProducts = utils.getStoreProducts(products, nfts);
      setStoreProducts(_storeProducts);
    })();
  }, []);

  if (storeProducts?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>No products to show</h1>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-4 gap-4 flex-row flex-wrap">
      {storeProducts?.map((storeProduct, index) => (
        <li key={index}>
          <div className="flex flex-col gap-2 mb-2">
            <ProductCard storeProduct={storeProduct} />
            <PrimaryButton onClick={() => (
              navigate(
                RoutesEnum.edit_product,
                { state: { tokenId: storeProduct.tokenId } }
              )
            )}>Edit</PrimaryButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

import { PrimaryButton } from "..";
import { ProductCard } from "./ProductCard";
import products from "../../../fake/products.json";
import productImage from "../../../fake/nft.png";

export const ProductList = () => {

  return (
    <ul className="grid grid-cols-4 gap-4 flex-row flex-wrap">
      {products.map((product, index) => (
        <li key={index}>
          <div className="flex flex-col gap-2 mb-2">
            <ProductCard product={product} productImage={productImage} />
            <PrimaryButton>Add to cart</PrimaryButton>
          </div>
        </li>
      ))}
    </ul>  
  );
};

export default ProductList;

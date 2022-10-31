import { useEffect } from "react";
import { PrimaryButton } from "..";
import { ProductCard } from "./ProductCard";
import utils from "../../context/utils";
import products from "../../../fake/products.json";
import productImage from "../../../fake/nft.png";

export const ProductList = () => {
  // const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const fakeNFTs = await utils.getFakeNFTs(); 

      console.log(fakeNFTs);
      // const fakeProducts = fakeNFTs.map(async fakeNFT => {
      //   const metadata = await window.point.storage.getString({
      //     id: fakeNFT.URI,
      //     encoding: "utf-8"
      //   }); 
      //   console.log(metadata);
      // });
    })();
    
  }, []);

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

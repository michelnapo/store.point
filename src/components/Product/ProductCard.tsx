import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../@types/enums";
import { NFTContract, ProductInfo } from "../../@types/interfaces";

export const ProductCard = (
  { product, productImage }: {
    product: NFTContract
    productImage: string
  }
) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white drop-shadow-md hover:drop-shadow-2xl rounded-lg cursor-pointer ease-linear duration-300">
      <img
        src={productImage}
        alt={`product-${product.name}`}
        className="rounded-lg"
        onClick={() => navigate(RoutesEnum.product_details, { state: { address: product.address, tokenId: product.tokenId } })}
      />
      <div className="flex flex-col place-content-around h-24 pl-4 font-bold">
        <span>{product.name}</span>
        <span>{product.price} USDT</span>
      </div>
    </div>
  )
};

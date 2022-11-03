import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../@types/enums";
import { StoreProduct } from "../../@types/interfaces";
import { getImageFromArweave } from "../../utils";

export const ProductCard = (
  { storeProduct }: { storeProduct: StoreProduct }
) => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const navigate = useNavigate();
  const { name, image, price, tokenId, nftContractAddress } = storeProduct;

  useEffect(() => {
    (async () => {
      const _imageBlob = await getImageFromArweave(image);
      setImageBlob(_imageBlob);
    })();  
  }, []);

  let imageURL = "";
  if (imageBlob) {
    imageURL = URL.createObjectURL(imageBlob);
  }

  return (
    <div className="bg-white drop-shadow-md hover:drop-shadow-2xl rounded-lg cursor-pointer ease-linear duration-300">
      <img
        src={imageURL}
        alt={`product-${storeProduct.name}`}
        className="rounded-lg"
        onClick={() => (
          navigate(
            RoutesEnum.product_details,
            { state: { address: nftContractAddress, tokenId: tokenId } }
          )
        )}
        style={{ height: "274px", width: "274px" }}
      />
      <div className="flex flex-col place-content-around h-24 pl-4 font-bold">
        <span>{name}</span>
        <span>{price} USDT</span>
      </div>
    </div>
  );
};

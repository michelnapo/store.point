import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../@types/enums";
import { Product } from "../../@types/interfaces";
import { getImageFromArweave } from "../../utils";

export const ProductCard = (
  { product }: { product: Product }
) => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const navigate = useNavigate();
  const { name, image, price, tokenId, address } = product;

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
        alt={`product-${product.name}`}
        className="rounded-lg"
        onClick={() => (
          navigate(
            RoutesEnum.product_details,
            { state: { address: address, tokenId: tokenId } }
          )
        )}
      />
      <div className="flex flex-col place-content-around h-24 pl-4 font-bold">
        <span>{name}</span>
        <span>{price} USDT</span>
      </div>
    </div>
  );
};

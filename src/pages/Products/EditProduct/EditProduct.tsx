import PageLayout from "../../../layouts/PageLayout";
import type { Product } from "../../../@types/interfaces";
import { MainTitle, SettingsHeader } from "../../../components";
import { OutlinedButton, PrimaryButton } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useEffect, useState } from "react";
import { getImageFromArweave } from "../../../utils";
import { useParams } from "react-router-dom";
import utils from "../../../context/utils";

export const EditProduct = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [productPrice, setProductPrice] = useState<number | undefined>(undefined);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  
  const { tokenId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (tokenId) {
        const nft = await utils.getNFT(parseInt(tokenId)); 
        const nftInfo = await utils.getNFTInfo(nft);
        
        const _product = utils.getProductFromNFT(nftInfo);
        setProductPrice(_product.price);
        
        console.log(_product);
        setProduct(_product);
        
        const _imageBlob = await getImageFromArweave(_product.image);
        setImageBlob(_imageBlob);
      }
    })();
  }, []);

  let imageURL = "";
  if (imageBlob) {
    imageURL = URL.createObjectURL(imageBlob);
  }

  return (
    <>
      <PageLayout>
        <SettingsHeader />
        <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
          <MainTitle> Edit Product</MainTitle>
          <section className="mb-8 mt-10"></section>
          <br />
          <div className="flex flex-row">
            <div>
              <h1 className='text-3xl font-semibold pb-4'>Picture</h1>
              <img
                src={imageURL}
                alt={`${product?.name}`}
                className="rounded-lg h-64 w-auto"
              />
              <br />
              <div className="flex">
                <h1 className='text-3xl font-semibold pb-4'>Price</h1>
                <input
                  type="text"
                  className="border-2 h-10 w-28 ml-10"
                  value={productPrice}
                  onChange={(evt) => setProductPrice(parseFloat(evt.target.value))}
                />
              </div>
            </div>
            <div className='flex-1 ml-36'>
              <h3 className='text-3xl font-semibold pb-4'>Name</h3>
              <textarea
                className={`w-full h-10 p-2 border-2 border-opacity-10 resize-none rounded bg-transparent`}
                value={product?.name}
              ></textarea>
              <h3 className='text-3xl font-semibold pb-4 mt-5'>Description</h3>
              <textarea
                className={`w-full h-44 p-2 border-2 border-opacity-10 resize-none rounded bg-transparent`}
                value={product?.description}
              ></textarea>
              <div
                className={`flex justify-end mb-3 text-sm text-opacity-40 m-1`}
              >
              </div>
              <div className='flex space-x-3'>
                <PrimaryButton>Update</PrimaryButton>
                <OutlinedButton onClick={() => navigate(-1)}>Cancel</OutlinedButton>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
    </>
  );
};

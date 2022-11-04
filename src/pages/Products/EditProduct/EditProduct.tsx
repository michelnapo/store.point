import PageLayout from "../../../layouts/PageLayout";
import type { StoreProduct } from "../../../@types/interfaces";
import { MainTitle, SettingsHeader } from "../../../components";
import { OutlinedButton, PrimaryButton } from "../../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImageFromArweave } from "../../../utils";
import utils from "../../../context/utils";
import { StoreContract, RoutesEnum } from "../../../@types/enums";
import { useAppContext } from "../../../context/AppContext";

export const EditProduct = () => {
  const [storeProduct, setStoreProduct] = useState<StoreProduct | undefined>(undefined);
  const [productPrice, setProductPrice] = useState<number | undefined>(undefined);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const { setToast } = useAppContext();
  const { state: { tokenId } } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (tokenId) {
        const CONTRACT_ADDRESS = "0x95Ce45A438210eEC3ab9864977ca9C49148Ae1F0";
        const tokenURI = await utils.getTokenURI(CONTRACT_ADDRESS, parseInt(tokenId));

        const product = await utils.getProductByTokenId(parseInt(tokenId));
        const nft = await utils.getDataFromStorage(tokenURI);

        const _storeProduct = utils.getStoreProduct(product, nft);
        const _imageBlob = await getImageFromArweave(_storeProduct.image);

        setProductPrice(_storeProduct.price);
        setImageBlob(_imageBlob);
        setStoreProduct(_storeProduct);
      }
    })();
  }, []);

  let imageURL = "";
  if (imageBlob) {
    imageURL = URL.createObjectURL(imageBlob);
  }

  const handleUpdate = async () => {
    if (tokenId) {
      const resp = await window.point.contract.send({
        contract: StoreContract.name,
        method: StoreContract.updateProductPrice,
        params: [parseInt(tokenId), productPrice]
      });
    }

    setToast({ color: "green-500", message: "Price updated successfully" });
    navigate(RoutesEnum.home);
  };

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
                alt={`${storeProduct?.name}`}
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
                value={storeProduct?.name}
              ></textarea>
              <h3 className='text-3xl font-semibold pb-4 mt-5'>Description</h3>
              <textarea
                className={`w-full h-44 p-2 border-2 border-opacity-10 resize-none rounded bg-transparent`}
                value={storeProduct?.description}
              ></textarea>
              <div
                className={`flex justify-end mb-3 text-sm text-opacity-40 m-1`}
              >
              </div>
              <div className='flex space-x-3'>
                <PrimaryButton onClick={handleUpdate}>Update</PrimaryButton>
                <OutlinedButton onClick={() => navigate(-1)}>Cancel</OutlinedButton>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
    </>
  );
};

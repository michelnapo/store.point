import PageLayout from "../../../layouts/PageLayout";
import { MainTitle, SettingsHeader } from "../../../components";
import { ErrorButton, OutlinedButton, PrimaryButton } from "../../../components/Button";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Product, ProductInfo } from "../../../@types/interfaces";
import productImageFake from "../../../../fake/nft.png";
import products from "../../../../fake/products.json";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import {UserInfo} from '../../../@types/interfaces';
import { RoutesEnum, StoreContract } from "../../../@types/enums";
import { useNavigate } from "react-router";
import utils from "../../../context/utils";
import React from "react";

export const AddProduct = ({edit, tokenId} : {edit? : boolean, tokenId? : number}) => {
  const [product, setProduct] = useState<Product>(
    {
      name: "",
      description: "",
      image: "",
      price: 0,
      sold: false,
      tokenId: 0,
      address: ""
    }
  );
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [productImage, setProductImage] = useState<Blob | null>(null);
  // const [productInfo, setProductInfo] = useState<Product>(
  //   {
  //     name: "",
  //     description: "",
  //     image: "",
  //     price: 0,
  //     sold: false,
  //     tokenId: 0,
  //     address: ""
  //   });
  const [loading, setLoading] = useState<boolean>(false);
  const {ownerAddress, theme, setToast} = useAppContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

    useEffect(() => {
        getInitialData();
    }, [])

    const getInitialData = async () => {
        if (edit) {
          setLoading(true);
          setDescription(product.description);
          if (product.image) {
              const blob = await window.point.storage.getFile({id: product.image});
              setProductImage(blob);
          }

        setLoading(false);
      }
    }
    
    useEffect(() => {
      getInitialData();
      }, [edit]);

    const handleFileButtonClick = ()  => {
        hiddenFileInput?.current?.click();
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        setProductImage(e.target.files ? e.target.files[0] : null);
    };

    const handleFinish = async () => {
      setLoading(true);
      try 
      {
          let productNftImage = '';
          if (productImage) {
              const productImageFormData = new FormData();
              productImageFormData.append('files', productImage);
              const {data} = await window.point.storage.postFile(productImageFormData);
              productNftImage = data;
          }
          
          const form = JSON.stringify({
              image: productNftImage,
              name,
              description
          } as ProductInfo);
          const file = new File([form], 'product.json', {type: 'application/json'});
          
          const formData = new FormData();
          formData.append('files', file);
          // Upload the File to arweave
          const res = await window.point.storage.postFile(formData);
          setLoading(false);
          utils.addNftProduct(res.data, ownerAddress, price);
          setToast({color: 'green-500', message: 'Product saved successfully'});
          navigate(RoutesEnum.home);
      } 
      catch (error) 
      {
          setLoading(false);
          setToast({
              color: 'red-500',
              message: 'Failed to save the product. Please try again'
          });
      }
  };

  const handleImageInput = () => {
    if (productImage) {
      return (
        <>
          <img
            src={URL.createObjectURL(productImage)}
            className='h-64 w-64 rounded-lg border-2 border-gray-200 object-cover'
            alt='profile'
          />
          <br />
          <div className='flex items-center justify-center space-x-3'>
            <p
                  className={`text-sm mt-4 transition-all text-${theme[2]} text-opacity-50 hover:text-opacity-100`}
            >
              <span 
                onClick={handleFileButtonClick}
                className='left-1/2 -translate-x-1/2 cursor-pointer underline'>
                Change
              </span>
              <input
                type='file'
                title='Upload a file'
                ref={hiddenFileInput}
                className='w-20 h-6 opacity-0 left-1/2 -translate-x-1/2 cursor-pointer hidden'
                onChange={handleFileInput}
              />
            </p>
            <p
              className={`text-sm mt-4 transition-all text-${theme[2]} text-opacity-50 hover:text-opacity-100`}
            >
            <span 
              className='cursor-pointer underline'
              onClick={() => setShowModal(true)}>
              Remove
              </span>
            </p>
        </div>
        </>
      );
    }
    else {
      return (
        <>
          <div className='rounded-lg h-64 w-64 border-2 bg-gray-100 border-gray-300 flex flex-col items-center justify-center relative overflow-hidden'>            
            <ImageOutlinedIcon
            sx={{ height: 42, width: 42 }}
            className='text-gray-500'
            />
            <p className='text-gray-500 mt-1'>Click to Upload</p>
              <input
              type='file'
              accept='image/*'
              title='Upload a file'
              className='absolute w-full h-full opacity-0 cursor-pointer'
              onChange={handleFileInput}
            />
          </div>
        </>
      );
    }
  }

  return (
    <>
      <PageLayout>
        <SettingsHeader />
          <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
          <MainTitle> {edit ? "Create" : "Register"} Product</MainTitle>
          <section className="mb-8 mt-10"></section>
          <br />
          <div className="flex flex-row">
            <div>
            <h1 className='text-3xl font-semibold pb-4'>Picture</h1>
              {edit ?
              (
                <>
                  <img
                  src={productImageFake}
                  alt={`${product?.name}`}
                  className="rounded-lg h-64 w-auto"
                  />
                </>
              ) : 
              handleImageInput()
              }
              <br />
              <div className="flex">
              <h1 className='text-3xl font-semibold pb-4'>Price</h1>
              <input onChange={()=> setPrice} type="text" className="border-2 h-10 w-28 ml-10" />
            </div>
            </div>
            <div className='flex-1 ml-36'>
              <h3 className='text-3xl font-semibold pb-4'>Name</h3>
              <textarea
                className={`w-full h-10 p-2 border-2 border-opacity-10 resize-none rounded bg-transparent`}
                onChange={(e) =>
                  e.target.value.length <= 100 && setName(e.target.value)
                }
                readOnly = {edit}
                maxLength={100}
              ></textarea>
              <h3 className='text-3xl font-semibold pb-4 mt-5'>Description</h3>
              <textarea
                className={`w-full h-44 p-2 border-2 border-opacity-10 resize-none rounded bg-transparent`}
                onChange={(e) =>
                  e.target.value.length <= 1000 && setDescription(e.target.value)
                }
                readOnly = {edit}
                maxLength={1000}
              ></textarea>
              <div
                className={`flex justify-end mb-3 text-sm text-opacity-40 m-1`}
              >
              </div>
              <div className='flex space-x-3'>
                <button
                  disabled={loading} 
                  onClick={handleFinish}
                  className="border-solid border-2 border-black px-4 py-1 bg-black text-white">
                    {edit ? "Update" : "Register"}
                </button>
                <button className="border-solid border-2 border-black px-4 py-1">Cancel</button>
              </div>
            </div>
          </div>

          {showModal && (
            <div className='fixed z-50 top-0 left-0 h-screen w-screen'>
                <div className='relative h-full w-full'>
                    <div className='absolute h-full w-full bg-black opacity-60'></div>
                    <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-${theme[0]} p-5 rounded`}
                    >
                        <h3 className='text-lg font-medium'>
                            Are you sure you want to remove your NFT product image?
                        </h3>
                        <div className='flex justify-end space-x-4 mt-4'>
                            <OutlinedButton onClick={() => setShowModal(false)}>
                              Cancel
                            </OutlinedButton>
                            <ErrorButton disabled={loading} onClick={() => {setProductImage(null); setShowModal(false)}}>
                              Remove
                            </ErrorButton>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </main>
      </PageLayout>
    </>
  );
};
  
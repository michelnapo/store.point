import PageLayout from "../../../layouts/PageLayout";
import { MainTitle, SettingsHeader } from "../../../components";
import { OutlinedButton, PrimaryButton } from "../../../components/Button";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { ProductInfo } from "../../../@types/interfaces";
import productImage from "../../../../fake/nft.png";
import products from "../../../../fake/products.json";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import {UserInfo} from '../../../@types/interfaces';
import { RoutesEnum, StoreContract } from "../../../@types/enums";
import { useNavigate } from "react-router";
import utils from "../../../context/utils";

export const AddProduct = ({edit} : {edit? : boolean}) => {
  const [product, setProduct] = useState<ProductInfo>();
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [productImage, setProductImage] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {ownerAddress, theme, setToast} = useAppContext();
  const navigate = useNavigate();

  function getProduct() {
      const product = products[0] as ProductInfo;
      setProduct(product);
  }

    useEffect(() => {
        getProduct();
    }, [])

    // const getInitialData = async () => {
    //   if (edit) {
    //       setLoading(true);
    //       setAbout(userInfo.data.about);
    //       if (userInfo.data.avatar) {
    //           const blob = await window.point.storage.getFile({id: userInfo.data.avatar});
    //           setAvatar(blob);
    //       }

    //       if (userInfo.data.headerImage) {
    //           const blob = await window.point.storage.getFile({id: userInfo.data.headerImage});
    //           setHeaderImage(blob);
    //       }

    //       setLoading(false);
    //   }

    // useEffect(() => {
    //   getInitialData();
    //   }, [edit, userInfo]);

    //   const handleFileButtonClick = ()  => {
    //       hiddenFileInput?.current?.click();
    //     };

    //   const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    //       setAvatar(e.target.files ? e.target.files[0] : null);
    //   };

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
          utils.addNftProduct(ownerAddress, res.data);
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
                    src={productImage}
                    alt={`${product?.name}`}
                    className="rounded-lg h-64 w-auto"
                    />
                    <br />
                    <div className="flex">
                      <h1 className='text-3xl font-semibold pb-4'>Price</h1>
                      <input type="text" className="border-2 h-10 w-28 ml-10" />
                    </div>
                  </>
                ) : 
                (
                  <>
                    <div className='h-56 w-56 p-8 rounded-lg border-2 bg-gray-100 border-gray-300 flex flex-col items-center justify-center relative overflow-hidden'>            
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
                        // onChange={handleFileInput}
                      />
                      </div>
                      <br />
                      <div className="flex">
                        <h1 className='text-3xl font-semibold pb-4'>Price</h1>
                        <input type="text" className="border-2 h-10 w-28 ml-10" />
                      </div>
                  </>
                )}
              </div>
              <div className='flex-1 ml-36'>
                <h3 className='text-3xl font-semibold pb-4'>Name</h3>
                <textarea
                  className={`w-full h-10 p-2 border-2 border-opacity-10 resize-none rounded bg-transparent`}
                  // onChange={(e) =>
                  //   e.target.value.length <= 1000 && setAbout(e.target.value)
                  // }
                  maxLength={100}
                ></textarea>
                <h3 className='text-3xl font-semibold pb-4 mt-5'>Description</h3>
                <textarea
                  className={`w-full h-44 p-2 border-2 border-opacity-10 resize-none rounded bg-transparent`}
                  // onChange={(e) =>
                  //   e.target.value.length <= 1000 && setAbout(e.target.value)
                  // }
                  maxLength={1000}
                ></textarea>
                <div
                  className={`flex justify-end mb-3 text-sm text-opacity-40 m-1`}
                >
                </div>
                <div className='flex space-x-3'>
                  <button className="border-solid border-2 border-black px-4 py-1 bg-black text-white">
                    {edit ? "Update" : "Register"}
                  </button>
                  <button className="border-solid border-2 border-black px-4 py-1">Cancel</button>
                </div>
              </div>
            </div>
            </main>
        </PageLayout>
      </>
    );
  };
  
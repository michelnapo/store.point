import React, { useEffect, useState } from 'react'
import MainTitle from '../../components/MainTitle'
import SettingsHeader from '../../components/SettingsHeader'
import PageLayout from '../../layouts/PageLayout'
import { OutlinedButton, PrimaryButton } from '../../components';
import products from "../../../fake/products.json";
import productImage from "../../../fake/nft.png";
import { ProductInfo } from '../../@types/interfaces';

function ProductDetails() {

  const [product, setProduct] = useState<ProductInfo>();

  function getProduct() {
    const product = products[0] as ProductInfo;
    setProduct(product);
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    <PageLayout>
      <SettingsHeader />
      <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
        <MainTitle>Product Details</MainTitle>
        <section className="mb-8 mt-10"></section>
        <br />
        <div className="flex flex-row">
          <div>

            <img
              src={productImage}
              alt={`${product?.name}`}
              className="rounded-lg h-64 w-auto"
            />

            <br />
            <div className="flex">
              <h1 className='text-2xl font-semibold pb-4'>By Seller_Name</h1>
            </div>
          </div>
          <div className='flex-1 ml-20'>
            <h2 className='text-3xl font-semibold pb-2'>{product?.name}</h2>
            <div className='pb-2'>★★★★★</div>
            <div>{product?.metadata}</div>
            <div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
          </div>
          <div className='flex-1 ml-20'>
            <div className="bg-white drop-shadow-md rounded-lg">
              <div className="flex flex-col place-content-around h-48 p-4 font-bold">
                <h3 className='text-2xl font-semibold pb-2'>{product?.price} USDT</h3>
                <PrimaryButton>Buy now</PrimaryButton>
                <OutlinedButton>Add to cart</OutlinedButton>
              </div>
            </div>
          </div>
        </div>

        <h3 className='text-3xl font-semibold pb-4 mt-5'>Comments</h3>
        <div
          className={`flex justify-end mb-3 text-sm text-opacity-40 m-1`}
        >
        </div>
      </main>
    </PageLayout>
  )
}

export default ProductDetails
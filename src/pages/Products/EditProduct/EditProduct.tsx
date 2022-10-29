import PageLayout from "../../../layouts/PageLayout";
import { MainTitle, SettingsHeader } from "../../../components";
import { OutlinedButton, PrimaryButton } from "../../../components/Button";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import productImage from "../../../../fake/nft.png";
import { ProductInfo } from "../../../@types/interfaces";
import products from "../../../../fake/products.json";
import { useEffect, useState } from "react";

export const EditProduct = () => {
    const [product, setProduct] = useState<ProductInfo>();

    function getProduct() {
        const product = products[0] as ProductInfo;
        setProduct(product);
    }

    useEffect(() => {
        getProduct();
    }, [])

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
                src={productImage}
                alt={`${product?.name}`}
                className="rounded-lg h-64 w-auto"
                />
                <br />
                <div className="flex">
                  <h1 className='text-3xl font-semibold pb-4'>Price</h1>
                  <input type="text" className="border-2 h-10 w-28 ml-10" />
                </div>
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
                  <button className="border-solid border-2 border-black px-4 py-1 bg-black text-white">Update</button>
                  <button className="border-solid border-2 border-black px-4 py-1">Cancel</button>
                </div>
              </div>
            </div>
            </main>
        </PageLayout>
      </>
    );
  };
  
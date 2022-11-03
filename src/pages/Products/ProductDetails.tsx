// import React, { useEffect, useState } from 'react'
// import MainTitle from '../../components/MainTitle'
// import SettingsHeader from '../../components/SettingsHeader'
// import PageLayout from '../../layouts/PageLayout'
// import { OutlinedButton, PrimaryButton } from '../../components';
// // import productImage from "../../../fake/nft.png";
// import { NFTContract, ProductDetailsParams } from '../../@types/interfaces';
// import { useLocation, } from 'react-router-dom';
// import utils from '../../context/utils';
//
// function ProductDetails() {
//
//   const [product, setProduct] = useState<NFTContract>();
//   const location = useLocation();
//
//   useEffect(() => {
//     (async () => {
//       const state = location.state as ProductDetailsParams
//       const nft = await utils.getNFTByTokenId(state.tokenId);
//       setProduct(nft);
//     })();
//   }, []);
//
//   return (
//     <PageLayout>
//       <SettingsHeader />
//       <main className="mt-12 mx-auto" style={{ maxWidth: "1000px" }}>
//         <MainTitle>Product Details</MainTitle>
//         <section className="mb-8 mt-10"></section>
//         <br />
//         <div className="flex flex-row">
//           <div>
//
//             <img
//               src={productImage}
//               alt={`${product?.name}`}
//               className="rounded-lg h-64 w-auto"
//             />
//
//             <br />
//             <div className="flex">
//               <h1 className='text-2xl font-semibold pb-4'>By Seller_Name</h1>
//             </div>
//           </div>
//           <div className='flex-1 ml-20'>
//             <h2 className='text-3xl font-semibold pb-2'>{product?.name}</h2>
//             <div>{product?.metadata}</div>
//           </div>
//           <div className='flex-1 ml-20'>
//             <div className="bg-white drop-shadow-md rounded-lg">
//               <div className="flex flex-col place-content-around h-48 p-4 font-bold">
//                 <h3 className='text-2xl font-semibold pb-2'>{product?.price} USDT</h3>
//                 <PrimaryButton>Buy now</PrimaryButton>
//                 <OutlinedButton>Add to cart</OutlinedButton>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </PageLayout>
//   )
// }
//
// export default ProductDetails

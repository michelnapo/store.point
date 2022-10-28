const Product = (
  { product, productImage }: {
    product: {
      name: string,
      price: number,
      metadata: string,
      sold: boolean
    },
    productImage: string
  }
) => (
  <div className="bg-white drop-shadow-md hover:drop-shadow-2xl rounded-lg cursor-pointer ease-linear duration-300">
    <img
      src={productImage}
      alt={`product-${name}`}
      className="rounded-lg"
    /> 
    <div className="flex flex-col place-content-around h-24 pl-4 font-bold">
      <span>{product.name}</span>
      <span>{product.price} USDT</span>
    </div>
  </div>
);

export default Product;

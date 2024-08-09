import { ProductType } from '@/schemaValidations/product.schema'
import CardItemGeneralForShop from './card-item-general-for-shop'

interface ListProductForSaleProps {
  products?: ProductType[];
}

export default function ListProductForSale({
  products
}: ListProductForSaleProps) {
  return (
    <div className="flex flex-wrap h-[calc(100vh-280px)] gap-5 pt-6 overflow-y-auto scrollbar-custom">
      {products?.map(product => (
        <CardItemGeneralForShop key={product._id} imageSrc={product.thumb.url} name={product.name} price={product.price} datePosted={product.createdAt} />
      ))}
    </div>
  )
}

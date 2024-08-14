import Image from 'next/image'

interface CardItemGeneralForShopProps {
  imageSrc: string;
  name: string;
  price: string;
  datePosted: string;
}

export default function CardItemGeneralForShop({
  imageSrc,
  name,
  price,
  datePosted
}: CardItemGeneralForShopProps) {
  return (
    <div className="flex bg-white w-[300px] h-[150px] p-3 rounded-md">
      <div className="flex items-center justify-center w-[30%] min-w-[30%] h-full mr-2">
        <Image
          src={imageSrc}
          height={82}
          width={126}
          alt="Image product"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 max-w-[calc(100%-32%)] flex flex-col justify-between">
        <p className="w-full font-semibold text-sm line-clamp-2 overflow-hidden">{name}</p>
        <p className="text-[#FF3D00] font-medium">{price} $</p>
        <p>16 left</p>
        <p className="text-textColor text-sm">Posted on {datePosted.split('T')[0]}</p>
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import CustomRating from './rating'
import RatingForMobile from './rating-for-mobile'

interface CartProps {
  imgSrc: string;
  imgAlt?: string;
  title: string;
  price: string | number;
  rating: number;
  tag?: string
}

function Card({ imgSrc, imgAlt = 'Image product', title, price, rating, tag }: CartProps) {
  return (
    <div className='relative bg-[#fff] text-[#000] justify-self-center flex shrink-0 grow-0 flex-col min-w-[170px] w-[160px] h-[310px] md:w-[220px] lg:w-[240px] md:h-[380px] justify-center shadow-md rounded-sm p-4'>
      {!!tag && (
        <div className="absolute top-[-4px] left-[-6px] bg-tag text-white py-1 px-3 max-w-[62px] shadow-lg rounded-sm">{tag}</div>
      )}
      <Image
        src={imgSrc}
        width={200}
        height={200}
        alt={imgAlt}
        className="w-auto h-auto self-center justify-self-start mb-2"
      />

      {/* Title */}
      <p className="mb-4 line-clamp-2">{title}</p>

      {/* Action */}
      <div className="flex justify-between items-center justify-self-end">
        {/* Rating */}
        <div className="flex-col flex-1">
          <p className="text-[#FF3D00] text-lg font-bold">{price}</p>
          <div className="hidden lg:flex">
            <CustomRating initialRating={rating} readonly/>
          </div>
          <div className="block lg:hidden">
            <RatingForMobile rating={4.5} />
          </div>
        </div>

        <Button variant="ghost">
          <ShoppingBagIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

export default Card

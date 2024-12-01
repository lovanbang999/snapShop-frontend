'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import AddProductForm from '@/components/shop/add-product/add-product-form'
import { useAddProductContext } from '@/components/shop/AddProductProvider'
import { Button } from '@/components/ui/button'
import { HelpCircle, ImagePlusIcon, SaveIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import UserDescription from '@/components/shop/add-product/user-description'

export default function AddProductPage() {
  const { isLoading, uploadedImages, productName, description } = useAddProductContext()

  console.log(description)

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-dots loading-md text-main"></span>
        </div >
      ) : (
        <>
          <AddProductForm />
          <div className="w-5/12 max-h-dvh flex flex-col overflow-hidden">
            <div className="flex justify-end gap-2 py-10">
              <Button className="bg-white text-textColor hover:text-black hover:bg-white" asChild>
                <Link href="/dashboard">
                  Cancel
                </Link>
              </Button>
              <Button className="flex bg-main items-center gap-3">
                <SaveIcon />
                Save
              </Button>
            </div>

            <div className="bg-gray-100 flex items-center justify-center mt-1 overflow-hidden mb-8">
              <div className="bg-white rounded-lg shadow-md w-full h-full max-w-4xl p-6 overflow-auto scrollbar-hide">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold text-teal-600">Review</h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <div>
                          <p>You can preview how the content you</p>
                          <p>input will display to customers. For</p>
                          <p>content that will appear in multiple</p>
                          <p>scenarios, such as the product details</p>
                          <p>page, LIVE or search result page, you</p>
                          <p>can preview it in corresponding</p>
                          <p>scenarios.</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Detail Product</h3>
                  <div className="grid grid-cols-12 gap-4">
                    {/* Left: Product Image */}
                    <div className="col-span-5">
                      {uploadedImages.length > 0 ? (
                        <Image
                          src={URL.createObjectURL(uploadedImages[0])}
                          width={100}
                          height={100}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="bg-gray-200 h-48 flex items-center justify-center rounded-sm">
                          <div className="text-gray-500 text-sm flex items-center space-x-1">
                            <ImagePlusIcon />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="col-span-7 space-y-3">
                      {productName ? (
                        <p className="text-wrap w-full overflow-hidden line-clamp-2">{productName}</p>
                      ): (
                        <div className="bg-gray-200 h-5 rounded-md w-5/6 animate-pulse"></div>
                      )}
                      <div className="bg-gray-200 h-5 rounded-md w-3/4 animate-pulse"></div>
                      <div className="bg-gray-200 h-5 rounded-md w-1/2 animate-pulse"></div>
                      <div className="bg-gray-200 h-5 rounded-md w-5/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Thumbnails and Actions */}
                <div className="flex mt-6 items-center gap-4">
                  <div className="w-[40%] flex space-x-2">
                    {[...Array(4)].map((_, i) => (
                      !!uploadedImages[i + 1] ? (
                        <Image
                          key={`iamge-${i + 1}`}
                          src={URL.createObjectURL(uploadedImages[i + 1])}
                          width={100}
                          height={100}
                          alt="Preview"
                          className="h-10 w-9 object-cover rounded-lg"
                        />
                      ) : (
                        <div key={i} className="flex items-center justify-center text-textColor bg-gray-200 h-10 w-10 rounded-sm">
                          <ImagePlusIcon className="w-4 h-4" />
                        </div>
                      )
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="px-3 py-2 bg-white rounded-md text-sm border border-gray-300 text-gray-400">Add To Cart</button>
                    <button className="px-3 py-2 bg-[#d9d9d9] text-white rounded-md text-sm">Buy Now</button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-md p-4 shadow-md w-full mt-3">
                  <div className="flex items-center">
                    {/* Left Circle */}
                    <div className="bg-gray-200 h-12 w-12 rounded-full animate-pulse"></div>

                    {/* Vertical Divider */}
                    <div className="h-10 w-px bg-gray-200 mx-4"></div>

                    {/* Right Content */}
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="bg-gray-200 h-5 rounded-sm animate-pulse"></div>
                      <div className="bg-gray-200 h-5 rounded-sm animate-pulse"></div>
                      <div className="bg-gray-200 h-5 rounded-sm animate-pulse"></div>
                      <div className="bg-gray-200 h-5 rounded-sm animate-pulse"></div>
                      <div className="bg-gray-200 h-5 rounded-sm animate-pulse"></div>
                      <div className="bg-gray-200 h-5 rounded-sm animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  {description !== '<p><br></p>' && description !== '' ? (
                    <UserDescription userContent={description} />
                  ): (
                    <div className="bg-[#f3f4f6] h-32 rounded-sm animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

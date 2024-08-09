'use client'

import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ActualClassificationType, addProductBody, AddProductBodyType } from '@/schemaValidations/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useRef, useState } from 'react'
import { ImageIcon, ImagePlusIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useAddProductContext } from '@/components/shop/AddProductProvider'
import ActualClassification from './actual-classification'
import { compressImages, handleErrorApi, handleShowErrorToast, handleShowWhiteToast } from '@/lib/utils'
import { useAppContext } from '@/app/AppProvider'
import { productRequest } from '@/apiRequests/product'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UploadSkuResultType {
  url: string;
  publicId: string;
  originalItem: ActualClassificationType;
}

interface UploadedImageResultType {
  status: number;
  payload: {
      message: string;
      status: number;
      reasonStatusCode: string;
      metaData: {
          url: string;
          publicId: string;
      }[];
  };
}

export default function AddProductForm() {
  const router = useRouter()
  const { user } = useAppContext()
  const {
    thumb,
    setThumb,
    images,
    setImages,
    convertionChartImages,
    setConvertionChartImages,
    actualClassification
  } = useAddProductContext()

  const inputFileRef = useRef<HTMLInputElement>(null)
  const inputThumbRef = useRef<HTMLInputElement>(null)
  const inputConvertionChartRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<AddProductBodyType>({
    resolver: zodResolver(addProductBody),
    defaultValues: {
      name: '',
      thumb: undefined,
      images: undefined,
      convertionChartImage: undefined,
      description: '',
      weight: 0,
      category: undefined
    }
  })

  const handleThumbChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const compressedFiles = await compressImages(files)
    setThumb(compressedFiles)
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const compressedFiles = await compressImages(files)
    setImages(compressedFiles)
  }

  const handleFileConvertionChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const compressedFiles = await compressImages(files)
    setConvertionChartImages(compressedFiles)
  }

  const onSubmit = async (productData: AddProductBodyType) => {
    if (loading) return
    setLoading(true)

    try {
      const isActuaclassificationEmpty = actualClassification.length === 0
      if (isActuaclassificationEmpty) {
        handleShowErrorToast({
          message: 'Actualclassification is not empty'
        })
        return
      }

      const isNormalGoodsCurrentInventoryEmpty = actualClassification.some(item => item.normalGoodsInventory === undefined)
      if (isNormalGoodsCurrentInventoryEmpty) {
        handleShowErrorToast({
          message: 'Current Inventory (Normal Goods) cannot be left blank'
        })
        return
      }

      const isInitialEntryPriceEmpty = actualClassification.some(item => item.initialEntryPrice === undefined)
      if (isInitialEntryPriceEmpty) {
        handleShowErrorToast({
          message: 'Initial Entry Price cannot be left blank'
        })
        return
      }

      const isOriginalSellingPriceEmpty = actualClassification.some(item => item.originalSellingPrice === undefined)
      if (isOriginalSellingPriceEmpty) {
        handleShowErrorToast({
          message: 'Original Selling Price cannot be left blank'
        })
        return
      }

      const imagesFormData = new FormData()

      // Append additional product images
      images.forEach(image => {
        if (image instanceof Blob) {
          imagesFormData.append('images', image)
        }
      })

      const thumbFormData = new FormData()
      thumbFormData.append('thumb', thumb[0])

      const userId = user?.userId as string
      const uploadPromies = [
        productRequest.uploadImage(imagesFormData, userId),
        productRequest.uploadThumb(thumbFormData, userId)
      ]

      if (convertionChartImages && convertionChartImages.length > 0) {
        const convertionFormData = new FormData()
        convertionFormData.append('convertion', convertionChartImages[0] as Blob)
        uploadPromies.push(productRequest.uploadConvertionImage(convertionFormData, userId))
      }

      // Filter out objects that have an image field that is not undefined
      const itemsWithImages = actualClassification.filter((item: ActualClassificationType) => item.image)

      // Create an array of promises for image uploads in actualClassification
      const actualClassificationUploadPromises = itemsWithImages.map(async (item) => {
        const formData = new FormData()
        formData.append('sku-image', item.image as Blob)

        const result = await productRequest.uploadSkuImage(formData, userId)
        const { url, publicId } = result.payload.metaData[0]

        return { url, publicId, originalItem: item }
      })

      const result = await Promise.all([
        ...uploadPromies,
        ...actualClassificationUploadPromises
      ])

      const [
        uploadedImageResult,
        uploadedThumbResult,
        uploadedConvertionChartResult,
        ...actualClassificationResults
      ] = result as [ UploadedImageResultType, UploadedImageResultType, UploadedImageResultType, ...UploadSkuResultType[] ]

      const finalActualClassification = actualClassification.map(actual => {
        const item = actualClassificationResults.find(i => i.originalItem === actual)

        if (item) {
          return { ...actual, image: { url: item.url, publicId: item.publicId } }
        }
        return actual
      })

      let minPrice = Infinity
      let maxPrice = -Infinity
      actualClassification.forEach(item => {
        if (item.originalSellingPrice as number < minPrice) {
          minPrice = item.originalSellingPrice as number
        }
        if (item.originalSellingPrice as number > maxPrice) {
          maxPrice = item.originalSellingPrice as number
        }
      })

      const finalData = {
        ...productData,
        thumb: uploadedThumbResult.payload.metaData[0] ?? {},
        images: uploadedImageResult.payload.metaData ?? [],
        price: `${minPrice} - ${maxPrice}`,
        convertionChartImage: uploadedConvertionChartResult.payload.metaData[0] ?? {},
        actualClassification: [...finalActualClassification]
      }

      const createProductResult = await productRequest.createProduct(finalData, userId)
      handleShowWhiteToast({
        title: 'Successfully',
        message: createProductResult.payload.message
      })

      router.push('/dashboard/products')
    } catch (error) {
      handleErrorApi({
        error
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col mb-10">
        {/* Product information */}
        <div className="h-fit w-full px-28 py-10 mt-10 rounded-sm bg-white space-y-8">
          <h5 className="text-2xl font-bold text-main">Product information</h5>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-textColor'>Product name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter name product" {...field} className="border-[1px] bg-[#F4F7FA] text-black rounded-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex gap-20">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-textColor'>Category <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full border-[1px] bg-[#F4F7FA] text-black rounded-sm">
                        <SelectValue placeholder="Select category product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="clothes">Clothes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-textColor'>Weight <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className="flex w-full border-[1px] items-center bg-[#F4F7FA] rounded-sm">
                      <Input {...field} type="number" min={0} className="w-full border-none bg-[#F4F7FA] text-black rounded-sm" />
                      <div className="w-[1px] bg-[#71717A4F] h-[30px]"></div>
                      <div className="content-center text-center w-10 text-textColor">gr</div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="thumb"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-textColor'>Product thumb <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <div className="flex items-center h-full overflow-x-auto gap-4 scrollbar-custom">
                    <Input
                      ref={inputThumbRef}
                      type="file"
                      accept='iamge/*'
                      className="border-none bg-[#F4F7FA] text-black rounded-xl cursor w-40 h-40 hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleThumbChange(e)
                        field.onChange(e.target.files)
                      }}
                    />
                    {thumb.length > 0 ? (
                      thumb?.map((image, index) => (
                        <div key={index} className="flex flex-col items-start justify-evenly h-full gap-2">
                          <div className="flex items-center justify-center bg-[#F4F7FA] w-40 h-40 rounded-md cursor-pointer border-2">
                            <Image
                              src={URL.createObjectURL(image)}
                              width={200}
                              height={200}
                              alt={image?.name || 'No image'}
                            />
                          </div>
                          <section className="flex items-center gap-2">
                            <div className='w-6 h-6'>
                              <ImageIcon className="w-6 h-6" />
                            </div>
                            <p className="line-clamp-2">{image?.name}</p>
                            <div className='w-6 h-6'>
                              <Trash2
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => setThumb(thumb.filter((_, i) => i !== index))}
                              />
                            </div>
                          </section>
                        </div>
                      ))
                    ): (
                      <div>
                        <div className="flex items-center justify-center bg-[#F4F7FA] w-40 h-40 rounded-md cursor-pointer border-2" onClick={() => inputThumbRef.current?.click()}>
                          <ImagePlusIcon />
                        </div>
                        <p className="text-sm mt-2 text-textColor">Images must be in JPEG or PNG format, maximum 1MB, and no more than 1 images per product</p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-textColor'>Product Images <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <div className="flex items-center h-full overflow-x-auto gap-4 scrollbar-custom">
                    <Input
                      ref={inputFileRef}
                      type="file"
                      accept='iamge/*'
                      className="border-none bg-[#F4F7FA] text-black rounded-xl cursor w-40 h-40 hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleFileChange(e)
                        field.onChange(e.target.files)
                      }}
                      multiple
                    />
                    {images.length > 0 ? (
                      images?.map((image, index) => (
                        <div key={index} className="flex flex-col items-start justify-evenly h-full gap-2">
                          <div className="flex items-center justify-center bg-[#F4F7FA] w-40 h-40 rounded-md cursor-pointer border-2">
                            <Image
                              src={URL.createObjectURL(image)}
                              width={200}
                              height={200}
                              alt={image?.name || 'No image'}
                            />
                          </div>
                          <section className="flex items-center gap-2">
                            <div className='w-6 h-6'>
                              <ImageIcon className="w-6 h-6" />
                            </div>
                            <p className="line-clamp-2">{image?.name}</p>
                            <div className='w-6 h-6'>
                              <Trash2
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => setImages(images.filter((_, i) => i !== index))}
                              />
                            </div>
                          </section>
                        </div>
                      ))
                    ): (
                      <div>
                        <div className="flex items-center justify-center bg-[#F4F7FA] w-40 h-40 rounded-md cursor-pointer border-2" onClick={() => inputFileRef.current?.click()}>
                          <ImagePlusIcon />
                        </div>
                        <p className="text-sm mt-2 text-textColor">Images must be in JPEG or PNG format, maximum 2MB, with a clear, high-quality display, proper lighting, and no more than 9 images per product</p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="convertionChartImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-textColor'>Size convertion chart</FormLabel>
                <FormControl>
                  <div className="flex items-center h-full overflow-x-auto gap-4 scrollbar-custom">
                    <Input
                      ref={inputConvertionChartRef}
                      type="file"
                      accept='iamge/*'
                      className="border-none bg-[#F4F7FA] text-black rounded-xl cursor w-40 h-40 hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleFileConvertionChange(e)
                        field.onChange(e.target.files)
                      }}
                    />
                    {convertionChartImages.length > 0 ? (
                      convertionChartImages?.map((image, index) => (
                        <div key={index} className="flex flex-col items-start justify-evenly h-full gap-2">
                          <div className="flex items-center justify-center bg-[#F4F7FA] w-40 h-40 rounded-md cursor-pointer border-2">
                            <Image
                              src={URL.createObjectURL(image)}
                              width={200}
                              height={200}
                              alt={image?.name || 'No image'}
                            />
                          </div>
                          <section className="flex items-center gap-2">
                            <div className='w-6 h-6'>
                              <ImageIcon className="w-6 h-6" />
                            </div>
                            <p className="line-clamp-2">{image?.name}</p>
                            <div className='w-6 h-6'>
                              <Trash2
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => setConvertionChartImages(convertionChartImages.filter((_, i) => i !== index))}
                              />
                            </div>
                          </section>
                        </div>
                      ))
                    ): (
                      <div>
                        <div className="flex items-center justify-center bg-[#F4F7FA] w-40 h-40 rounded-md cursor-pointer border-2" onClick={() => inputConvertionChartRef.current?.click()}>
                          <ImagePlusIcon />
                        </div>
                        <p className="text-sm mt-2 text-textColor">Images must be in JPEG or PNG format, maximum 1MB, and no more than 1 images per product</p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-textColor'>Product description <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-[1px] bg-[#F4F7FA] text-black rounded-sm min-h-32 scrollbar-custom" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* End product information */}

        <ActualClassification />

        <div className="flex w-full h-[100px] items-center justify-end rounded-md bg-white mt-10 p-5 gap-10">
          <Button type="button" variant="outline" className="text-xl py-6 border-main text-main hover:text-main">
            <Link href="/dashboard/products">
              Cancel
            </Link>
          </Button>
          <Button className="w-[141px] rounded-sm bg-main text-xl py-6 px-8 font-semibold" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Confirm'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

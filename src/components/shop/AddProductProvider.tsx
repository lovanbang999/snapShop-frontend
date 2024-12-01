'use client'

import { productRequest } from '@/apiRequests/product'
import { useAppContext } from '@/app/AppProvider'
import { handleErrorApi, handleShowErrorToast } from '@/lib/utils'
import {
  AddProductContextType,
  DeliveryOption,
  PriceAndStockType,
  ProductDimensionsType,
  WeightType
} from '@/types/add-product-provider'
import { createContext, useContext, useState } from 'react'

const AddProductContext = createContext<AddProductContextType | undefined>(undefined)

// Custom hook for using context
export const useAddProductContext = () => {
  const context = useContext(AddProductContext)
  if (!context) {
    throw new Error('useAddProductContext must be used within an AddProductProvider')
  }
  return context
}

export default function AddProductProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { user } = useAppContext()
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [productName, setProductName] = useState<string>('')
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [productCategory, setProductCategory] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [priceAndStock, setPriceAndStock] = useState<PriceAndStockType>({ price: 0, quantity: 0, sku: '' })
  const [weight, setWeight] = useState<WeightType>({ type: 'grams', value: 0 })
  const [productDimensions, setProductDimensions] = useState<ProductDimensionsType>({ height: 0, width: 0, length: 0 })
  const [delivery, setDelivery] = useState<'default' | 'custom'>('default')
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>({ standardShipping: false, bulkyShipping: false })

  const handleSave = async () => {
    if (isLoading) return
    setIsloading(true)

    try {
      if (!uploadedImages.length) return

      const userId = user?.userId as string
      if (!userId) handleShowErrorToast({ message: 'Bad request error!' })

      const thumbFormData = new FormData()
      thumbFormData.append('thumb', uploadedImages[0])

      if (uploadedImages.length > 1) {
        const additionalFormData = new FormData()
        for (let i = 1; i < uploadedImages.length; i++) {
          additionalFormData.append('images', uploadedImages[i])
        }

        const [thumbUploaded, additionalImagesUploaded] = await Promise.all([
          productRequest.uploadImageThumb(thumbFormData, userId),
          productRequest.uploadImages(additionalFormData, userId)
        ])

        const createProductData = {
          name: productName,
          thumb: thumbUploaded.metaData[0],
          images: additionalImagesUploaded.metaData,
          description: description,
          price: priceAndStock.price,
          sku: priceAndStock.sku,
          quantity: priceAndStock.quantity,
          weight: weight,
          height: productDimensions.height,
          width: productDimensions.width,
          length: productDimensions.length,
          category: productCategory,
          actualClassification: []
        }

        const createdProduct = await productRequest.createProduct(createProductData, userId)
      } else {
        const thumbUploaded = await productRequest.uploadImageThumb(thumbFormData, userId)

        const createProductData = {
          name: productName,
          thumb: thumbUploaded.metaData[0],
          images: [],
          description: description,
          price: priceAndStock.price,
          sku: priceAndStock.sku,
          quantity: priceAndStock.quantity,
          weight: weight,
          height: productDimensions.height,
          width: productDimensions.width,
          length: productDimensions.length,
          category: productCategory,
          actualClassification: []
        }
        const createdProduct = await productRequest.createProduct(createProductData, userId)
      }
    } catch (error) {
      handleErrorApi({
        error
      })
    } finally {
      setIsloading(false)
    }
  }

  const valueContext: AddProductContextType = {
    productName,
    setProductName,
    uploadedImages,
    setUploadedImages,
    productCategory,
    setProductCategory,
    description,
    setDescription,
    priceAndStock,
    setPriceAndStock,
    weight,
    setWeight,
    productDimensions,
    setProductDimensions,
    delivery,
    setDelivery,
    deliveryOption,
    setDeliveryOption,
    handleSave,
    isLoading,
    setIsloading
  }

  return (
    <AddProductContext.Provider value={valueContext}>
      {children}
    </AddProductContext.Provider>
  )
}

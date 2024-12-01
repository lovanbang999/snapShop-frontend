import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { toast } from '@/components/ui/use-toast'
import jwt from 'jsonwebtoken'
import imageCompression, { Options as ImageCompressionOptions } from 'browser-image-compression'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isClient = () => typeof window !== 'undefined'

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any,
  setError?: UseFormSetError<any>,
  duration?: number
}) => {
  toast({
    title: 'Error!',
    description: error?.payload?.message ?? 'An unknow error occurred!',
    variant: 'destructive',
    duration: duration ?? 1500
  })
}

export const handleShowErrorToast = ({
  title,
  message,
  duration
}: {
  title?: string,
  message: string,
  duration?: number
}) => {
  toast({
    title: title ?? 'Error!',
    description: message,
    variant: 'destructive',
    duration: duration ?? 1500
  })
}

export const handleShowWhiteToast = ({
  title,
  message,
  duration
}: {
  title?: string,
  message: string,
  duration?: number
}) => {
  toast({
    title: title ?? 'Error!',
    description: message,
    variant: 'default',
    duration: duration ?? 1500
  })
}

export const nomalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload
}

export const uploadToCloudinary = async (file: File) => {
  const url = 'https://api.cloudinary.com/v1_1/dx1baqjpz/upload'
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'image_preset')
  formData.append('folder', 'SnapShop-image')

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  })

  const data = await response.json()

  return data.secure_url
}

export const compressImages = async (
  images: File[],
  options: ImageCompressionOptions = {
    maxSizeMB: 1, // Maximum file zise (MB)
    maxWidthOrHeight: 1920, // Max width/height
    useWebWorker: true
  }
): Promise<File[]> => {
  return await Promise.all(
    images.map(image => imageCompression(image, options) )
  )
}

export const compressImage = async (
  images: File,
  options: ImageCompressionOptions = {
    maxSizeMB: 1, // Maximum file zise (MB)
    maxWidthOrHeight: 1920, // Max width/height
    useWebWorker: true
  }
): Promise<File> => await imageCompression(images, options)

export const formatPrice = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const formatCurrency = (value: string | number, currency: string = 'USD') => {
  let price = typeof value === 'string' ? parseFloat(value) : value

  const formatedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price)

  return formatedPrice
}

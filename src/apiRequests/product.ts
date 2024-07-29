import http from '@/lib/http'
import { UploadImageResType } from '@/schemaValidations/product.schema'

export const productRequest = {
  uploadImage: async (body: FormData, userId: string) =>
    http.post<UploadImageResType>('/media/product/images/upload', body, { headers: { 'x-client-id': userId } }),
  uploadThumb: async (body: any, userId: string) =>
    http.post<UploadImageResType>('/media/product/thumb/upload', body, { headers: { 'x-client-id': userId } }),
  uploadConvertionImage: async (body: any, userId: string) =>
    http.post<UploadImageResType>('/media/product/convertion/upload', body, { headers: { 'x-client-id': userId } }),
  uploadSkuImage: async (body: any, userId: string) =>
    http.post<UploadImageResType>('/media/product/sku/upload', body, { headers: { 'x-client-id': userId } }),
  createProduct: async (body: any, userId: string) =>
    http.post<UploadImageResType>('/product', body, { headers: { 'x-client-id': userId } })
}

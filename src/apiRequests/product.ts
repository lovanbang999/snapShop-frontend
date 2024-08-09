import http from '@/lib/http'
import { GetGenarelProductsResType, UploadImageResType } from '@/schemaValidations/product.schema'

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
    http.post<UploadImageResType>('/product', body, { headers: { 'x-client-id': userId } }),
  getGenarelProductsFromClientToNextServer: async (queryParams: string, userId: string) =>
    http.get<GetGenarelProductsResType>(`/api/shop/product/genarel-info-product?${queryParams}`, { baseUrl: '', headers: { 'x-client-id': userId } }),
  getGenarelProductsFromNextServerToServer: async (queryParams: string, userId: string, authorization: string) =>
    http.get<GetGenarelProductsResType>(`/product${queryParams}`, { headers: { 'x-client-id': userId, Authorization:  `Bearer ${authorization}` } })
}

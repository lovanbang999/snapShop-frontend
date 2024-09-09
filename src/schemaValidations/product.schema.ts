import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/lib/constant'
import { z } from 'zod'

export const addProductBody = z.object({
  name: z.string().min(15, {
    message: 'Product name must be at least 6 characters'
  }).max(200, {
    message: 'Product name must be less than 200 characters'
  }),
  thumb: z.instanceof(FileList, { message: 'Images is require' }),
  images: z.instanceof(FileList, { message: 'Images is require' }),
  convertionChartImage: z.instanceof(FileList, { message: 'Convertion chart must be image' }).optional(),
  description: z.string().min(120, {
    message: 'Product description must be at least 120 characters'
  }),
  weight: z.coerce.number().positive({
    message: 'Weight must be a positive number'
  }),
  category: z.string({
    required_error: 'Please select an category for you product'
  })
})

export type AddProductBodyType = z.TypeOf<typeof addProductBody>


export const addProductRes = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  shopId: z.string().regex(OBJECT_ID_RULE, { message: OBJECT_ID_RULE_MESSAGE }),
  type: z.string(),
  thumb: z.string(),
  quantity: z.number(),
  attributes: z.object({})
})

export type AddProductResType = z.TypeOf<typeof addProductRes>

export const uploadImageRes = z.object({
  message: z.string(),
  status: z.number(),
  reasonStatusCode: z.string(),
  metaData: z.array(z.object({
    url: z.string().url(),
    publicId: z.string()
  }))
})

export type UploadImageResType = z.TypeOf<typeof uploadImageRes>


export const actualClassification = z.object({
  sku: z.string(),
  skuCode: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  image: z.instanceof(File).optional(),
  barcode: z.string().optional(),
  normalGoodsInventory: z.number().optional(),
  faultyGoodsInventory: z.number().optional(),
  saftyInventory: z.number().optional(),
  initialEntryPrice: z.number().optional(),
  originalSellingPrice: z.number().optional(),
  status: z.boolean().default(true).optional()
})

export type ActualClassificationType = z.TypeOf<typeof actualClassification>

export interface ClassificationType {
  nameClassification?: string;
  options: string[];
}

const getGenarelProductsRes = z.object({
  message: z.string(),
  status: z.number(),
  reasonStatusCode: z.string(),
  metaData: z.object({
    result: z.array(z.object({
      _id: z.string(),
      name: z.string(),
      thumb: z.object({
        publicId: z.string(),
        url: z.string()
      }),
      price: z.string(),
      quantity: z.number(),
      category: z.string(),
      status: z.string(),
      createdAt: z.string()
    })),
    totalPages: z.number(),
    currentPage: z.number()
  })
})

export type GetGenarelProductsResType = z.TypeOf<typeof getGenarelProductsRes>

export type ProductType = GetGenarelProductsResType['metaData']['result']

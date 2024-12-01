import { Dispatch, SetStateAction } from 'react'

export interface PriceAndStockType {
  price: number;
  quantity: number;
  sku: string;
}

export interface WeightType {
  type: string;
  value: number;
}

export interface ProductDimensionsType {
  height: number;
  width: number;
  length: number;
}

export interface DeliveryOption {
  standardShipping: boolean;
  bulkyShipping: boolean;
}

interface AddProductContextType {
  productName: string;
  setProductName: Dispatch<SetStateAction<string>>;
  uploadedImages: File[];
  setUploadedImages: Dispatch<SetStateAction<File[]>>
  productCategory: string;
  setProductCategory: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  priceAndStock: PriceAndStockType;
  setPriceAndStock: Dispatch<SetStateAction<PriceAndStockType>>;
  weight: WeightType;
  setWeight: Dispatch<SetStateAction<WeightType>>;
  productDimensions: ProductDimensionsType;
  setProductDimensions: Dispatch<SetStateAction<ProductDimensionsType>>;
  delivery: 'default' | 'custom';
  setDelivery: Dispatch<SetStateAction<'default' | 'custom'>>;
  deliveryOption: DeliveryOption;
  setDeliveryOption: Dispatch<SetStateAction<DeliveryOption>>;
  handleSave: () => void;
  isLoading: boolean;
  setIsloading: Dispatch<SetStateAction<boolean>>;
}

'use client'

import { ActualClassificationType, ClassificationType } from '@/schemaValidations/product.schema'
import { createContext, useContext, useRef, useState } from 'react'

interface AddProductContextType {
  thumb: File[];
  setThumb: React.Dispatch<React.SetStateAction<File[]>>;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>
  convertionChartImages: File[];
  setConvertionChartImages: React.Dispatch<React.SetStateAction<File[]>>;
  actualClassification: ActualClassificationType[] | [];
  setActualClassification: React.Dispatch<React.SetStateAction<ActualClassificationType[]>>;
  classification: ClassificationType[];
  setClassification: React.Dispatch<React.SetStateAction<ClassificationType[]>>;
}

const AddProductContext = createContext<AddProductContextType>({
  thumb: [],
  setThumb: () => {},
  images: [],
  setImages: () => {},
  convertionChartImages: [],
  setConvertionChartImages: () => {},
  actualClassification: [],
  setActualClassification: () => {},
  classification: [],
  setClassification: () => {}
})

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
  const [thumb, setThumb] = useState<File[]>([])
  const [images, setImages] = useState<File[]>([])
  const [convertionChartImages, setConvertionChartImages] = useState<File[]>([])
  const [actualClassification, setActualClassification] = useState<ActualClassificationType[] | []>([])
  const [classification, setClassification] = useState<ClassificationType[]>([{
    nameClassification: undefined,
    options: ['']
  }])

  const valueContext: AddProductContextType = {
    thumb,
    setThumb,
    images,
    setImages,
    convertionChartImages,
    setConvertionChartImages,
    actualClassification,
    setActualClassification,
    classification,
    setClassification
  }

  return (
    <AddProductContext.Provider value={valueContext}>
      {children}
    </AddProductContext.Provider>
  )
}

'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { ImageIcon, ImagePlusIcon, X } from 'lucide-react'
import { useAddProductContext } from '@/components/shop/AddProductProvider'
import { compressImage } from '@/lib/utils'

export default function SelectImageInput({
  indexOfRow
}: {
  indexOfRow: number
}) {
  const { setActualClassification } = useAddProductContext()
  const [image, setImage] = useState<File | null>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleFileConvertionChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const compressedFiles = await compressImage(file)
      setImage(compressedFiles)

      setActualClassification(prev => {
        const newState = [...prev]
        const newStateItem = newState[indexOfRow]

        newState[indexOfRow] = {
          ...newStateItem,
          image: compressedFiles
        }

        return newState
      })
    }
  }

  const handleDeleteImage = () => {
    setImage(null)

    setActualClassification(prev => {
      const newState = [...prev]
      const newStateItem = newState[indexOfRow]

      newState[indexOfRow] = {
        ...newStateItem,
        image: undefined
      }

      return newState
    })
  }

  return (
    <div className="w-[200px] p-2">
      <div className="w-full border-2 rounded p-1 flex items-center justify-start bg-white">
        <input
          ref={inputFileRef}
          type="file"
          className="hidden"
          onChange={handleFileConvertionChange}
        />
        {image ? (
          <>
            <div className="h-full mr-2">
              <ImageIcon className="text-textColor" />
            </div>
            <p className="line-clamp-1">{image?.name}</p>
            <div className="h-full cursor-pointer">
              <X className="text-textColor" onClick={handleDeleteImage} />
            </div>
          </>
        ) : (
          <div className="h-full mr-2 cursor-pointer">
            <ImagePlusIcon className="text-textColor" onClick={() => inputFileRef.current?.click()} />
          </div>
        )}
      </div>
    </div>
  )
}

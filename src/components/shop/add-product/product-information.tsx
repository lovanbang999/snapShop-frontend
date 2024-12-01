'use client'

import {
  BarChartIcon,
  BoxIcon,
  ChevronDownIcon,
  ClockIcon,
  ImageIcon,
  ImagePlus,
  LucideIcon,
  Trash2Icon
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useAddProductContext } from '../AddProductProvider'

interface UploadOptionProps {
  icon: LucideIcon;
  label: string;
  isMain?: boolean;
  onSelect: (file: File) => void;
  onRemove: () => void;
  disabled: boolean;
  preview: File | null;
}

interface Step {
  label: string;
  icon: LucideIcon;
  isMain?: boolean;
}

const UploadOption: React.FC<UploadOptionProps> = ({
  icon: Icon,
  label,
  isMain = false,
  onSelect,
  onRemove,
  disabled,
  preview
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onSelect(file)
    }
  }

  return (
    <div
      className={`relative max-w-[360px] max-h-[208px] border-2 border-dashed rounded-sm p-4 flex flex-col items-center justify-center transition-colors
        ${disabled ? 'border-gray-200 bg-gray-100 cursor-not-allowed' : 'border-gray-300 cursor-pointer hover:border-main'}
        ${isMain ? 'col-span-2 row-span-2' : ''}`}
      onClick={() => !disabled && !preview && document.getElementById(`fileInput-${label}`)?.click()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <input
        id={`fileInput-${label}`}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
        disabled={disabled}
      />
      {preview ? (
        <>
          <Image
            src={URL.createObjectURL(preview)}
            alt="Preview"
            width={20}
            height={20}
            className="w-full h-full object-cover rounded-lg"
          />
          {isHovering && (
            <div
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-lg"
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
            >
              <Trash2Icon className="w-8 h-8 text-white cursor-pointer" />
            </div>
          )}
        </>
      ) : (
        <>
          <Icon className={`w-8 h-8 mb-2 ${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
          <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
          {isMain && (
            <>
              <span className="text-xs text-gray-400 mt-2">Dimensions: 600 x 600 px</span>
              <span className="text-xs text-gray-400">Maximum file size: 5 MB (Up to 9 files)</span>
              <span className="text-xs text-gray-400">Format: JPG, JPEG, PNG</span>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default function ProductInformation() {
  const {
    productName,
    setProductName,
    uploadedImages,
    setUploadedImages,
    productCategory,
    setProductCategory
  } = useAddProductContext()

  const steps: Step[] = [
    { label: 'Main Image', icon: ImagePlus, isMain: true },
    { label: 'Primary', icon: BoxIcon },
    { label: 'Secondary', icon: BoxIcon },
    { label: 'Different angle', icon: BoxIcon },
    { label: 'In use', icon: BoxIcon },
    { label: 'Variations', icon: ImageIcon },
    { label: 'Styled scenes', icon: ImageIcon },
    { label: 'Close-up', icon: ClockIcon },
    { label: 'Size & Scale', icon: BarChartIcon }
  ]

  const handleFileSelect = (file: File, index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev]
      newImages[index] = file
      return newImages
    })
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white py-4 px-4 rounded-md space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="block w-6 h-6 text-center text-white bg-main rounded-full">1</span>
        <h3 className="text-main font-semibold">Product Information</h3>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-textColor">Product name</p>
          <span className="text-red-500">*</span>
        </div>

        <Input
          placeholder="Enter the product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <p className="text-sm text-textColor font-medium">Product name must not exceed 225 characters</p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-textColor">Product iamge</p>
          <span className="text-main">*</span>
        </div>

        <div className="max-w-3xl p-4">
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <UploadOption
                key={step.label}
                icon={step.icon}
                label={step.label}
                isMain={step.isMain}
                onSelect={(file) => handleFileSelect(file, index)}
                onRemove={() => handleRemoveImage(index)}
                disabled={index > uploadedImages.length}
                preview={uploadedImages[index]}
              />
            ))}
          </div>
          <p className="text-red-500 text-sm mt-4 hidden">Please upload images in sequence, starting with the main image</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-textColor">Product category</p>
          <span className="text-red-500">*</span>
        </div>

        <Select value={productCategory} onValueChange={(value: string) => setProductCategory(value)}>
          <SelectTrigger className="w-full" icon={<ChevronDownIcon />}>
            <SelectValue placeholder="Select category product" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="clothes">Clothes</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-sm text-textColor font-medium">Product name must not exceed 225 characters</p>
      </div>
    </div>
  )
}

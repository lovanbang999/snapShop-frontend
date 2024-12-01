'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useAddProductContext } from '../AddProductProvider'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

export default function ProductDetail() {
  const { description, setDescription } = useAddProductContext()

  return (
    <div className="bg-white py-4 px-4 rounded-md space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="block w-6 h-6 text-center text-white bg-main rounded-full">2</span>
        <h3 className="text-main font-semibold">Product Details</h3>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-textColor">Product iamge</p>
          <span className="text-main">*</span>
        </div>

        <ReactQuill
          value={description}
          onChange={setDescription}
          className="rounded-sm"
          modules={{
            toolbar: [
              [{ 'color': [] }, 'bold', 'italic', 'underline'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['link', 'image'],
              [{ 'align': [] }],
              ['clean']
            ],
          }}
        />
      </div>
    </div>
  )
}

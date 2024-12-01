'use client'

import { useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ModeToggle() {
  const { setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleToggle = () => {
    setIsDarkMode(prev => !prev)

    setTimeout(() => {
      setTheme(isDarkMode ? 'light' : 'dark')
    }, 300)
  }

  return (
    <div
      className={`flex items-center w-16 h-8 p-1 bg-gray-200 rounded-full cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${isDarkMode ? 'translate-x-8' : ''
        }`}
      >
        {isDarkMode ? (
          <SunIcon className="w-4 h-4 text-black" />
        ) : (
          <MoonIcon className="w-4 h-4 text-black" />
        )}
      </div>
    </div>
  )
}

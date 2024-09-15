'use client'

import { useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

export function ModeToggle({
  bgColor = 'default'
}: {
  bgColor?: 'default' | 'white'
}) {
  const { setTheme } = useTheme()
  const [isLight, setIsLight] = useState<boolean>(true)

  const handleToggleTheme = () => {
    if (isLight) {
      setTheme('dark')
      setIsLight(false)
    } else {
      setTheme('light')
      setIsLight(true)
    }
  }

  return (
    <div
      className={clsx('flex bg-[#1A8B9F1A] rounded-full px-2 py-1 gap-2 cursor-pointer', {
        'bg-[#F4F7FAE8]': bgColor === 'white'
      })}
      onClick={handleToggleTheme}
    >
      <div className={clsx('rounded-full text-gray-500 p-1', {
        'text-main bg-white': isLight
      })}>
        <SunIcon className="w-4 h-4" />
      </div>
      <div className={clsx('rounded-full text-gray-500 p-1', {
        'text-main bg-white': !isLight
      })}>
        <MoonIcon className="w-4 h-4" />
      </div>
    </div>
  )
}

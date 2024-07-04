import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { EntityError } from './http'
import { toast } from '@/components/ui/use-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any,
  setError?: UseFormSetError<any>,
  duration?: number
}) => {
  toast({
    title: 'Error!',
    description: error?.payload?.message ?? 'An unknow error occurred!',
    variant: 'destructive',
    duration: duration ?? 1500
  })
}

export const nomalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

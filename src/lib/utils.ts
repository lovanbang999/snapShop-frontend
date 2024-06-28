import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const handleErrorApi = ({
//   error,
//   setError,
//   duration
// }: {
//   error: any,
//   setError?: UseFormSetError<any>,
//   duration?: number
// }) => {
//   if (error instanceof EntityError )
// }

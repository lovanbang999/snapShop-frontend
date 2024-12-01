import * as React from 'react'
import { cn, formatPrice } from '@/lib/utils'

export interface InputQuantityProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  onChange: (value: string) => void;
  value: string | number;
}

const InputQuantity = React.forwardRef<HTMLInputElement, InputQuantityProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.replace(/\D/g, '') // Remove non-digit characters
      onChange(inputValue)
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        value={value == 0 ? '' : value?.toString()}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    )
  }
)

InputQuantity.displayName = 'InputPrice'

export default InputQuantity

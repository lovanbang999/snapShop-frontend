import * as React from 'react'
import { cn, formatPrice } from '@/lib/utils'

export interface InputPriceProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    onChange: (value: string) => void;
    value: string | number;
  }

const InputPrice = React.forwardRef<HTMLInputElement, InputPriceProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.replace(/\D/g, '') // Remove non-digit characters
      onChange(inputValue)
    }

    return (
      <div className="relative rounded-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-7 pr-3 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            className
          )}
          value={value == 0 ? '' : formatPrice(value?.toString())}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

InputPrice.displayName = 'InputPrice'

export default InputPrice

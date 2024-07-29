'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { signUpBody, SignUpBodyType } from '@/schemaValidations/auth.schema'
import { authApiRequest } from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { useAppContext } from '@/app/AppProvider'

interface showPassState {
  [key: string]: boolean;
}

function SinUpForm() {

  const [showPass, setShowPass] = useState<showPassState>({})
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { setUser } = useAppContext()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = e.currentTarget.getAttribute('data-name')

    if (name) setShowPass(prevState => ({ ...prevState, [name]: !prevState[name] }))
  }

  // 1. Define your form.
  const form = useForm<SignUpBodyType>({
    resolver: zodResolver(signUpBody),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: SignUpBodyType) {
    if (loading) return
    setLoading(true)

    try {
      const result = await authApiRequest.signup(values)

      await authApiRequest.auth({ sessionToken: result.payload.metaData.tokens?.accessToken })

      toast({
        description: result?.payload?.message
      })

      const { _id: userId, email, username } = result?.payload?.metaData?.user

      setUser({ userId, email, username })
      localStorage.setItem('refreshToken', result?.payload?.metaData?.tokens?.refreshToken)

    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 2000
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="w-full h-full flex flex-col space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black'>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} className="border-none bg-[#F4F7FA] text-black rounded-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black'>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} type="email" className="border-none bg-[#F4F7FA] text-black rounded-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black'>password</FormLabel>
              <FormControl>
                <div className="relative flex">
                  <Input placeholder="Enter your password" {...field} type={showPass.btnPassword ? 'text': 'password'} className="border-none bg-[#F4F7FA] text-black rounded-xl" />
                  <div className="absolute right-2 top-0 translate-y-2/4 cursor-pointer" data-name="btnPassword" onClick={handleClick}>
                    {showPass.btnPassword ? <EyeSlashIcon className="w-5 h-5 text-black" /> : <EyeIcon className="w-5 h-5 text-black" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black'>Confirm password</FormLabel>
              <FormControl>
                <div className="relative flex">
                  <Input placeholder="Enter your confirm password" {...field} type={showPass.btnConfirmPassword ? 'text': 'password'} className="border-none bg-[#F4F7FA] text-black rounded-xl" />
                  <div className="absolute right-2 top-0 translate-y-2/4 cursor-pointer" data-name="btnConfirmPassword" onClick={handleClick}>
                    {showPass.btnConfirmPassword ? <EyeSlashIcon className="w-5 h-5 text-black" /> : <EyeIcon className="w-5 h-5 text-black" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {loading ? (
          <Button className="w-32 self-center bg-main rounded-xl text-lg font-semibold" disabled>
            <span className="loading loading-spinner loading-xs"></span>
          </Button>
        ) : (
          <Button type="submit" className="w-full md:w-32 self-center bg-main rounded-sm md:rounded-xl text-lg font-semibold">Sign In</Button>
        )}
      </form>
    </Form>
  )
}

export default SinUpForm

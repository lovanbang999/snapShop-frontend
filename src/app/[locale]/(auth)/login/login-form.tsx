'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import { Checkbox } from '@/components/ui/checkbox'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAppContext } from '@/app/AppProvider'
import { loginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { authApiRequest } from '@/apiRequests/auth'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'

export default function LogInForm() {

  const { setUser } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = e.currentTarget.getAttribute('data-name')

    if (name) setShowPass(prevState => !prevState)
  }

  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(loginBody),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    if (loading) return
    setLoading(true)

    try {
      const result = await authApiRequest.login(values)

      await authApiRequest.auth({ sessionToken: result?.payload?.metaData?.tokens?.accessToken })

      toast({
        description: result?.payload?.message
      })

      const { _id: userId, email, username } = result?.payload?.metaData?.user

      setUser({ userId, email, username })
      localStorage.setItem('refreshToken', JSON.stringify(result?.payload?.metaData?.tokens?.refreshToken))
      localStorage.setItem('sessionToken', JSON.stringify(result?.payload?.metaData?.tokens?.accessToken))

      router.push('/')
      router.refresh()
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col space-y-4">
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black'>password</FormLabel>
              <FormControl>
                <div className="relative flex">
                  <Input placeholder="Enter your password" {...field} type={showPass ? 'text': 'password'} className="border-none bg-[#F4F7FA] text-black rounded-xl" />
                  <div className="absolute right-2 top-0 translate-y-2/4 cursor-pointer" data-name="btnPassword" onClick={handleClick}>
                    {showPass ? <EyeSlashIcon className="w-5 h-5 text-black" /> : <EyeIcon className="w-5 h-5 text-black" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm text-textColor font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Link href='/fogot-password' className="link text-textColor text-sm">Forgot Password?</Link>
        </div>

        {loading ? (
          <Button className="w-32 self-center bg-main rounded-xl text-lg font-semibold" disabled>
            <span className="loading loading-spinner loading-xs"></span>
          </Button>
        ) : (
          <Button type="submit" className="w-full rounded-sm md:w-32 self-center bg-main md:rounded-xl text-lg font-semibold">LogIn</Button>
        )}
      </form>
    </Form>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'
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

function LogInForm() {
  const { setSessionToken } = useAppContext()
  const [showPass, setShowPass] = useState(false)

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
    const result = await authApiRequest.login(values)

    await authApiRequest.auth({ sessionToken: result.paloay.metaData.tokens })

    setSessionToken(result?.paloay?.metaData?.tokens?.accessToken)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} className="border-none bg-[#F4F7FA] rounded-xl" />
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <div className="relative flex">
                  <Input placeholder="Enter your password" {...field} type={showPass ? 'text': 'password'} className="border-none bg-[#F4F7FA] rounded-xl" />
                  <div className="absolute right-2 top-0 translate-y-2/4 cursor-pointer" data-name="btnPassword" onClick={handleClick}>
                    {showPass ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
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

        <Button type="submit" className="w-32 self-center bg-main rounded-xl text-lg font-semibold">Sign In</Button>
      </form>
    </Form>
  )
}

export default LogInForm

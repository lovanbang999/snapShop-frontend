'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import envConfig from '@/config'
import { signUpBody, SignUpBodyType } from '@/schemaValidations/auth.schema'

interface showPassState {
  [key: string]: boolean;
}

function LogInForm() {

  const [showPass, setShowPass] = useState<showPassState>({})

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
    const reusult = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/register`, {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(res => res.json())
    console.log('result:: ', reusult)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="w-full h-full flex flex-col space-y-4">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} type="email" className="border-none bg-[#F4F7FA] rounded-xl" />
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
                  <Input placeholder="Enter your password" {...field} type={showPass.btnPassword ? 'text': 'password'} className="border-none bg-[#F4F7FA] rounded-xl" />
                  <div className="absolute right-2 top-0 translate-y-2/4 cursor-pointer" data-name="btnPassword" onClick={handleClick}>
                    {showPass.btnPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
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
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <div className="relative flex">
                  <Input placeholder="Enter your confirm password" {...field} type={showPass.btnConfirmPassword ? 'text': 'password'} className="border-none bg-[#F4F7FA] rounded-xl" />
                  <div className="absolute right-2 top-0 translate-y-2/4 cursor-pointer" data-name="btnConfirmPassword" onClick={handleClick}>
                    {showPass.btnConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-32 self-center bg-main rounded-xl text-lg font-semibold">Sign In</Button>
      </form>
    </Form>
  )
}

export default LogInForm

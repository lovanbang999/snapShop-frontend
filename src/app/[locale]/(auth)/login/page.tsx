'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import LogInForm from './login-form'
import clsx from 'clsx'
import { ModeToggle } from '@/components/toggle-theme'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'

function Page() {
  const [click, setClick] = useState(false)

  return (
    <div className="relative flex items-center justify-center w-dvw h-dvh bg-third">
      <Link href='/'>
        <Button variant='ghost' className="absolute left-1 top-1 flex items-center gap-1">
          <ChevronLeftIcon className="w-5 h-5" />
          Home
        </Button>
      </Link>

      <div className="flex w-[770px] h-[490px] bg-third md:bg-light-dark rounded-xl">

        {/* Nav to signup */}
        <div className={clsx('hidden md:flex flex-col items-center justify-between w-6/12 h-full px-4 py-8 bg-main rounded-l-xl rounded-r-3xl z-10', {
          'translate-x-full duration-200 ease-linear': click
        })}>
          <Image
            src="/background-auth.svg"
            width={300}
            height={350}
            alt="background authentication"
            className="justify-self-center"
          />
          <div className="flex flex-col items-center">
            <p className="text-lg">You don&apos;t have an account yet?</p>
            <p className="text-white text-center">Enjoy an easy shopping experience in just a few steps</p>
          </div>

          <Button variant="outline" className="text-white bg-transparent" onClick={() => setClick(!click)} asChild>
            <Link href='/signup'>Sign Up</Link>
          </Button>
        </div>

        {/* Form */}
        <div className="flex flex-1 flex-col items-center py-8 px-6">
          <h2 className="text-3xl font-bold text-black">LogIn</h2>

          <div className="flex gap-3 mt-4">
            <Button asChild variant="outline" size="icon" className="w-10 h-10 p-1">
              <Link href='http://localhost:5000/v1/api/auth/google'>
                <Image
                  src="/icon-google-color.svg"
                  width={100}
                  height={100}
                  alt="google icon"
                  className="justify-self-center"
                />
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 p-1">
              <Image
                src="/icon-facebook-color.svg"
                width={100}
                height={100}
                alt="facebook icon"
                className="justify-self-center"
              />
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 p-1">
              <Image
                src="/icon-twitter-color.svg"
                width={100}
                height={100}
                alt="x icon"
                className="justify-self-center"
              />
            </Button>
          </div>

          <p className="my-4 text-black">Or log in with username and password</p>

          <LogInForm />

          <div className="flex items-center md:hidden mt-4">
            <p className="text-textColor">Do you not have an account?</p>
            <Link href='/signup' passHref className="link ml-2 text-main">
              Register now
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <ModeToggle />
      </div>
    </div>
  )
}

export default Page

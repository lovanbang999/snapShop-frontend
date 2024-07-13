'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { ModeToggle } from '@/components/toggle-theme'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import SinUpForm from './sign-up'

function Page() {
  const [click, setClick] = useState(false)

  return (
    <div className="relative flex items-center justify-center w-dvw h-dvh bg-third">
      <Link href='/' className="">
        <Button variant='ghost' className="absolute left-1 top-1 flex items-center gap-1">
          <ChevronLeftIcon className="w-5 h-5" />
          Home
        </Button>
      </Link>

      <div className="flex w-[770px] h-fit bg-third md:bg-light-dark rounded-xl">

        {/* Form */}
        <div className="flex flex-1 flex-col items-center py-8 px-6">
          <h2 className="text-3xl font-bold text-black">SignUp</h2>

          <SinUpForm />

          <div className="flex items-center md:hidden mt-4">
            <p className="text-textColor">Do you already have an account?</p>
            <Link href='/login' passHref className="link ml-2 text-main">
              Login now
            </Link>
          </div>
        </div>

        {/* Nav to login */}
        <div className={clsx('hidden md:flex flex-col items-center justify-between w-6/12 h-[100] px-4 py-8 bg-main rounded-l-3xl rounded-r-xl z-10', {
          '-translate-x-full duration-200 ease-linear': click
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
            <Link href='/login'>Login</Link>
          </Button>
        </div>
      </div>

      <div className='absolute top-1 right-1'>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Page

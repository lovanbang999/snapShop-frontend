'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import LogInForm from './sign-up'
import clsx from 'clsx'
import { ModeToggle } from '@/components/toggle-theme'

function Page() {
  const [click, setClick] = useState(false)

  return (
    <div className="relative flex items-center justify-center w-dvw h-dvh bg-third">
      <div className="flex w-[770px] h-fit bg-light-dark rounded-xl">

        {/* Form */}
        <div className="flex flex-1 flex-col items-center py-8 px-6">
          <h2 className="text-3xl font-bold text-black">SignUp</h2>

          <LogInForm />
        </div>

        {/* Nav to login */}
        <div className={clsx('flex flex-col items-center justify-between w-6/12 h-[100] px-4 py-8 bg-main rounded-l-3xl rounded-r-xl z-10', {
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

'use client'

import useCountDown from '@/customhooks/useCountDown'

export default function CountDownt() {

  const { hours, minutes, seconds } = useCountDown()

  return (
    <div className="flex gap-2 items-center">
      <div key='hours' className="flex items-center justify-center w-10 h-10 bg-white rounded-md text-[rgb(228,98,111)] font-bold">
        <p>{ hours.toString().padStart(2, '0') }</p>
      </div>
      <div className="font-bold text-white text-xl">:</div>
      <div key='minutes' className="flex items-center justify-center w-10 h-10 bg-white rounded-md text-[#E4626F] font-bold">
        <p>{ minutes.toString().padStart(2, '0') }</p>
      </div>
      <div className="font-bold text-white text-xl">:</div>
      <div key='seconds' className="flex items-center justify-center w-10 h-10 bg-white rounded-md text-[#E4626F] font-bold">
        <p>{ seconds.toString().padStart(2, '0') }</p>
      </div>
    </div>
  )
}

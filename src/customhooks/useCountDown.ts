import { useEffect, useState } from 'react'

interface TimeLeftProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ONE_SECOND_TIME = 1000

const caculateTimeLeft = (countDown: number) => {

  let timeLeft: TimeLeftProps

  timeLeft = {
    days: Math.floor(countDown / (ONE_SECOND_TIME * 60 * 60 * 24)),
    hours: Math.floor(countDown / (ONE_SECOND_TIME * 60 * 60) % 24),
    minutes: Math.floor(countDown / (ONE_SECOND_TIME * 60) % 60),
    seconds: Math.floor((countDown / ONE_SECOND_TIME) % 60)
  }

  return timeLeft
}

const useCountDown = (targetDate?: string) => {
  let countDownDate = !!targetDate ? new Date(targetDate).getTime() : new Date().setHours(23, 59, 59, 999)

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, ONE_SECOND_TIME)

    return () => clearInterval(interval)
  }, [countDownDate])

  return caculateTimeLeft(countDown)
}

export default useCountDown

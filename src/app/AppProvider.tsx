'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { UserProps } from '@/schemaValidations/appProvider.schema'

const AppContext = createContext<{
  user: UserProps | null
  setUser: (user: UserProps | null) => void
  isAuthenticated: boolean
    }>({
      user: null,
      setUser: () => {},
      isAuthenticated: false
    })

export const useAppContext = () => {
  const context = useContext(AppContext)

  return context
}

export default function AppProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [user, setUserState] = useState<UserProps | null>(() => null)

  const isAuthenticated = Boolean(user)

  const setUser = useCallback(
    (user: UserProps | null) => {
      setUserState(user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    [setUserState]
  )

  useEffect(() => {
    const _user = localStorage.getItem('user')
    setUserState(_user ? JSON.parse(_user) : null)
  }, [setUserState])

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  )
}

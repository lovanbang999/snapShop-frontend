'use client'

import { createContext, useContext, useState } from 'react'
import { UserProps } from '@/schemaValidations/appProvider.schema'

const AppContext = createContext({
  user: {},
  setUser: (prevUser: UserProps) => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('UseAppContext must be used within an AppProvider')
  }

  return context
}

export default function AppProvider({
  children,
  inititalUser = { userId: '', username: '', email: '', sessionToken: '', refreshToken: '' }
}: {
  children: React.ReactNode,
  inititalUser?: UserProps
}) {
  const [user, setUser] = useState<UserProps>(inititalUser)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

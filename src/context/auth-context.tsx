'use client'

import {
  Authenticate,
  authenticate,
  isAuthenticated,
  removeAuthToken,
} from '@/server/auth'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface AuthContextType {
  isAdmin: boolean
  login: (auth: Authenticate) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = async () => {
      const success = await isAuthenticated()

      if (success) {
        setIsAdmin(true)
      }
    }

    checkAuth()
  }, [])

  const login = async (auth: Authenticate) => {
    const success = await authenticate(auth)

    if (success) {
      setIsAdmin(true)
    }

    return success
  }

  const logout = () => {
    removeAuthToken()
    setIsAdmin(false)
  }

  const value = {
    isAdmin,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import createClient from '@/lib/supabase/client'
import {
  signInWithEmail as authSignInWithEmail,
  signOut as authSignOut,
  signUpWithEmail as authSignUpWithEmail,
} from '@/lib/auth'

type AuthContextValue = {
  user: User | null
  loading: boolean
  signInWithEmail: typeof authSignInWithEmail
  signUpWithEmail: typeof authSignUpWithEmail
  signOut: typeof authSignOut
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    let isMounted = true

    const initializeUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (!isMounted) return

      if (error) {
        setUser(null)
      } else {
        setUser(data.user)
      }

      setLoading(false)
    }

    void initializeUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      if (!isMounted) return

      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    signInWithEmail: authSignInWithEmail,
    signUpWithEmail: authSignUpWithEmail,
    signOut: authSignOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

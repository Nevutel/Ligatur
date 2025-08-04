import { createClient } from "@supabase/supabase-js"

// Check if we have valid Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Determine if we're in development/preview mode
const isDevelopment = !supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")

// Create client only if we have valid credentials
export const supabase = isDevelopment ? null : createClient(supabaseUrl!, supabaseKey!)

export type User = {
  id: string
  email: string
  created_at: string
}

// Mock user for development/preview
const mockUser: User = {
  id: "demo-user-1",
  email: "demo@ligatur.com",
  created_at: new Date().toISOString(),
}

// Auth functions with fallback behavior
export async function signUp(email: string, password: string) {
  if (isDevelopment) {
    // Simulate successful signup in development/preview
    console.log("Sign up simulated (demo mode):", { email })
    return {
      data: {
        user: { ...mockUser, email },
        session: null,
      },
      error: null,
    }
  }

  if (!supabase) {
    throw new Error("Supabase client not initialized")
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signIn(email: string, password: string) {
  if (isDevelopment) {
    // Simulate successful signin in development/preview
    console.log("Sign in simulated (demo mode):", { email })
    return {
      data: {
        user: { ...mockUser, email },
        session: {
          access_token: "demo-token",
          refresh_token: "demo-refresh",
          expires_in: 3600,
          token_type: "bearer",
          user: { ...mockUser, email },
        },
      },
      error: null,
    }
  }

  if (!supabase) {
    throw new Error("Supabase client not initialized")
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  if (isDevelopment) {
    console.log("Sign out simulated (demo mode)")
    return
  }

  if (!supabase) {
    throw new Error("Supabase client not initialized")
  }

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function getCurrentUser() {
  if (isDevelopment) {
    // Return mock user in development/preview
    return mockUser
  }

  if (!supabase) {
    throw new Error("Supabase client not initialized")
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  return user
}

export async function getSession() {
  if (isDevelopment) {
    // Return mock session in development/preview
    return {
      access_token: "demo-token",
      refresh_token: "demo-refresh",
      expires_in: 3600,
      token_type: "bearer",
      user: mockUser,
    }
  }

  if (!supabase) {
    throw new Error("Supabase client not initialized")
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return session
}

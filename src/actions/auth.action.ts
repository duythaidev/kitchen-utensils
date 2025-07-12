'use server'

import { validateEmail, validateLength } from "@/utils/validate"

export async function register(userData: any) {

  if (!validateEmail(userData.email)) {
    return { success: false, message: 'Email is invalid' }
  }

  if (!validateLength(userData.password, 6)) {
    return { success: false, message: 'Password must be at least 6 characters' }
  }

  if (userData.password !== userData.confirmPassword) {
    return { success: false, message: 'Passwords do not match' }
  }

  const res = await fetch(`${process.env.BACKEND_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: userData.email, password: userData.password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    console.log("errorData", errorData)
    return { success: false, message: errorData.message || 'Server Error' }
  }

  return { success: true, message: 'Account created successfully' }
}

export async function forgotPassword(email: string) {
  if (!validateEmail(email)) {
    return { success: false, message: 'Email is invalid' }
  }

  const res = await fetch(`${process.env.BACKEND_API}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    return { success: false, message: errorData.message || 'Server Error' }
  }

  return { success: true, message: 'Password reset link sent to your email' }
}
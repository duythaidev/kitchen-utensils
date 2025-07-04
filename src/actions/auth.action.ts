'use server'

import { validateEmail, validateLength } from "@/utils/validate";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export async function createUser(prevState: any, formData: FormData) {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const confirmPassword = formData.get('confirmPassword')?.toString() || '';

  if (!validateEmail(email)) {
    return { success: false, message: 'Email is invalid' };
  }

  if (!validateLength(password, 6)) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match' };
  }

  // const res = await fetch('/api/auth/create-user', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (res.status !== 200) {
  //   return { success: false, message: 'Failed to create account' };
  // }
  // toast.success('Account created successfully! Please log in.')
  // console.log("CREATE USER:", { email, password });
  return { success: true, message: 'Account created successfully' };
}

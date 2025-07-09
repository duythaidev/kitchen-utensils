'use client'

import { useEffect, useState } from 'react'
import { register } from '@/actions/auth.action'
import { validateEmail, validateLength } from '@/utils/validate'
import { toast } from 'sonner'
import { useRouter } from 'nextjs-toploader/app'
import { Lock } from 'lucide-react'

export default function RegisterForm() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<{ email?: string, password?: string, confirmPassword?: string }>({})
    const [pending, setPending] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newErrors = {
            email: validateEmail(email) ? '' : 'Invalid email address',
            password: validateLength(password, 6) ? '' : 'Password must be at least 6 characters',
            confirmPassword: confirmPassword === password ? '' : 'Passwords do not match',
        }
        setErrors(newErrors)

        if (Object.values(newErrors).some((err) => err)) {
            toast.error("Please fill in all fields correctly")
            return
        }

        setPending(true)
        try {
            const userData = {
                email,
                password,
                confirmPassword
            }
            const result = await register(userData)
            if (result.success) {
                toast.success("Account created successfully!");
                router.push('/login')
            } else {
                toast.error(result.message)
            }
        } catch (err: any) {
            toast.error(err.message || 'Unexpected error')
        } finally {
            setPending(false)
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <p className="block text-sm font-medium text-gray-500">Email</p>
                <div className="mt-1">
                    <input id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                            const val = e.target.value
                            setEmail(val)
                            setErrors((prev) => ({ ...prev, email: validateEmail(val) ? '' : 'Invalid email address' }))
                        }}
                        className="block w-full bg-gray-50 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
            </div>

            <div>
                <p className="block text-sm font-medium text-gray-500">Password</p>
                <div className="mt-1 relative">
                    <input id="password"
                        name="password"
                        type={passwordVisible ? 'text' : 'password'}
                        required
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => {
                            const val = e.target.value
                            setPassword(val)
                            setErrors((prev) => ({
                                ...prev,
                                password: validateLength(val, 6) ? '' : 'Password must be at least 6 characters',
                                confirmPassword: confirmPassword === val ? '' : 'Passwords do not match',
                            }))
                        }}
                        className="block w-full bg-gray-50 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400"
                    >
                        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {!passwordVisible ? (
                                <>
                                    <path d="M1 1l22 22" />
                                    <path d="M17.94 17.94A10.77 10.77 0 0 1 12 19C5 19 2 12 2 12a21.73 21.73 0 0 1 3.07-4.91M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                                </>
                            ) : (
                                <>
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </>
                            )}
                        </svg>
                    </button>
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>
            </div>

            <div>
                <p className="block text-sm font-medium text-gray-500">Re-type Password</p>
                <div className="mt-1">
                    <input name="confirmPassword"
                        type="password"
                        required
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => {
                            const val = e.target.value
                            setConfirmPassword(val)
                            setErrors((prev) => ({
                                ...prev,
                                confirmPassword: password === val ? '' : 'Passwords do not match',
                            }))
                        }}
                        className="block w-full bg-gray-50 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
            </div>

            <div>
                <button type="submit"
                    disabled={pending}
                    className="relative cursor-pointer flex w-full justify-center rounded-md bg-blue-950 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-wait"
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="size-4" />
                    </span>
                    {pending ? 'Creating...' : 'Create Account'}
                </button>
            </div>
        </form>
    )
}

'use client'

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { validateEmail } from '@/utils/validate';
import { forgotPassword } from '@/actions/auth.action';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Gọi API gửi email reset (tùy bạn cấu hình)
            if (!email) {
                toast.error('Please enter your email address.');
                return;
            }
            if (!validateEmail(email)) {
                toast.error('Please enter a valid email address.');
                return;
            }

            // const res = await forgotPassword(email);
            // if (!res.success) {
            //     toast.error(`Error: ${res.message}`);
            //     return;
            // }
            // setEmail('');
            toast.success('Password reset link has been sent to your email.');
        } catch (err: any) {
            toast.error(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full md:w-1/3">
                <div className="bg-white px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
                        <p className="text-gray-500 text-sm mt-1">Enter your email to receive reset instructions.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleForgotPassword}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="group relative cursor-pointer flex w-full justify-center items-center rounded-md border border-transparent bg-blue-950 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                Send Reset Link
                                {loading && (
                                    <LoaderCircle className="w-4 h-4 ml-2 animate-spin" />
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-indigo-600 hover:underline text-sm">
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

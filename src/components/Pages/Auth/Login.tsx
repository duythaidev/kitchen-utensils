'use client'

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();
    console.log("session", session);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!response || response?.error) {
                throw new Error(response?.error || "Invalid credentials");
            }

            toast.success("Login Successful");
            // Optionally redirect here (e.g., router.push('/'))
        } catch (error: any) {
            console.error("Login Failed:", error);
            toast.error(`Login Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full md:w-1/3">
                <div className="bg-white px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
                    <div className="text-center sm:mx-auto sm:w-full my-5">
                        <h1 className="text-3xl font-bold text-gray-900">Sign In to Your Account</h1>
                        <p className="text-gray-500">Enter your detail below</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <p className="block text-sm font-medium text-gray-500">Email</p>
                            <div className="mt-1">
                                <input
                                    name="email"
                                    type="text"
                                    data-testid="username"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full bg-gray-50 rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <p className="block text-sm font-medium text-gray-500">Password</p>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    data-testid="password"
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full bg-gray-50 rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div />
                            <div className="text-sm">
                                <Link className="font-medium text-gray-400 hover:text-gray-600" href="/">Forgot your password?</Link>
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={loading}
                                data-testid="login"
                                type="submit"
                                className={`cursor-pointer group relative flex w-full justify-center items-center rounded-md border border-transparent bg-blue-950 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50`}
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span>Sign In</span>
                                {loading &&
                                    <div className="absolute right-3  ">
                                        <LoaderCircle className="w-4 h-4 animate-spin " />
                                    </div>
                                }
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-600 font-semibold">Or</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button onClick={() => signIn('google')}
                                className="mt-8 cursor-pointer w-full flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500 transition hover:border-transparent hover:bg-black hover:text-white focus:outline-none ring-gray-400 ring-offset-2 focus:ring-2"
                            >
                                <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Sign In with Google
                            </button>
                        </div>
                    </div>

                    <div className="m-auto mt-6 w-fit md:mt-8">
                        <span className="m-auto text-gray-500">
                            Don't have an account?
                            <Link className="ml-2 hover:text-indigo-600 text-black" href="/register">Create Account</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

'use client'
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
// import { toast } from "sonner";
import { toast } from "sonner";
import Spinner from "../Custom/Spin";

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { data: session } = useSession()
    console.log("session", session)
    const handleLogin = async (formData: FormData) => {
        console.log("Submitting form", formData);
        setLoading(true);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            console.log({ response });
            // if (!response?.error) {
            //     redirect("/");
            // }

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Process response here
            console.log("Login Successful", response);
            setLoading(false);
            toast.success("Login Successful");
        } catch (error: any) {
            console.error("Login Failed:", error);
            toast.error(`Login Failed: ${error.message}`);
        }
    }
    return (
        <div className="">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className=" flex justify-between items-baseline border-b border-gray-200 py-8">
                    <h1 className="text-4xl font-bold tracking-tight text-dark">
                        Login
                    </h1>
                    <div className=' place-items-end self-center'>
                        <nav className="flex my-auto " aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-500 ">
                                        <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"> <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" /> </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" /> </svg>
                                        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-gray-500  md:ms-2">Products</a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" /> </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">Electronics</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </main>
            <div className="bg-gray-100 flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8 ">
                <div className="mt-8 sm:mx-auto sm:w-full md:w-1/3">
                    <div className="bg-white  px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
                        <div className="text-center  sm:mx-auto sm:w-full my-5">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Sign In to Your Account
                            </h1>
                            <p className="text-gray-500">Enter your detail below</p>
                        </div>
                        <form className="space-y-6" action={handleLogin}>
                            <div>
                                <p className="block text-sm font-medium text-gray-500 ">Email</p>
                                <div className="mt-1">
                                    <input name="email" type="text" data-testid="username" required placeholder="asdjhkad"
                                        className="block w-full transition bg-gray-50 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500      sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="block text-sm font-medium text-gray-500 ">Password</p>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" data-testid="password"
                                        required placeholder="asdjhkad"
                                        className="block w-full transition bg-gray-50 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500      sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                </div>
                                <div className="text-sm">
                                    <a className="font-medium text-gray-400 hover:text-gray-600" href="/">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button disabled={loading} data-testid="login" type="submit"
                                    className="cursor-pointer group relative flex w-full justify-center rounded-md border border-transparent bg-blue-950 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2   disabled:cursor-wait disabled:opacity-50">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <span>
                                        Sign In
                                    </span>

                                    {loading &&
                                        <Spinner></Spinner>
                                    }
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white  px-2 text-gray-600 font-semibold ">Or</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => signIn('google')}
                                    className="cursor-pointer inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white  px-4 py-2 text-sm font-medium text-gray-500  shadow-sm hover:bg-gray-50  disabled:cursor-wait disabled:opacity-50">
                                    <span className="sr-only">Sign in with Google</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <clipPath id="p.0">
                                            <path d="m0 0l20.0 0l0 20.0l-20.0 0l0 -20.0z" clipRule="nonzero"></path>
                                        </clipPath>
                                        <g clipPath="url(#p.0)">
                                            <path fill="currentColor" fillOpacity="0.0" d="m0 0l20.0 0l0 20.0l-20.0 0z"
                                                fillRule="evenodd"></path>
                                            <path fill="currentColor"
                                                d="m19.850197 8.270351c0.8574047 4.880001 -1.987587 9.65214 -6.6881847 11.218641c-4.700598 1.5665016 -9.83958 -0.5449295 -12.08104 -4.963685c-2.2414603 -4.4187555 -0.909603 -9.81259 3.1310139 -12.6801605c4.040616 -2.867571 9.571754 -2.3443127 13.002944 1.2301085l-2.8127813 2.7000687l0 0c-2.0935059 -2.1808972 -5.468274 -2.500158 -7.933616 -0.75053835c-2.4653416 1.74962 -3.277961 5.040613 -1.9103565 7.7366734c1.3676047 2.6960592 4.5031037 3.9843292 7.3711267 3.0285425c2.868022 -0.95578575 4.6038647 -3.8674583 4.0807285 -6.844941z"
                                                fillRule="evenodd"></path>
                                            <path fill="currentColor" d="m10.000263 8.268785l9.847767 0l0 3.496233l-9.847767 0z"
                                                fillRule="evenodd"></path>
                                        </g>
                                    </svg>
                                </button>
                                <button
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white  px-4 py-2 text-sm font-medium text-gray-500  shadow-sm hover:bg-gray-50  disabled:cursor-wait disabled:opacity-50">
                                    <span className="sr-only">Sign in with GitHub</span>
                                    <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" color="#000" width="800px" height="800px"
                                        viewBox="0 0 32 32" version="1.1">
                                        <path
                                            d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.750 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                        <div className="m-auto mt-6 w-fit md:mt-8">
                            <span className="m-auto text-gray-500">Don't have an account?
                                <Link className="ml-2 hover:text-indigo-600 text-black" href="/register">Create Account</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
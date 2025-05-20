'use client'

import Link from "next/link";
import { useState } from "react";

const Page = () => {
    const [passwordActive, setPasswordActive] = useState<boolean>(false)
    const [RepasswordActive, setRePasswordActive] = useState<boolean>(false)
    return (
        <div className="  pt-[10%]">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className=" flex justify-between items-baseline border-b border-gray-200 py-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
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
                                        <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" /> </svg>
                                        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-gray-500  md:ms-2">Products</a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" /> </svg>
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
                                Create an Account
                            </h1>


                            <p className="text-gray-500">Enter your detail below

                            </p>
                        </div>
                        <div>
                            <button className="-2 bg-gray-50 mt-8 w-full flex items-center justify-center rounded-md border border-gray-300 text-gray-500 px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
                                <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Sign Up with Google
                            </button>
                        </div>
                        <div>
                            <button className="-2 bg-gray-50 mt-3 w-full flex items-center justify-center rounded-md border border-gray-300 text-gray-500 px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
                                <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                    <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                                </svg>
                                Sign Up with GitHub

                            </button>
                        </div>
                        <div className="relative my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white  px-2 text-gray-600 font-semibold ">Or</span>
                            </div>
                        </div>
                        <form className="space-y-6">
                            <div>
                                <p className="block text-sm font-medium text-gray-500 ">Email</p>
                                <div className="mt-1">
                                    <input id="email" type="text" data-testid="username" required placeholder="asdjhkad"
                                        className="block w-full transition bg-gray-50 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500      sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="block text-sm font-medium text-gray-500 ">Password</p>
                                <div className="mt-1 relative">
                                    <input id="password" name="password" type="password" data-testid="password"
                                        required placeholder="asdjhkad"
                                        className="block w-full transition bg-gray-50 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500      sm:text-sm"
                                    />
                                    <button type="button" onClick={() => { setPasswordActive(!passwordActive) }} className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                                        <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path className={`${passwordActive ? 'hidden' : ''}`} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                            <path className={`${passwordActive ? 'hidden' : ''}`} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                            <path className={`${passwordActive ? 'hidden' : ''}`} d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                            <line className={`${passwordActive ? 'hidden' : ''}`} x1="2" x2="22" y1="2" y2="22"></line>
                                            <path className={`${!passwordActive ? 'hidden' : ''}`} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                            <circle className={`${!passwordActive ? 'hidden' : ''}`} cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className="block text-sm font-medium text-gray-500 ">Re-type Password</p>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" data-testid="password"
                                        required placeholder="asdjhkad"
                                        className="block w-full transition bg-gray-50 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500      sm:text-sm"
                                    />

                                </div>
                            </div>
                            <div>
                                <button data-testid="login" type="submit"
                                    className=" group relative flex w-full justify-center rounded-md border border-transparent bg-blue-950 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2   disabled:cursor-wait disabled:opacity-50">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <div className="m-auto mt-6 w-fit md:mt-8">
                            <span className="m-auto text-gray-500">Already have an account?
                                <Link className="ml-2 hover:text-indigo-600 text-black" href="/register">Sign in</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
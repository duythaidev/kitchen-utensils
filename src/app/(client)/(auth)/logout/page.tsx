"use client";
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function LogoutPage() {

    useEffect(() => {

        signOut({
            redirect: true,
            callbackUrl: '/login'
        });
    }, []);
    return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="w-full space-y-6 text-center">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
                        Your session has expired!
                    </h1>
                    <p className="text-gray-500">
                        Please log in again to continue.
                    </p>
                </div>
                <Link href="/login"
                    className="inline-flex h-10 items-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                    Redirecting you to login page...
                </Link>
            </div>
        </div>

    );
}
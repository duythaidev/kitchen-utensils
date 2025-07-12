"use client";
import  { useEffect } from 'react'; 
import { signOut } from 'next-auth/react'; 

export default function LogoutPage() {

    useEffect(() => {
        
        signOut({
            redirect: true,
            callbackUrl: '/login'
        });
    }, []);
    return (
        <div
            className='flex flex-col items-center justify-center h-screen'
        >
            <h1 className='text-2xl font-bold'>Session expired</h1>
        </div>

);
}
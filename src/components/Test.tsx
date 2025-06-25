'use client';

import { signIn, signOut, useSession } from "next-auth/react";

const Test = () => {
    const { data: session } = useSession()
    console.log(session);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {
                session ? (
                    <div>
                        <h1>Session Data</h1>
                        <pre>{JSON.stringify(session, null, 2)}</pre>
                        <button onClick={() => signOut()}>Sign out</button>
                    </div>
                ) : (
                    <button onClick={() => signIn('google')}>Log Session Data</button>
                )}
        </div>
    );
}

export default Test;
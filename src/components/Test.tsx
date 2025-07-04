'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import CustomCarousel from "./Carousel/CustomCarousel";
import { refreshUserList } from "@/actions/admin.user.action";

const Test = ({ data }: { data: any }) => {
    const { data: session } = useSession()
    // console.log(session);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {data.map((user: any) => (
                <div key={user.id}>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            ))}
            {/* <CustomCarousel /> 

            {
                session ? (
                    <div>
                        <h1>Session Data</h1>
                        <pre>{JSON.stringify(session, null, 2)}</pre>
                        <button onClick={() => signOut()}>Sign out</button>
                    </div>
                ) : (
                    <button onClick={() => signIn('google')}>Log Session Data</button>
                )} */}
            <button onClick={refreshUserList}>
                Refresh Data
            </button>
        </div>
    );
}

export default Test;
'use server'

import { validateEmail, validateLength } from "@/utils/validate";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export async function getProfile(accessToken: string) {
    const res = await fetch(`${process.env.BACKEND_API}/users/me`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return await res.json()
}

export async function updateProfile(id: number, data: any, accessToken: string) {
    const res = await fetch(`${process.env.BACKEND_API}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return await res.json()
}
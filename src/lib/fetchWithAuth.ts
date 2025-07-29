'use server'
import { redirect } from "next/navigation";

export const fetchWithAuth = async ({
    url,
    method = "GET",
    body,
    accessToken,
    tag,
    isFormData = false,
    cache = "no-cache",
    revalidate
}: {
    url: string;
    method?: string;
    body?: any;
    accessToken: string;
    tag?: string;
    isFormData?: boolean;
    cache?: RequestCache;
    revalidate?: number;
}) => {

    const requestHeaders: HeadersInit = new Headers();

    requestHeaders.set("Authorization", `Bearer ${accessToken}`);

    if (!isFormData) {
        requestHeaders.set("Content-Type", "application/json");
    }

    const response = await fetch(`${process.env.BACKEND_API}${url}`, {
        method,
        headers: requestHeaders,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        cache: cache,
        next: tag ? { tags: [tag] } : revalidate ? { revalidate: revalidate } : undefined,
    });
    console.log(response)

    if ([403].includes(response.status)) {
        redirect("/");
    }

    if ([401].includes(response.status)) {
        redirect("/logout");
    }

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data,
    };
};

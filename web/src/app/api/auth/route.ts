import { api } from "@/app/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)   
    const code = searchParams.get("code")

    const response = await api.post("/auth", {
        code
    })  
    const cookiesExpiresIn = 60 * 60 * 24* 30

    const redirectURL = new URL("/", request.url)
    
    return NextResponse.redirect(redirectURL, {
        headers:{
            'Set-Cookie': `token=${response.data}; Path=/; max-age=${cookiesExpiresIn}`
        }
    })
}
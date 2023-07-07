"use client"
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import Profile from "./Profile";


interface userInfo{
    name: string | undefined,
    picture: string | undefined,
}


export default function Login({name, picture}: userInfo) {
    const router = useRouter()
    const login = useGoogleLogin({
        onSuccess: async token => {
            const { access_token } = token
            router.push(`/api/auth?code=${access_token}`)
        }
    })     
    return(
        <>
        {name ? 
        (
            <div className="flex items-center gap-3 text-right mr-5">
                <Profile name={name} picture={picture}/>
            </div>
        ) : (
            <div className="flex items-center gap-3 text-right mr-5 text-sm">
                <p 
                onClick={ ()=> login()}
                className="hover:text-gray-900 cursor-pointer underline text-md">Faça seu login</p>
                <div className="flex w-10 h-10 items-center justify-center rounded-full bg-white border-2 border-black">
                    <User/>
                </div>
            </div>
           
                
        )}    
        </>
    )
}

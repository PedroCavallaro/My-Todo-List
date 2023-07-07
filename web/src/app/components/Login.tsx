"use client"
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";


interface userInfo{
    name: string | undefined,
    picture: string | undefined,
    handler: Function
}


export default function Login({name, picture, handler}: userInfo) {
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
                <div>
                    <p className="">{`Olá ${name}`}</p>
                    <a className="text-red-400 cursor-pointer hover:text-red-600 transition-all"
                    href="/api/auth/logout"
                    >
                    Sair
                    </a>
                </div>
                <div className="flex w-14 h-14 items-center justify-center rounded-full bg-white border-1 border-black overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={picture!} width={900} height={900} alt="user Picture"/>
                </div>
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

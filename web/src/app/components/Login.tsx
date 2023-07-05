"use client"
import axios from "axios";
import { useState } from "react";
import  Image  from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "lucide-react";
import { api } from "../lib/api";

interface CredentialResponse{
    name: string,
    picture: string,
    email: string
}

export default function Login() {
    const login = useGoogleLogin({
        onSuccess: async token => {
            await api.post("/auth", {
                token
            })
         
            // try{
            //     const data = await axios.get(
            //         "https://www.googleapis.com/oauth2/v3/userinfo",{
            //         headers:{
            //             "Authorization": `Bearer ${token.access_token}`
            //         }
            //     })
           
            //     console.log(data.data)
            // }catch(err){
            //     console.log(err)
            // }
        }
    })

    const [isAuth, setIsAuth] = useState<boolean>(false)
        
    return(
        <>
        {isAuth ? 
        (
            <div className="flex items-center gap-3 text-right mr-5">
                <div>
                    <p className="hover:text-gray-900">Bem vindo de volta</p>
                    <p className="text-red-400 cursor-pointer hover:text-red-600 transition-all">Logout</p>
                </div>
                <div className="flex w-14 h-14 items-center justify-center rounded-full bg-white border-2 border-black">
                    <Image src={""} width={900} height={900} alt="user Picture"/>
                </div>
            </div>
        ) : (
            <div className="flex items-center gap-3 text-right mr-5 text-sm">
                <p className="hover:text-gray-900 cursor-pointer ">Faça seu login</p>
                <div className="flex w-10 h-10 items-center justify-center rounded-full bg-white border-2 border-black">
                    <button
                    // @ts-ignore
                    onClick={login}
                    >
                        <User/>
                    </button>
                </div>
            </div>
           
                
        ) }    
        </>
    )
};

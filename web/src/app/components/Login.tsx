"use client"
import { useState } from "react";
import  Image  from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "lucide-react";
import { api } from "../lib/api";
import jwtDecode from "jwt-decode";
import { NextResponse } from "next/server";


interface userInfo{
    name: string,
    picture: string,
}


export default function Login() {
    const login = useGoogleLogin({
        onSuccess: async token => {
            const { access_token } = token
            
            await api.post("/auth", {
                code: access_token
            })  
            .then(({data}) => {
                setUserInfo(jwtDecode(data))
               
            })
        }
    })
    
    const [userInfo, setUserInfo] = useState<userInfo>()
   
        
    return(
        <>
        {userInfo ? 
        (
            <div className="flex items-center gap-3 text-right mr-5">
                <div>
                    <p className="">{`Olá ${userInfo?.name}`}</p>
                    <p className="text-red-400 cursor-pointer hover:text-red-600 transition-all">Logout</p>
                </div>
                <div className="flex w-14 h-14 items-center justify-center rounded-full bg-white border-1 border-black overflow-hidden">
                    <img src={userInfo!.picture} width={900} height={900} alt="user Picture"/>
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
           
                
        )}    
        </>
    )
}

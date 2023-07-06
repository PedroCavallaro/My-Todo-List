"use client"
import { useState } from "react";
import  Image  from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "lucide-react";
import { api } from "../lib/api";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie"

interface userInfo{
    name: string | undefined,
    picture: string | undefined,
    handler: Function
}


export default function Login({name, picture, handler}: userInfo) {
    const login = useGoogleLogin({
        onSuccess: async token => {
            const { access_token } = token
            
            await api.post("/auth", {
                code: access_token
            })  
            .then(({data}) => {
                Cookies.set("token", data, {
                    expires: 30
                })
                handler(jwtDecode(data))
            })
        }
    })        
    return(
        <>
        {name ? 
        (
            <div className="flex items-center gap-3 text-right mr-5">
                <div>
                    <p className="">{`Olá ${name}`}</p>
                    <button className="text-red-400 cursor-pointer hover:text-red-600 transition-all"
                    onClick={()=> {
                        Cookies.remove("token")
                        handler("")
                    }}
                    >
                    Sair
                    </button>
                </div>
                <div className="flex w-14 h-14 items-center justify-center rounded-full bg-white border-1 border-black overflow-hidden">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={picture} width={900} height={900} alt="user Picture"/>
                </div>
            </div>
        ) : (
            <div className="flex items-center gap-3 text-right mr-5 text-sm">
                <p className="hover:text-gray-900 cursor-pointer ">Faça seu login</p>
                <div className="flex w-10 h-10 items-center justify-center rounded-full bg-white border-2 border-black">
                    <button
                
                    onClick={ ()=> login()}
                    >
                        <User/>
                    </button>
                </div>
            </div>
           
                
        )}    
        </>
    )
}

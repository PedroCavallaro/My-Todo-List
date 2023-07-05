import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>


//eslint-disable-next-line
export const Input = forwardRef<HTMLInputElement, InputProps>(({name="", type="text", ...props}, ref)=>{
    return(
        <>
            <input 
            name={name}
            ref={ref}
            type={type} 
            {...props}
            />
        
        </>
    )
})
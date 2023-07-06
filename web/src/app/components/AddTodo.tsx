"use client"
import { Input } from "./Input";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { api } from "../lib/api";
import Cookies from "js-cookie";


const schema = z.object({
    todo: z.string().min(3, {
        message: "uma nova tarefa de ter no mínimo 3 caractéres"
    })
})
type FormData = z.infer<typeof schema>

async function createToDo(description: string){
    let token = Cookies.get("token")
    await api.post("/todos", {
            description,
    },
    {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
}

interface HandleNewToDo{
    handler: Function
}

export default function AddTodo({handler}: HandleNewToDo) {

    function HandlerNewToDo<T>(){
        handler()
    }
  
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors} 

    } = useForm<FormData>({
        mode: "onBlur",
        resolver: zodResolver(schema)
    })

    return(
        <>
            <form 
            onSubmit={handleSubmit(async ({todo})=>{  
                if(Cookies.get("token")){
                    await createToDo(todo)
                    HandlerNewToDo()
                    reset()
                }
            })}
            className="flex flex-col justify-center items-center gap-2 h-[10rem] relative select-none">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="text-2xl">Adicionar nova tarefa</h2>
                    <label htmlFor="addToDO"
                    className="">   
                        <Input 
                        {...register("todo")}
                        type="text" 
                        id="addToDO"
                        placeholder="Dar banho no cachorro..."
                        className="p-1 outline-none shadow-lg w-[25rem] h-9 rounded-l-lg"/>
                        <Input type="submit" value="Salvar" 
                        className="bg-orange-500 rounded-r-lg p-1 h-9 shadow-lg text-white cursor-pointer w-20 hover:bg-orange-600 transition" />
                    
                    </label>
                </div>
            </form>
        </>
    )
};

"use client"
import { Input } from "./Input";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { api } from "../lib/api";
import { TodosStructure } from "../page";
import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google"


const schema = z.object({
    todo: z.string().min(3, {
        message: "uma nova tarefa de ter no mínimo 3 caractéres"
    })
})
type FormData = z.infer<typeof schema>

async function createToDo(description: string){
    await api.post("/todos", {
            description,
            id: "4febfbd1-31f1-4e7e-a4f5-d696104e73d3"
    })
}

interface HandleNewToDo{
    handler: Function
}

export default function AddTodo({handler}: HandleNewToDo) {

    function HandlerNewToDo<T>(toDo: T){
        handler(toDo)
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
                const newTodo: TodosStructure ={
    
                    description: todo,
                    todoStatus:{
                        description: "Pendente" 
                    }
                }
                
                createToDo(todo)
                HandlerNewToDo(newTodo)
                reset()
            })}
            className="flex flex-col justify-center items-center gap-2 h-[10rem] relative select-none">
                <div className="w-[100%] flex justify-end h-[2rem]">
                <GoogleOAuthProvider clientId="388645190987-ehus75pnbprlu662kmhjidimqd4obget.apps.googleusercontent.com">
                    <Login/>        
                </GoogleOAuthProvider>
                </div>
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

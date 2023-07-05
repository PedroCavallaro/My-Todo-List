"use client"
import { Input } from "./Input";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { api } from "../lib/api";
import Card from "./Card";
import { TodosStructure } from "../page";


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
            className="flex flex-col justify-center items-center gap-3 h-[10rem] select-none">
                <h2 className="text-2xl">Adicionar nova tarefa</h2>
                <label htmlFor=""
                className="">   
                    <Input 
                    {...register("todo")}
                    type="text" 
                    placeholder="Dar banho no cachorro..."
                    className="p-1 outline-none shadow-lg w-[25rem] h-9 rounded-l-lg"/>
                    <Input type="submit" value="Salvar" 
                    className="bg-orange-500 rounded-r-lg p-1 h-9 shadow-lg text-white cursor-pointer w-20 hover:bg-orange-600 transition" />
                   
                </label>
            </form>
        </>
    )
};

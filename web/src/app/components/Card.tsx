import { MouseEvent } from "react"
import { Trash2 } from "lucide-react"
import { api } from "../lib/api"
import Cookies from "js-cookie"

interface CardProps{
    id: string,
    toDo: string,
    status: string,
    color: string,
    handleUpdate: Function,
    handleDelet: Function
}

async function deleteToDo(id: string) {
    let token = Cookies.get("token")
    await api.delete("/todos", {
        data:{
            id,
        },
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
}
function locateCard(e: MouseEvent){
    if(e.currentTarget.getBoundingClientRect().x < 500){
        return "Pendente"
    }
    if(e.currentTarget.getBoundingClientRect().x > 0 && e.currentTarget.getBoundingClientRect().x < 800){
        return "Em andamento"
    }
    else if (e.currentTarget.getBoundingClientRect().x > 800){
        return "Concluidos"
    }
    return ""
}
export default function Card(CardProps: CardProps) {    
    return(
        <>
        <div className=" bg-white h-32 w-52 rounded-3xl shadow-xl flex overflow-hidden justify-start flex-col gap-7 cursor-grab"
        onMouseDownCapture={(e) =>{
            e.currentTarget.style.cursor = "grabbing"
        }}
        onMouseMove={(e)=> {
          
            if(e.currentTarget.style.cursor === "grabbing"){
                    e.currentTarget.style.left = `${e.clientX - 100}px`
                    e.currentTarget.style.top = `${e.clientY - 50}px`
                    e.currentTarget.style.position = "absolute"
                    e.currentTarget.style.zIndex = "999"

            }}
        }
        onMouseUp={(e) => {


            CardProps.handleUpdate(locateCard(e), CardProps.id)


            e.currentTarget.style.position = "relative"
            e.currentTarget.style.cursor = "grab"
            e.currentTarget.style.left = `${0}px`
            e.currentTarget.style.top = `${0}px`
            e.currentTarget.style.zIndex = ""
        }}   

        
        >
            <div className="flex items-center justify-between">
                <div className={`${CardProps.color} h-4 w-28 ml-3 mt-3 rounded-full mb-1`}></div>
                <Trash2
                className="mr-3 mt-2 cursor-pointer w-5 h-5"
                onClick={()=>{
                    deleteToDo(CardProps.id)
                    CardProps.handleDelet()
                }}
                />
            </div>
            <div className="flex gap-12">
                <p className="text-black p-2 w-[60%] select-none">{CardProps.toDo}</p>
            </div>  
        </div>
        </>
    )
};

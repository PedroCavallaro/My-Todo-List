import { ClipboardList } from 'lucide-react';


export default function NoUser() {
    return(
        <div className="flex gap-2">
            <div className="w-36 h-36 ">
                <ClipboardList className="w-36 h-36" color="#FF7900"/>
            </div>
            <div className="flex flex-col justify-center gap-4">
                <h1 className="text-4xl">My To Do List</h1>
                <p>Faça seu login e começe a adicionar tarefas!</p>
            </div>
        </div>
        
    )
};

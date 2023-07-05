import { Clock1 } from 'lucide-react';
import { ListChecks } from 'lucide-react';
import {BsGraphUpArrow} from "react-icons/bs"
import Card from './Card';
import { TodosStructure } from '../page';

interface TodoSectionProps{
    title: string,
    iconId: number,
    toDos: TodosStructure[],
    handleUpdateTodo: Function
}

const colors = [
    {
        title: "Pendente",
        color: "bg-red-400"
    },
    {
        title: "Em andamento",
        color: "bg-yellow-400"
    },
    {
        title: "Concluidos",
        color: "green-400"
    },
]

const IconsArray: JSX.Element[] = [
    <Clock1 
    className='w-7 h-7'
    key={0}/>,
    <BsGraphUpArrow 
    className='w-7 h-7'
    key={1}/>,
    <ListChecks 
    className='w-7 h-7'
    key={2}/>

]

export default function TodoSection(TodoSectionProps: TodoSectionProps) {

    return(
        <>
        <div className='flex justify-center flex-col items-center gap-1 select-none'>
            <div>
                {IconsArray[TodoSectionProps.iconId]}
            </div>
            <h2 className='text-lg'>{TodoSectionProps.title}</h2>
            <section 
            id={TodoSectionProps.title}
            className="bg-[#f1f1f1] shadow-lg rounded-sm w-[30rem] h-[35rem] overflow-scroll overflow-x-hidden section">
                <div className='flex flex-wrap justify-center gap-4 mt-3'>
                    {
                        TodoSectionProps.toDos.map((toDo, index) => {
                            let color = colors.find(e => e.title === toDo.todoStatus.description)
                            if(toDo.todoStatus.description === TodoSectionProps.title)
                            return (
                                
                                    <Card 
                                    handleUpdate={TodoSectionProps.handleUpdateTodo}
                                    color={color!.color}
                                    key={index.toString()}
                                    toDo={toDo.description} 
                                    status={toDo.todoStatus.description}
                                    />
                                
                            )
                        })
                    }
                </div>
            </section>
        </div>
        </>
    )
};

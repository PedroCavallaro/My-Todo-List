import { Clock1 } from 'lucide-react';
import { ListChecks } from 'lucide-react';
import {BsGraphUpArrow} from "react-icons/bs"
import Card from './Card';

interface TodoProps{
    title: string,
    iconId: number
}
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

export default function TodoSection(TodoProps: TodoProps) {
    return(
        <>
        <div className='flex justify-center flex-col items-center gap-1'>
            <div>
                {IconsArray[TodoProps.iconId]}
            </div>
            <h2 className='text-lg'>{TodoProps.title}</h2>
            <section className="bg-[#f1f1f1] shadow-lg rounded-sm w-[30rem] h-[35rem] overflow-scroll overflow-x-hidden ">
                <div className='flex flex-wrap justify-center gap-4 mt-3'>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </section>
        </div>
        </>
    )
};

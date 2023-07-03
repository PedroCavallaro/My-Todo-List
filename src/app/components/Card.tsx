interface CardProps{
    toDo: string,
    status: number
}
export default function Card() {
    return(
        <>
        <div className=" bg-black h-32 w-52 rounded-3xl shadow-xl flex overflow-hidden justify-start flex-col gap-7">
            <div className="bg-green-600 h-4 w-28 ml-3 mt-3 rounded-full"></div>
            <div className="flex gap-12">
                <p className="text-black p-1">Fazer trabalho</p>
                <input type="checkbox" name="t" id="" 
                className="cursor-pointer"/>
            </div>  
        </div>
        </>
    )
};

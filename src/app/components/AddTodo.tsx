export default function AddTodo() {
    return(
        <>
            <form className="flex flex-col justify-center items-center gap-3 h-[10rem]">
                <h2 className="text-2xl">Adicionar nova tarefa</h2>
                <label htmlFor=""
                className="">   
                    <input type="text" 
                    className="p-1 outline-none shadow-lg w-[25rem] h-9 rounded-l-lg"/>
                    <input type="button" value="Salvar" 
                    className="bg-orange-500 rounded-r-lg p-1 h-9 shadow-lg text-white cursor-pointer w-20 hover:bg-orange-600 transition" />
                </label>
            </form>
        </>
    )
};

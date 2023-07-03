export default function AddTodo() {
    return(
        <>
            <form className="flex flex-col justify-center items-center gap-2">
                <h2>Adicionar nova tarefa</h2>
                <label htmlFor=""
                className="">
                    <input type="text" 
                    className="p-1 outline-none shadow-lg w-[20rem] rounded-l-lg"/>
                    <input type="button" value="Salvar" 
                    className="bg-orange-500 rounded-r-lg p-1 shadow-lg text-white cursor-pointer w-20" />
                </label>
            </form>
        </>
    )
};

"use client"
import AddTodo from './components/AddTodo'
import TodoSection from './components/TodoSection'
import { useState, useMemo, useEffect } from 'react';
import { api } from './lib/api';

export interface TodosStructure{
    description: string,                  
    todoStatus:{
        description: string
    }
}

export default function Home() {
  function setNewTodo(toDo: TodosStructure){
    let newTodoList = [...toDos, toDo ] 
    setToDos(newTodoList)
  }
  function updateToDo(toDoDesc: string, status: string){
    let newTodoList: TodosStructure[] = []

    newTodoList = toDos.map((toDo) => {
        if(toDo.description === toDoDesc){
            toDo.todoStatus.description = status
        }
        return toDo
    }) 

    setToDos(newTodoList)
    }

  const [toDos, setToDos] = useState<TodosStructure[]>([])

  const memo = useMemo(async ()=>{
      await api.get("/todos/4febfbd1-31f1-4e7e-a4f5-d696104e73d3")
      .then((res) => setToDos(res.data))
  },[])

  return (
    <> 
      <AddTodo handler={setNewTodo}/>
      <main className='flex justify-center gap-4 '>
     
        <TodoSection title='Pendente'  
        handleUpdateTodo={updateToDo} 
        toDos={toDos} 
        iconId={0}/>
        
        <TodoSection title='Em andamento' 
        handleUpdateTodo={updateToDo}
        toDos={toDos} 
        iconId={1}
        />
        <TodoSection title='Concluidos'
        handleUpdateTodo={updateToDo}
        toDos={toDos} iconId={2}/>
      </main>
    </>
  )
}

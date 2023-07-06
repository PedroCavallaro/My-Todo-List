"use client"
import AddTodo from './components/AddTodo'
import TodoSection from './components/TodoSection'
import { useState, useMemo, useEffect } from 'react';
import { api } from './lib/api';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import  cookies  from 'next/headers';
import Login from './components/Login';
import NoUser from './components/NoUser';


interface userInfo{
  name: string,
  picture: string,
}

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
  function getUserInfo(data: userInfo){
    setUserInfo(data)
  }
  const [toDos, setToDos] = useState<TodosStructure[]>([])
  const [userInfo, setUserInfo] = useState<userInfo>()

  
  let token = Cookies.get("token")

  const memo = useMemo(async ()=>{
      if(Cookies.get("token")){
        await api.get("/todos",{
          headers: {
            "Authorization": `Bearer ${token}`
            }
          })
          .then((res) => setToDos(res.data))
          setUserInfo(jwtDecode(token!))
        }
  },[token])

  return (
    <> 
      <div className="w-[100%] flex justify-end h-[2rem] mt-4">      
        <GoogleOAuthProvider clientId="388645190987-ehus75pnbprlu662kmhjidimqd4obget.apps.googleusercontent.com">
            <Login name={userInfo?.name} picture={userInfo?.picture} handler={getUserInfo}/>        
        </GoogleOAuthProvider>
        </div>
      <AddTodo handler={setNewTodo}/>
      {userInfo? (
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
      ) : (
        <main className='flex h-[20rem] overflow-hidden justify-center items-center'>
            <NoUser/>
        </main>
      )}
    </>
  )
}

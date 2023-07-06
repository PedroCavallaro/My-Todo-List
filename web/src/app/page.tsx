"use client"
import AddTodo from './components/AddTodo'
import TodoSection from './components/TodoSection'
import { useState, useMemo} from 'react';
import { api } from './lib/api';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import NoUserLogged from './components/NoUserLogged';


interface userInfo{
  name: string,
  picture: string,
}

export interface TodosStructure{
    id: string,
    description: string,                  
    todoStatus:{
        description: string
    }
}
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function Home() {
    async function upteTodoOnDb(id: string, status: string) {
           await api.put("/todos",{
                id,
                status
              },
              {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
              }
              )
    }
    async function updateToDoList(){
        let token = Cookies.get("token")
        if(Cookies.get("token")){
            await api.get("/todos",{
            headers: {
                "Authorization": `Bearer ${token}`
                }
            })
            .then(({data}) => {
                console.log(data)
                setToDos(data)
            })
        }
    }
   function updateToDo(status: string, id: string){
      let newTodoList: TodosStructure[] = []
      newTodoList = toDos.map((toDo) => {
    
          if(toDo.id === id){
              toDo.todoStatus.description = status 
              upteTodoOnDb(id, status)
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
        <GoogleOAuthProvider clientId={`${clientId}`}>
            <Login name={userInfo?.name} picture={userInfo?.picture} handler={getUserInfo}/>        
        </GoogleOAuthProvider>
        </div>
        <AddTodo handler={updateToDoList}/>
      {userInfo? (
      <>
      <main className='flex justify-center gap-4 '>
     
        <TodoSection title='Pendente'  
            handleUpdateTodo={updateToDo} 
            handleDelet={updateToDoList}
            toDos={toDos} 
            iconId={0}/>
        
        <TodoSection title='Em andamento' 
            handleUpdateTodo={updateToDo}
            handleDelet={updateToDoList}
            toDos={toDos}
            iconId={1}
        />
        <TodoSection title='Concluidos'
            handleDelet={updateToDoList}
            handleUpdateTodo={updateToDo}
            toDos={toDos} iconId={2}/>
      </main>
        </>
      ) : (
        <main className='flex h-[20rem] overflow-hidden justify-center items-center'>
            <NoUserLogged/>
        </main>
      )}
    </>
  )
}

import AddTodo from './components/AddTodo'
import TodoSection from './components/TodoSection'

export default function Home() {
  return (
    <> 
      <AddTodo/>
      <main className='flex justify-center gap-4'>
        
        {/* <Card/> */}
        <TodoSection title='Pendente' iconId={0}/>
        <TodoSection title='Em andamento' iconId={1}/>
        <TodoSection title='Concluidos' iconId={2}/>
      </main>
    </>
  )
}

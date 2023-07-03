import Image from 'next/image'
import Card from './components/Card'
import AddTodo from './components/AddTodo'

export default function Home() {
  return (
    <> 
      <main className='flex flex-col justify-center'>
        <AddTodo/>
        
        <Card/>
      </main>
    </>
  )
}

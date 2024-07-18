import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let string = localStorage.getItem("todos")
    if (string) {
      let t = JSON.parse(localStorage.getItem("todos"))
      settodos(t)
    }
  }, [])


  const saveTLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodo = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodo)
    saveTLS()
  }

  const handleDelete = (e, id) => {
    let newTodo = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodo)
    saveTLS()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveTLS()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveTLS()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-200 p-5 rounded-xl my-1 min-h-[80vh]">
        <div className="addTodo my-3">
          <h2 className='text-lg font-bold'>Add your todos</h2>
          <input onChange={handleChange} value={todo} className='w-2/3 md:w-1/3' type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 1} className='bg-violet-800 disabled:bg-red-600 hover:bg-violet-900 mx-5 px-2 p-1 text-white font-bold rounded-md'>Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        {todos.length === 0 && <div>🚀Congratulations No Todos😎🚀</div>}
        {todos.map(item => {
          return <div key={item.id} className="todo flex w-full md:w-1/2 justify-between my-2">
            <div className="flex gap-5 items-center">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className="button flex h-full">
              <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-900 px-2 py-2 text-white font-bold rounded-md mx-2'><FaRegEdit /></button>
              <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-900 px-2 py-2 text-white font-bold rounded-md mx-2'><MdDelete />
              </button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App

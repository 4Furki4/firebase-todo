import { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import Todo from './Components/Todo'
import { query as firebaseQuery, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-2xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `boder p-2 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
}
function App() {
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [input, setInput] = useState<string>("")
  // Todos:
  // 1. Read todo from firebase
  // 2. Update todo in firebase
  // 3. Delete todo from firebase

  useEffect(() => {
    const query = firebaseQuery(collection(db, "todos"))
    const unsubscribe = onSnapshot(query, snapshot => {
      let todosFromFireBase: Todo[] = []
      snapshot.forEach(doc => {
        todosFromFireBase.push({ ...doc.data(), id: doc.id } as Todo)
      })
      setTodos(todosFromFireBase)
    })
    return () => unsubscribe()
  }, [])

  async function toggleComplete(todo: Todo) {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }
  async function deleteTodo(todoId: string) {
    await deleteDoc(doc(db, "todos", todoId))
  }
  async function createTodo(event: any) {
    event.preventDefault()
    if (!input) {
      return alert("Please enter a todo")
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false
    })

    setInput("")
  }
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form
          onSubmit={createTodo}
          className={style.form}
          action="">
          <input
            value={input}
            onChange={event => setInput(event.target.value)}
            className={style.input}
            placeholder='Add Todo'
            type="text" name="" id="" />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => <Todo deleteTodo={deleteTodo} key={index} todo={todo} toggleComplete={toggleComplete} />)}
        </ul>
        <p className={style.count}>{
          todos.length > 0 && todos.length === 1 ?
            "You have 1 todo" :
            todos.length > 0 && todos.length > 1 ?

              `You have ${todos.length} todos` :
              "You have no todos"
        }
        </p>
      </div>
    </div>
  )
}

export default App

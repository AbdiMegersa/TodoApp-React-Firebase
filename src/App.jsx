import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import {db} from './firebase'
import {query, collection, onSnapshot,deleteDoc,  updateDoc, doc, addDoc} from 'firebase/firestore'
import { async } from '@firebase/util';


const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState(['Learn Redux', 'Grind leetcode']);
  const [input, setInput] = useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    if(input === ''){
      alert('Please enter valid todo')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input, 
      completed: false
    })
    setInput('')
  }


  useEffect(()=>{
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = []
      querySnapshot.forEach(doc => {
        todoArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todoArr)
    })
    return ()=> unsubscribe()
  },[])

  const toggleComplete = async (todo) => {
    console.log('Updating');
    await updateDoc( doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }


  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((t,index) => {
            return (
            <Todo
              key={index}
              todo={t}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
            )
          })}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
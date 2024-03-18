import React, { useState } from 'react'
import './Todolist.css'
import {BiCheckCircle, BiCheckDouble, BiEdit, BiRefresh, BiReset, BiTrash } from "react-icons/bi";

function Todo() {
    const [todos, setTodos] = useState([])
    const [inputvalue, setInputvalue] = useState('')
    const [editIndex, setEditIndex] = useState(-1)

    const addTodo =() => {
        if(inputvalue.trim() !== ''){
            if (editIndex !== -1) {
              const updateTodos = [...todos] 
              updateTodos[editIndex] = {task: inputvalue, completed: updateTodos[editIndex].completed}
              setTodos(updateTodos)
              setInputvalue('')
              setEditIndex(-1)
            }else{
                setTodos([...todos, {task: inputvalue, completed: false}])
                setInputvalue('')
            }
        }
    }
    const startEdit = (index) =>{
          setInputvalue(todos[index].task)
          setEditIndex(index)
    }

    const cancelEdit = () =>{
        setInputvalue('')
        setEditIndex(-1)
    }
    const removeTodo = (index)=>{
        const updateTodos = todos.filter((_, i) => i !== index)
        setTodos(updateTodos)
    }
    const toggelCompleted = (index)=>{
      const updateTodos = [...todos]
      updateTodos[index].completed = !updateTodos[index].completed
    }

  return (
    <div className='todo-container'>
        <h1>To Do List</h1>
        <div className='input-section'>
            <input type="text" value={inputvalue} onChange={(e)=>setInputvalue(e.target.value)} 
            placeholder='enter new task' className="input-fields" />
            {editIndex !== -1 ?(
              <>
              <button onClick={addTodo}  className='updat-btn'><BiCheckDouble/></button>
              <button onClick={cancelEdit} className='cancel-btn'><BiRefresh/></button>
              </>
            ) : (
                <button onClick={addTodo} className='addtask-btn'>Add</button>
            )}     
        </div>

        <ul className="todo-list">
            {todos.map((todo, index)=>(
             <li key={index} className={todo.completed ? 'completed' : ''}>
            {todo.task}
            <div className="btn-group">
                <button onClick={startEdit}  className='btn-edit'><BiEdit/></button>
                <button onClick={removeTodo}  className='btn-trash'><BiTrash/></button>
                <button onClick={()=>toggelCompleted(index)}  className='btn-remove'>
                    {todo.completed ? <BiReset/> : <BiCheckCircle/>}
                </button>
            </div>
             </li>
            ))

            }
        </ul>
    </div>
  )
}

export default Todo
import {useState, useEffect} from 'react'
import s from './counter.module.scss';

interface Todo {
  id: number;
  text: string;
  isEdit: boolean;
}

export const Counter = () => {
  const [input, setInput] = useState('')
  const [editText, setEditText] = useState('')
  const [filterText, setFilterText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: Math.random(),
      text: 'todo',
      isEdit: false
    }
  ])
  const [todos1, setTodos1] = useState<Todo[]>([])

  useEffect(() => {
    setTodos1(todos)
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const addTodo = () => {
    setTodos((todos) => (
      [
        ...todos,
        {
          id: Math.random(),
          text: input,
          isEdit: false
        }
      ]
    ))
    setTodos1((todos) => (
      [
        ...todos,
        {
          id: Math.random(),
          text: input,
          isEdit: false
        }
      ]
    ))
  }

  const editTodoClick = (id: number, isEdit: boolean) => {
    const updateTodo = todos.map((item) => {
      if(item.id === id){
        return {
          ...item,
          isEdit: !isEdit
        }
      }
      return item
    })
    setTodos(updateTodo)
    setTodos1(updateTodo)
  }

  const editOnChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updateTodo = todos.map((item) => {
      if(item.id === id){
        return {
          ...item,
          text: e.target.value
        }
      }
      return item
    })
    setTodos(updateTodo)
    setTodos1(updateTodo)
  }

  const onClickDelete = (id: number) => {
    const deleteTodo = todos.filter(item => item.id !== id)
    setTodos(deleteTodo)
    setTodos1(deleteTodo)
  }

  const filterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
    const filterUpdate = todos1.filter(item => item.text.includes(e.target.value))
    setTodos(filterUpdate)
  }

  return (
    <div className={s.test}>
      <input
        value={filterText}
        onChange={(e) => filterInput(e)}
      />
      <input
        value={input}
        onChange={(e) => onChange(e)}
      />
      <button
        onClick={addTodo}
      >Add</button>
      {todos.map((item) => {
        return (
          <div
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            key={item.id}
          >
              {item.isEdit ? (
                <input
                  value={item.text}
                  onChange={(e) => editOnChange(e, item.id)}/>
              ) : <h3>{item.text}</h3>}
            <div>
              <button
                onClick={() => onClickDelete(item.id)}
              >
                Delete
              </button>
              <button
                onClick={() => editTodoClick(item.id, item.isEdit)}
              >edit</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

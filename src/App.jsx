import { useState } from 'react'

import { v4 as uuid } from 'uuid'

import { Container, ToDoList, Input, Button, ListItem, Trash, Check } from './styles'

function App() {
  const [list, setList] = useState([])
  const [task, setTask] = useState('')

  function changed(event) {

    setTask(event.target.value)
  }

  function clicked() {

    if(task){
      setList([...list, { id: uuid(), task, finished: false }])
    }
  }

  function finishTask(id) {

    const newList = list.map(item => (
      item.id === id ? { ...item, finished: !item.finished } : item
    ))

    setList(newList)

  }

  function deleteItem(id) {

    const newList = list.filter(item => item.id !== id)

    setList(newList)

  }

  return (
    <Container>
      <ToDoList>
        <Input onChange={changed} placeholder="O que tenho que fazer..." />
        <Button onClick={clicked}>Adicionar</Button>

        <ul>
          {
            list.length > 0 ? (
              list.map(item => (
                <ListItem key={item.id} isFinished={item.finished}>
                  <Check onClick={() => finishTask(item.id)} />
                  <li>{item.task}</li>
                  <Trash onClick={() => deleteItem(item.id)} />
                </ListItem>
              ))
            ) : (
              <h3>Não há itens na lista</h3>
            )
          }
        </ul>
      </ToDoList>
    </Container>
  )
}

export default App

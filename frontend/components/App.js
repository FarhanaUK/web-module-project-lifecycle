import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
state = {
  todos: [],
  error: '',
  todoNameInput: '',
  displayCompleted: true,
}

onTodoNameInputChange = evt => {
  const {value} = evt.target
this.setState ({...this.state, todoNameInput: value})
}

resetFrom = () => {
  this.setState({...this.state, todoNameInput: ''})
}

setAxiosError = err => {
  this.setState({...this.state, error: err.response.data.message})
}

postNewTodo = () => {
  axios.post(URL, {name: this.state.todoNameInput})
  .then(res => {
    this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
    this.resetFrom()
  })
  .catch(this.setAxiosError)

}
fetchAllTodos =() => {
axios.get(URL)
.then(res => {
 this.setState({...this.state, todos: res.data.data})
})
.catch(this.setAxiosError)
}

onTodoFormSubmit = evt => {
  evt.preventDefault()
  this.postNewTodo()
}

toggleCompleted= id => () => {
  axios.patch(`${URL}/${id}`)
.then(res => {
  this.setState({...this.state, todos: this.state.todos.map(td => {
    if(td.id == id) return td
    return res.data.data
  }) 
})
})
.catch(this.setAxiosError)
}

toggleDisplayCompleted =() => {
  this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
}
componentDidMount() {
this.fetchAllTodos()
}

  render() {
    return (
      <div>
        <div id="error">Error:{this.state.error}</div>
        <TodoList 
        displayCompleted={this.state.displayCompleted}/>
        <Form 
        onTodoFormSubmit={this.onTodoFormSubmit}
        todoNameInput={this.state.todoNameInput}
        onTodoNameInputChange={this.onTodoNameInputChange}
        toggleDisplayCompleted={this.toggleDisplayCompleted}
        displayCompleted={this.state.displayCompleted}/>
      </div>
    )
  }
}


//network request does not work, 
//debugger does not work on the app js
//everytime I click on the network and refresh the browser it disconnets 

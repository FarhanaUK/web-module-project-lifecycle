import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
state = {
  todos: [],
  error: '',
  todoNameInput: '',
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
  .catch(this.setAxiosError())

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

componentDidMount() {
this.fetchAllTodos()

}


  render() {
    return (
      <div>
        <div id="error">Error:{this.state.error}</div>
        <div id= "todos">
          <h2>Todos:</h2>
          {this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
            })
             }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
        <input value ={this.state.todoNameInput} onChange={this.onTodoNameInputChange}  type="text" placeholder="Type todo"/>
        <input type="submit"/>
        <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}


//network request does not work, 
//debugger does not work on the app js
//everytime I click on the network and refresh the browser it disconnets 

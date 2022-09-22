import './app.css';
import HeaderTodo from '../header-todo';
import TaskListTodo from '../task-list-todo';
import FooterTodo from '../footer-todo';
import React from 'react';

export default class TodoList extends React.Component {
   maxId = 100;
   state = {
    Array: [
    this.createItem('Completed task'),
    this.createItem('Editing task'),
    this.createItem('Active task')
    ]
   }
   createItem(label) {
    return {
      label,
      done: false,
      important: false,
      id: this.maxId
    }
  }
  render() {
    return ( 
      <div>
        <HeaderTodo />
        <TaskListTodo 
        todos ={this.state.Array}/>
        <FooterTodo />
      </div>
  )
  }
}
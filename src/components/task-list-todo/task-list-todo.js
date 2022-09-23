import React from 'react';
import './task-list-todo.css'; 
import TaskListTodoItem from '../task-list-todoitem';

export default class TaskListTodo extends React.Component {
  render() {
    const {todos, onDelete, onToggleDone, onToggleImportant} = this.props
    const elements = todos.map((items) => (
      <TaskListTodoItem
        key={items.id}
        {...items}
        onDelete={() => onDelete(items.id)}
        onToggleDone={() => onToggleDone(items.id)} 
        onToggleImportant={() => onToggleImportant(items.id)} 
      />
    ));
      return (
        <div className='todoapp list__item'>
          <ul className="todo-list">{elements}</ul>
          </div>
      );
  }
}
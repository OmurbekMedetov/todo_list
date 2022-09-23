import './app.css';
import HeaderTodo from '../header-todo';
import TaskListTodo from '../task-list-todo';
import FooterTodo from '../footer-todo';
import React from 'react';

export default class TodoList extends React.Component {
   maxId = 100;
   state = {
    array: [
    this.createItem('Completed task'),
    this.createItem('Editing task'),
    this.createItem('Active task'),
    ],
    filter: 'all'
   }
   createItem(label) {
    return {
      label,
      done: false,
      important: false,
      id: this.maxId++
    }
  }
  onToggleDone = (id) => {
    this.setState(({array}) => {
    const idx = array.findIndex((el) => el.id === id);
    const oldItem = array[idx];
    const newItem = {...oldItem, done: !oldItem.done};
    const newArray = [...array.slice(0, idx), newItem, ...array .slice(idx + 1)];
    return {
      array: newArray,
    }
    })
  }
  deleteItem = (id) => {
    this.setState(({ array }) => {
      const idx = array.findIndex((el) => el.id === id);
      const newArray = [...array.slice(0, idx), ...array .slice(idx + 1)];
      return {
        array: newArray,
      };
    });
  };
  addItem = (text) => {
    const newItem = {
      label: text,
      important: false,
      done: false,
      id: this.maxId++,
    }
    this.setState(({array}) => {
    const newArray = [...array, newItem];
    return {
      array: newArray,
    }
    })
  }
  onActive = ({array}) => {
    const idx = array.findIndex((el) => el.done === el);
    const onActive = [...idx];
    return {
      array: onActive,
    }
  }
  static filter(items, filter) {
    switch(filter) {
      case 'all': return items;
      case 'active': return items.filter(item => !item.done);
      case 'done': return items.filter(item => item.done);
    }
  }
  onFilterChange = (filter) => {
    this.setState(() => ({ filter }));
  }
  render() {
    const {filter,array} = this.state
    const doneCount = this.state.array.filter(el => el.done).length;
    const todoCount = this.state.array.length - doneCount;
    return ( 
      <div>
        <HeaderTodo 
        onItemAdded={this.addItem}/>
        <TaskListTodo 
        todos ={array}
        onDelete={this.deleteItem}
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant} />
        <FooterTodo 
        done={todoCount} 
        onFilterChange={this.onFilterChange}
            filter={filter}/>
      </div>
  )
  }
}
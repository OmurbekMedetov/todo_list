import './app.css';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import HeaderTodo from '../header-todo';
import TaskListTodo from '../task-list-todo';
import FooterTodo from '../footer-todo';

const getId = () => Math.floor(Math.random() * 10 ** 10).toString();

export default class TodoList extends React.Component {
  static createItem(label) {
    return {
      label,
      done: false,
      id: getId(),
      editing: false,
    };
  }

  static reformatStateTodoData = (array, id, key) => {
    array.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));
  };

  static onActive = ({ array }) => {
    const idx = array.findIndex((el) => el.done === el);
    const onActive = [...idx];
    return {
      array: onActive,
    };
  };

  static filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  static search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.indexOf(term) > -1);
  }

  constructor(props) {
    super(props);
    this.state = {
      array: [TodoList.createItem('Completed task'), TodoList.createItem('Editing task'), TodoList.createItem('Active task'), TodoList.createItem('My Task'), TodoList.createItem('My Task')],
      filter: 'all',
      term: '',
    };
  }

  addItem = (text) => {
    const newItem = {
      label: text,
      done: false,
      id: getId(),
    };
    this.setState(({ array }) => {
      const newArray = [...array, newItem];
      return {
        array: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ array }) => {
      const idx = array.findIndex((el) => el.id === id);
      const oldItem = array[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...array.slice(0, idx), newItem, ...array.slice(idx + 1)];
      return {
        array: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ array }) => {
      const idx = array.findIndex((el) => el.id === id);
      const newArray = [...array.slice(0, idx), ...array.slice(idx + 1)];
      return {
        array: newArray,
      };
    });
  };

  onFormatLabel = (id, label) => {
    this.setState(({ array }) => ({
      array: array.map((el) => (el.id === id ? { ...el, label, editing: !el.editing } : el)),
    }));
  };

  onToggleEditing = (id) => {
    this.setState(({ array }) => ({
      array: TodoList.reformatStateTodoData(array, id, 'editing'),
    }));
  };

  onFilterChange = (filter) => {
    this.setState(() => ({ filter }));
  };

  clearComplete = () => {
    this.setState(({ array }) => ({
      array: array.filter((item) => !item.done),
    }));
  };

  render() {
    const { filter, array, term } = this.state;
    const visibleItems = TodoList.filter(TodoList.search(array, term), filter);
    const doneCount = array.filter((el) => el.done).length;
    const todoCount = array.length - doneCount;
    const date = formatDistanceToNow(Date.now(), { includeSeconds: true });
    return (
      <div>
        <HeaderTodo onItemAdded={this.addItem} />
        <TaskListTodo
          todos={visibleItems}
          onDelete={this.deleteItem}
          onToggleDone={this.onToggleDone}
          date={date}
          onFormatLabel={this.onFormatLabel}
          onToggleEditing={this.onToggleEditing}
        />
        <FooterTodo
          done={todoCount}
          onFilterChange={this.onFilterChange}
          filter={filter}
          clearComplete={this.clearComplete}
        />
      </div>
    );
  }
}

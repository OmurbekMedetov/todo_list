/* eslint-disable no-param-reassign */
import './app.css';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import HeaderTodo from '../header-todo';
import TaskListTodo from '../task-list-todo';
import FooterTodo from '../footer-todo';

const getId = () => Math.floor(Math.random() * 10 ** 10).toString();

export default class TodoList extends React.Component {
  static createItem(label, min, sec, backTimer = false) {
    return {
      label,
      done: false,
      id: getId(),
      editing: false,
      min,
      sec,
      backTimer,
    };
  }

  // eslint-disable-next-line max-len
  static reformatStateTodoData = (array, id, key) => array.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));

  static onActive = ({ array }) => {
    const idx = array.findIndex((el) => el.done === el);
    const onActive = [...idx];
    return {
      array: onActive,
    };
  };

  static filters(items, filter) {
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
      array: [],
      filter: 'all',
      term: '',
    };
  }

  componentDidMount() {
    this.setState(() => JSON.parse(localStorage.getItem('state')));
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  addItem = (text, min, sec, backTimer) => {
    const newItem = TodoList.createItem(text, min, sec, backTimer);
    this.setState(({ array }) => {
      const newArray = [newItem, ...array];
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

  // eslint-disable-next-line react/no-unused-class-component-methods
  onPlay = (id) => {
    this.couter = setInterval(() => {
      const { array } = this.state;
      this.setState({
        array: [...array].map((el) => {
          if (el.id === id) {
            if (el.backTimer) {
              if (el.sec >= 0) {
                el.sec -= 1;
              }

              if (el.sec < 0) {
                el.min += 1;
                el.sec = 59;
              }

              if (el.min === 0 && el.sec === 0) {
                this.onPause();
              }
            } else {
              if (el.sec < 59) {
                // eslint-disable-next-line no-plusplus
                el.sec++;
              }
              if (el.sec === 59) {
                el.sec = 0;
                el.min += 1;
              }
            }
          }
          return el;
        }),
      });
    }, 1000);
  };

  onPause = () => {
    clearInterval(this.couter);
  };

  render() {
    const {
      filter, array, term,
    } = this.state;
    const visibleItems = TodoList.filters(TodoList.search(array, term), filter);
    const doneCount = array.filter((el) => el.done).length;
    const todoCount = array.length - doneCount;
    const date = formatDistanceToNow(new Date(), { includeSeconds: true });
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
          onPlay={this.onPlay}
          onPause={this.onPause}
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

TodoList.defaultProps = {
  min: 0,
  sec: 0,
};

/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import './app.css';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import HeaderTodo from '../header-todo/header-todo';
import TaskListTodo from '../task-list-todo/task-list-todo';
import FooterTodo from '../footer-todo/footer-todo';

const getId = () => Math.floor(Math.random() * 10 ** 10).toString();
let counter;

export default function TodoListHookies() {
  const [array, setArray] = useState([]);
  const [filter, setFilter] = useState('all');
  const [term] = useState('');
  const createItem = (label, min, sec, backTimer = false) => ({
    label,
    done: false,
    id: getId(),
    editing: false,
    min,
    sec,
    backTimer,
  });

  // eslint-disable-next-line max-len
  const reformatStateTodoData = (arrays, id, key) => arrays.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));

  const filters = (items, footerfilter) => {
    switch (footerfilter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const search = (items, searchterm) => {
    if (searchterm.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.indexOf(term) > -1);
  };

  useEffect(() => {
    if (localStorage.getItem('state')) {
      setArray(JSON.parse(localStorage.getItem('state')));
    }
  }, []);

  useEffect(() => {
    if (array.length !== 0) localStorage.setItem('state', JSON.stringify(array));
  }, [array]);

  const addItem = (text, min, sec, backTimer) => {
    const newItem = createItem(text, min, sec, backTimer);
    const newArray = [newItem, ...array];
    setArray(newArray);
  };

  const onToggleDone = (id) => {
    const idx = array.findIndex((el) => el.id === id);
    const oldItem = array[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    const newArray = [...array.slice(0, idx), newItem, ...array.slice(idx + 1)];
    setArray(newArray);
  };

  const deleteItem = (id) => {
    const idx = array.findIndex((el) => el.id === id);
    const newArray = [...array.slice(0, idx), ...array.slice(idx + 1)];
    setArray(newArray);
  };

  const onFormatLabel = (id, label) => {
    const edit = array.map((el) => (el.id === id ? { ...el, label, editing: !el.editing } : el));
    setArray(edit);
  };

  const onToggleEditing = (id) => {
    const reformArray = reformatStateTodoData(array, id, 'editing');
    setArray(reformArray);
  };

  const onFilterChange = (filteries) => {
    setFilter(filteries);
  };

  const clearComplete = () => {
    const arrayFilter = array.filter((item) => !item.done);
    setArray(arrayFilter);
  };

  const onPause = (id) => {
    array.map((el) => (el.id === id ? clearInterval(counter) : clearInterval(counter)));
  };

  const onPlay = (id) => {
    counter = setInterval(() => {
      setArray((arrays) => arrays.map((el) => {
        if (el.id === id) {
          if (el.backTimer) {
            if (el.sec >= 0) {
              el.sec--;
            }

            if (el.sec < 0) {
              el.min--;
              el.sec = 59;
            }
            if (el.sec === 0 && el.min === 0) {
              onPause(id);
            }
          } else {
            if (el.sec < 0) {
              el.sec++;
            }
            if (el.sec < 59) {
              // eslint-disable-next-line no-plusplus
              el.sec++;
            }
            if (el.sec === 59) {
              el.sec = 0;
              el.min++;
            }
          }
        }
        return el;
      }));
    }, 1000);
  };
  const visibleItems = filters(search(array, term), filter);
  const doneCount = array.filter((el) => el.done).length;
  const todoCount = array.length - doneCount;
  const date = formatDistanceToNow(new Date(), { includeSeconds: true });
  return (
    <div>
      <HeaderTodo onItemAdded={addItem} />
      <TaskListTodo
        todos={visibleItems}
        onDelete={deleteItem}
        onToggleDone={onToggleDone}
        date={date}
        onFormatLabel={onFormatLabel}
        onToggleEditing={onToggleEditing}
        onPlay={onPlay}
        onPause={onPause}
      />
      <FooterTodo
        done={todoCount}
        onFilterChange={onFilterChange}
        filter={filter}
        clearComplete={clearComplete}
      />
    </div>
  );
}

TodoListHookies.defaultProps = {
  min: 0,
  sec: 0,
};

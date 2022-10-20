import React from 'react';
import './task-list-todo.css';
import PropTypes from 'prop-types';
import TaskListTodoItem from '../task-list-todoitem';

export default function TaskListTodo({
  todos, onDelete, onToggleDone, onToggleEditing, date, onFormatLabel, onPlay, onPause,
}) {
  if (todos.length === 0) {
    return (
      <span className="description__span">No Task</span>
    );
  }
  const elements = todos.map((items) => (
    <TaskListTodoItem
      key={items.id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...items}
      onDelete={() => onDelete(items.id)}
      onToggleDone={() => onToggleDone(items.id)}
      onToggleEditing={() => onToggleEditing(items.id)}
      date={date}
      onFormatLabel={(lb) => onFormatLabel(items.id, lb)}
      min={items.min}
      sec={items.sec}
      onPlay={() => onPlay(items.id)}
      onPause={() => onPause(items.id)}
    />
  ));
  return (
    <div className="todoapp list__item">
      <ul className="todo-list">{elements}</ul>
    </div>
  );
}

TaskListTodo.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  onFormatLabel: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

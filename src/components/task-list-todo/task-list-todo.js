import React from 'react';
import './task-list-todo.css';
import PropTypes from 'prop-types';

import TaskListTodoItem from '../task-list-todoitem';

export default function TaskListTodo({
  todos, onDelete, onToggleDone, onToggleEditing, date, onFormatLabel,
}) {
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
};

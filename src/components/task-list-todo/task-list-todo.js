import React from 'react';
import './task-list-todo.css';
import PropTypes from 'prop-types';
import TaskListTodoItem from '../task-list-todoitem';

export default class TaskListTodo extends React.Component {
  render() {
    const {
      todos, onDelete, onToggleDone, onToggleEditing, date, onFormatLabel,
    } = this.props;
    const elements = todos.map((items) => (
      <TaskListTodoItem
        key={items.id}
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
}

TaskListTodo.propTypes = {
  todos: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
};

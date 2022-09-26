import React from 'react';
import './task-list-todo-item.css';
import PropTypes from 'prop-types';
import ItemEditingTask from '../todo-list-editing';

export default class TaskListTodoItem extends React.Component {
  render() {
    const {
      label, onDelete, onToggleDone, done, date, onToggleEditing, onFormatLabel, editing,
    } = this.props;
    let classDone = 'description';
    if (done) classDone += ' done ';
    const task = (
      <li className="completed">
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
          />
          <label>
            <span className={classDone}>{label}</span>
            <span className="created">{date}</span>
          </label>
          <button
            className="icon-edit icon"
            onClick={onToggleEditing}
          />
          <button
            className="icon icon-destroy"
            onClick={onDelete}
          />
        </div>
      </li>
    );
    return (editing ? <ItemEditingTask label={label} onFormatLabel={onFormatLabel} /> : task);
  }
}
TaskListTodoItem.defaultProps = {
  label: 'Hello',
  timeToNow: 'less than $ seconds',
};

TaskListTodoItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

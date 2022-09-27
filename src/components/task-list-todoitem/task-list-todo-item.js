import React from 'react';
import './task-list-todo-item.css';
import Proptypes from 'prop-types';

import ItemEditingTask from '../todo-list-editing';

// eslint-disable-next-line max-len
export default function TaskListTodoItem(props) {
  const {
    label, onDelete, onToggleDone, done, date, onToggleEditing, onFormatLabel, editing,
  } = props;
  let classDone = 'description';
  if (done) classDone += ' done ';
  const task = (
    <li className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label htmlFor="my-todo">
          <span className={classDone}>{label}</span>
          <span className="created">{date}</span>
        </label>
        <button aria-label="edit" type="button" className="icon-edit icon" onClick={onToggleEditing} />
        <button aria-label="destroy" type="button" className="icon icon-destroy" onClick={onDelete} />
      </div>
    </li>
  );
  return editing ? <ItemEditingTask label={label} onFormatLabel={onFormatLabel} /> : task;
}
TaskListTodoItem.defaultProps = {
  label: 'Hello',
};

TaskListTodoItem.propTypes = {
  label: Proptypes.string,
  onDelete: Proptypes.func.isRequired,
  onToggleDone: Proptypes.func.isRequired,
  done: Proptypes.bool.isRequired,
  date: Proptypes.string.isRequired,
  onToggleEditing: Proptypes.func.isRequired,
  onFormatLabel: Proptypes.func.isRequired,
  editing: Proptypes.bool.isRequired,
};

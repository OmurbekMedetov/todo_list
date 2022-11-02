import React from 'react';
import './task-list-todo-item.css';
import Proptypes from 'prop-types';
import ItemEditingTask from '../todo-list-editing/todo-list-editing';

// eslint-disable-next-line max-len
export default function TaskListTodoItem(props) {
  const {
    // eslint-disable-next-line max-len, react/prop-types
    label, min, sec, onDelete, onToggleDone, done, date, onToggleEditing, onFormatLabel, editing, onPlay, onPause,
  } = props;
  let classDone = 'description toodo';
  if (done) classDone += ' done ';
  let minut = min;
  let second = sec;
  if (minut === '') minut = 0;
  if (second === '') second = 0;
  const task = (
    <li className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label htmlFor="my-todo">
          <span className={classDone}>{label}</span>
          <span className="timer">
            <button type="button" className="icon-play" aria-label="Save" onClick={onPlay} />
            <button type="button" className="icon-pause" aria-label="Save" onClick={onPause} />
            {minut}
            :
            {second}
          </span>
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
  onPlay: Proptypes.func.isRequired,
  onPause: Proptypes.func.isRequired,
};

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import './header-todo.css';
import PropTypes from 'prop-types';

export default function HeaderTodo({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [backTimer, setBackTimer] = useState(false);

  // eslint-disable-next-line consistent-return
  const onMinutChange = (event) => {
    setBackTimer(true);
    setMin(Number(event.target.value));
  };

  const onSecondChange = (event) => {
    setSec(Number(event.target.value));
    setBackTimer(true);
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onAddTask = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onItemAdded(label, min, sec, backTimer);
      setLabel('');
      setMin('');
      setSec('');
    }
  };
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onKeyDown={onAddTask} className="form__todo">
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={onLabelChange}
              value={label}
            />
            <input className="new-todo-form__timer" placeholder="Min" type="number" onChange={onMinutChange} value={min} />
            <input className="new-todo-form__timer" placeholder="Sec" type="number" onChange={onSecondChange} value={sec} />
          </form>
        </header>
      </section>
    </div>
  );
}

HeaderTodo.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

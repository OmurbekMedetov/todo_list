/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './header-todo.css';
import PropTypes from 'prop-types';

export default class HeaderTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
      backTimer: false,
    };
  }

  // eslint-disable-next-line consistent-return
  onMinutChange = (event) => {
    this.setState({
      min: Number(event.target.value),
      backTimer: true,
    });
  };

  onSecondChange = (event) => {
    this.setState({
      sec: Number(event.target.value),
      backTimer: true,
    });
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onAddTask = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const {
        label, min, sec, backTimer,
      } = this.state;
      const { onItemAdded } = this.props;
      onItemAdded(label, min, sec, backTimer);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    const {
      label, min, sec,
    } = this.state;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <form onKeyDown={this.onAddTask} className="form__todo">
              <input
                type="text"
                className="new-todo"
                placeholder="What needs to be done?"
                onChange={this.onLabelChange}
                value={label}
              />
              <input className="new-todo-form__timer" placeholder="min" type="number" onChange={this.onMinutChange} value={min} />
              <input className="new-todo-form__timer" placeholder="sec" type="number" onChange={this.onSecondChange} value={sec} />
            </form>
          </header>
        </section>
      </div>
    );
  }
}

HeaderTodo.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

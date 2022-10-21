import React from 'react';
import './footer-todo.css';
import PropTypes from 'prop-types';

import FooterFilter from '../footer-filter-todo';

export default function FooterTodo(props) {
  const {
    done, filter, onFilterChange, clearComplete,
  } = props;
  return (
    <div className="todoapp footer__todo">
      <section className="main ">
        <footer className="footer">
          <span className="todo__count">
            {done}
            items left
          </span>
          <FooterFilter filter={filter} onFilterChange={onFilterChange} />
          <button type="button" className="clear-completed" onClick={clearComplete}>
            Clear completed
          </button>
        </footer>
      </section>
    </div>
  );
}

FooterTodo.defaultProps = {
  clearComplete: '$',
};

FooterTodo.propTypes = {
  done: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  clearComplete: PropTypes.func,
};

import React from 'react';
import './footer-todo.css';
import FooterFilter from '../footer-filter-todo';

export default class FooterTodo extends React.Component {
  render() {
    const {done, filter, onFilterChange} = this.props
    return (
      <div className='todoapp footer__todo'>
        <section className="main ">
          <footer className="footer">
            <span className="todo-count">{done}items left</span>
            <FooterFilter filter={filter}
        onFilterChange ={onFilterChange}/>  
            <button className="clear-completed">Clear completed</button>
          </footer>
          </section>
      </div>
      )
  }
}
import React from 'react';
import './task-list-todo.css'; 

export default class TaskListTodo extends React.Component {
  constructor() {
    super()
    this.onDone = () => {
      this.setState(({done}) => {
        return ({
          done: !done,
        })
      })
    }
    this.onImportant = () => {
      this.setState(({important}) => {
        return ({
          important: !important,
        })
      })
    }
    this.state = {
      done: false,
      important: false
    }
  }
  render() {
    const {done, important} = this.state;
    const {todos} = this.props;
    let classDone = 'description';
    let classActive = 'icon icon-edit';
    if(done) classDone += ' done ';
    if(important) classActive += ' important ';
    return(
    <div className='todoapp task__list'>
      <section className="main">
      <ul className="todo-list">
          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className={classDone}
                onClick={this.onDone} >{todos}</span>
                <span className="created">created 17 seconds ago</span>
              </label>
              <button className={classActive}
              onClick={this.onImportant}></button>
              <button className="icon icon-destroy"></button>
            </div>
          </li>
          <li className="editing">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className={classDone}
                onClick={this.onDone}>{todos}</span>
                <span className="created">created 5 minutes ago</span>
              </label>
              <button className={classActive}
              onClick={this.onImportant}></button>
              <button className="icon icon-destroy"></button>
            </div>
            <input type="text" className="edit" value="Editing task" />
          </li>
          <li>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label htmlFor='id1'>
                <span className={classDone}
                onClick={this.onDone}>{todos}</span>
                <span className="created">created 5 minutes ago</span>
              </label>
              <button className={classActive}
              onClick={this.onImportant} id='id1'></button>
              <button className="icon icon-destroy"></button>
            </div>
          </li>
          </ul>
        </section>
    </div>
    )
  }
}
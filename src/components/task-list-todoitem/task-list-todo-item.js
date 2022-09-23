import React from 'react';
import './task-list-todo-item.css'; 

export default class TaskListTodoItem extends React.Component {
    render(){
        const {label, onDelete, onToggleDone, onToggleImportant, done, important} = this.props; 
        let classDone = 'description';
        if(done) classDone += ' done ';
        if(important) classDone += ' important ';
        return (
            <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" 
              onClick={onToggleDone}/>
              <label>
                <span className={classDone}>{label}</span>
                <span className="created">created 17 seconds ago</span>
              </label>
              <button className='icon-edit icon'
              onClick={onToggleImportant} ></button>
              <button className="icon icon-destroy"
              onClick={onDelete}></button>
            </div>
          </li>
        ) 
    }
} 
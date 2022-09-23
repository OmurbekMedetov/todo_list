import React from "react";
import './footer-filter-todo.css'

export default class FooterFilter extends React.Component {
    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ];
    render() {
        const { filter, onFilterChange} = this.props;
        const buttons = this.buttons.map(({name, label}) => {
        let classNames = ''; 
       if(filter === name) classNames = 'btn-active'
            return (
              <button className={classNames}
              key={name}
              onClick={() => onFilterChange(name)}>{label}</button>
            )
        })
        return(
       <div>
        {buttons}
      </div>
        )
    }
}
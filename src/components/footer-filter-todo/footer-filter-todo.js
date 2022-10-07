import React from 'react';
import './footer-filter-todo.css';
import PropTypes from 'prop-types';

export default class FooterFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
    { name: 'allow', label: 'Hi' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const actClass = isActive ? 'btn-active' : 'buntton';
      return (
        <button type="button" className={`btn ${actClass}`} key={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });
    return <div className="filters">{buttons}</div>;
  }
}
FooterFilter.defaultProps = {
  filter: 'all',
};
FooterFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

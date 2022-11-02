import React from 'react';
import './footer-filter-todo.css';
import PropTypes from 'prop-types';

export default function FooterFilter(props) {
  const button = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];
  const { filter, onFilterChange } = props;
  const buttons = button.map(({ name, label }) => {
    const isActive = filter === name;
    const actClass = isActive ? 'btn-active' : 'button';
    return (
      <button type="button" className={`btn ${actClass}`} key={name} onClick={() => onFilterChange(name)}>
        {label}
      </button>
    );
  });
  return <div className="filters">{buttons}</div>;
}
FooterFilter.defaultProps = {
  filter: 'all',
};
FooterFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

import React, { useEffect, useRef, useState } from 'react';
import './todo-list-editing.css';
import PropTypes from 'prop-types';

export default function ItemEditingTask({ onFormatLabel, label }) {
  const ref = useRef(null);
  const [value, setValue] = useState(label);

  useEffect(() => {
    ref.current.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormatLabel(value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const blur = () => {
    onFormatLabel(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="edit"
        value={value}
        onChange={handleChange}
        onBlur={blur}
        ref={ref}
      />
    </form>
  );
}

ItemEditingTask.defaultProps = {
  label: 'Editing task',
};

ItemEditingTask.propTypes = {
  onFormatLabel: PropTypes.func.isRequired,
  label: PropTypes.string,
};

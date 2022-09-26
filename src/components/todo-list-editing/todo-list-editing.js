import { Component } from 'react';
import './todo-list-editing.css';
import PropTypes from 'prop-types';

export default class ItemEditingTask extends Component {
  state = { value: '' };

  componentDidMount() {
    const { label } = this.props;
    this.setState({ value: label });
    this.input.focus();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { onFormatLabel } = this.props;
    onFormatLabel(value);
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  blur = () => {
    const { value } = this.state;
    const { onFormatLabel } = this.props;
    onFormatLabel(value);
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="edit"
          value={value}
          onChange={this.handleChange}
          onBlur={this.blur}
          ref={(input) => {
            this.input = input;
          }}
        />
      </form>
    );
  }
}

ItemEditingTask.defaultProps = {
  label: 'Editing task',
};

ItemEditingTask.propTypes = {
  onFormatLabel: PropTypes.func.isRequired,
  label: PropTypes.string,
};

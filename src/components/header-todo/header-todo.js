import React from 'react';
import './header-todo.css';
import PropTypes from 'prop-types';

export default class HeaderTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { label } = this.state;
    const { onItemAdded } = this.props;
    onItemAdded(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="new-todo"
                placeholder="What needs to be done?"
                onChange={this.onLabelChange}
                value={label}
              />
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

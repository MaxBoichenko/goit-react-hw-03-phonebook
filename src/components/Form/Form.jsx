import { Component } from 'react';
import PropTypes from 'prop-types';

import { SubButton } from './Form.styled';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;

    this.props.addContact(name, number);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Name</h3>
        <label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputChange}
            value={this.state.name}
          />
        </label>
        <h3>Number</h3>
        <label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputChange}
            value={this.state.number}
          />
          <SubButton type="submit">Добавить контакт</SubButton>
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
};

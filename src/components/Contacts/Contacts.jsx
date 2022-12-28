import { Component } from 'react';
import PropTypes from 'prop-types';

export class Contacts extends Component {
  render() {
    return (
      <ul>
        {this.props.data.map(contact => (
          <li key={contact.id}>
            <span>{contact.name}</span>
            <span> {contact.number}</span>
            <button
              type="button"
              onClick={() => this.props.deleteContact(contact.id)}
            >
              Удалить контакт
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

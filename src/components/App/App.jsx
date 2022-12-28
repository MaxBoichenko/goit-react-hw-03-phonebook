import { Component } from 'react';

import { nanoid } from 'nanoid';

import { Form } from 'components/Form/Form';
import { Section } from 'components/Section/Section';

import { Contacts } from 'components/Contacts/Contacts';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    filter: '',
  };

  componentDidMount() {
    const storageData = localStorage.getItem('contacts');

    if (storageData === null) {
      return;
    }
    this.setState({
      contacts: JSON.parse(storageData),
    });
  }
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    if (
      this.state.contacts.some(
        el => el.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      alert('Такой контакт уже существует');
      return;
    }

    this.setState(prevState => {
      const contactObj = {
        contacts: [
          ...prevState.contacts,
          {
            name,
            number,
            id: nanoid(),
          },
        ],
      };

      return contactObj;
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleStringChange = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  filteredContacts = data => {
    return data.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase().trim())
    );
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <Form addContact={this.addContact} />
        </Section>
        <p>Find contacts by name</p>
        <input
          type="text"
          onChange={this.handleStringChange}
          value={this.state.filter}
        />
        <Section title="Contacts">
          <Contacts
            data={this.filteredContacts(this.state.contacts)}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

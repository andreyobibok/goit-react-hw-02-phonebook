import { nanoid } from 'nanoid';
import { Component } from 'react';

import ContactForm from 'components/ContactForm/ContactForm'
import ContactList from 'components/ContactList/ContactList'
import Filter from 'components/Filter/Filter'
import css from './ContactBook.module.css'

export default class Contact extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    addContact = ({ name, number }) => {
        if (this.isDublicate(name)) {
            return alert(`${name} is already in contacts`);
        }

        this.setState(prevState => {
            const { contacts } = prevState;
            const newContact = {
                id: nanoid(),
                name,
                number,
            };

            return { contacts: [newContact, ...contacts], name: '', number: '' };
        });
    };

    handleFilter = ({ target }) => {
        this.setState({ filter: target.value });
    };

    removeContact = id => {
        this.setState(({ contacts }) => {
            const newContact = contacts.filter(contact => contact.id !== id);
            return { contacts: newContact };
        });
    };

    isDublicate(name) {
        const normalizedName = name.toLowerCase();
        const { contacts } = this.state;
        const result = contacts.find(({ name }) => {
            return name.toLowerCase() === normalizedName;
        });

        return Boolean(result);
    }

    getFilteredContacts() {
        const { filter, contacts } = this.state;

        if (!filter) {
            return contacts;
        }

        const normalizedName = filter.toLowerCase();
        const result = contacts.filter(({ name }) => {
            return name.toLowerCase().includes(normalizedName);
        });

        return result;
    }

    render() {
        const { addContact, removeContact, handleFilter } = this;
        const contacts = this.getFilteredContacts();

        return (
            <div className={css.wrapper} >
            <h2>Phonebook</h2>
            <ContactForm onSubmit={addContact} />
            <Filter
                handleChange={handleFilter}
                value={this.state.filter}
            />
            <h2>Contacts</h2>
            <ContactList removeContact={removeContact} contacts={contacts} />
            </div>
        );
    }
}
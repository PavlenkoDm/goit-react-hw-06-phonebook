import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContacts } from 'store/contacts/contactsSlice';

const idName = nanoid();
const idNumber = nanoid();

export function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const contactsState = useSelector(getContacts);
    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
                return setName(value);

            case 'number':
                return setNumber(value);

            default:
                console.log('Ooops, something wrong!');
                break;
        }
    };

    const onSubmitHandler = event => {
        event.preventDefault();

        const isInContacts = contactsState.some(
            contact => contact.name.toLowerCase() === name.toLowerCase()
        );

        if (isInContacts) {
            Notify.failure(`${name} is already in contacts`);
            return;
        }

        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        dispatch(addContact(newContact));

        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <label htmlFor={idName} style={{ display: 'block' }}>
                Name
            </label>
            <input
                id={idName}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                style={{ display: 'block' }}
                value={name}
                onChange={handleInputChange}
            />

            <label htmlFor={idNumber} style={{ display: 'block' }}>
                Number
            </label>
            <input
                id={idNumber}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                style={{ display: 'block' }}
                value={number}
                onChange={handleInputChange}
            />

            <button type="submit">Add contact</button>
        </form>
    );
}

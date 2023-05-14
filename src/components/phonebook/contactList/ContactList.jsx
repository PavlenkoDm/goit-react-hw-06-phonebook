import { useDispatch, useSelector } from 'react-redux';

import { removeContact, getContacts } from 'store/contacts/contactsSlice';
import { getFilter } from 'store/filter/filterSlice';

export const ContactList = () => {
    const contactsState = useSelector(getContacts);
    const filterState = useSelector(getFilter);
    const dispatch = useDispatch();

    const deleteContact = value => {
        dispatch(removeContact({ id: value }));
    };

    const getFilteredContacts = () => {
        const normalizeFilter = filterState.toLowerCase().trim();
        return contactsState.filter(contact => {
            return contact.name.toLocaleLowerCase().includes(normalizeFilter);
        });
    };

    return (
        <ul>
            {getFilteredContacts().map(contact => {
                const { name, number, id } = contact;
                return (
                    <li key={id} style={{ fontSize: '20px' }}>
                        {name}: {number}
                        <button
                            type="button"
                            name={name}
                            onClick={() => {
                                deleteContact(id);
                            }}
                            style={{ marginLeft: '12px' }}
                        >
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

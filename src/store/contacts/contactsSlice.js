import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contactsArr: [],
    },
    reducers: {
        addContact: (state, action) => {
            state.contactsArr.unshift(action.payload);
        },
        removeContact: (state, action) => {
            const index = state.contactsArr.findIndex(
                contact => contact.id === action.payload.id
            );
            state.contactsArr.splice(index, 1);
        },
    },
});

export const { addContact, removeContact } = contactsSlice.actions;

//Selectors
export const getContacts = state => state.contacts.contactsArr;

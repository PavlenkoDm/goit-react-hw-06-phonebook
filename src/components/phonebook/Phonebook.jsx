
import { ContactForm } from 'components/index';
import { Filter } from 'components/index';
import { ContactList } from 'components/index';

export function Phonebook() {
    return (
        <div>
            <h1>Phonebook</h1>

            <ContactForm />

            <h2>Contacts</h2>

            <Filter />

            <ContactList />
        </div>
    );
}

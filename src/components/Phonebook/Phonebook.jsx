import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import PhonebookBlock from 'components/PhonebookBlock/PhonebookBlock';
import PhonebookList from '../PhonebookList/PhonebookList';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';
import css from './Phonebook-module.css';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts.length ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = ({ target }) => setFilter(target.value);

  const onAddContacts = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevContacts => {
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      return [...prevContacts, newContact];
    });
  };

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return contact.name.toLowerCase() === normalizedName;
    });
    return Boolean(dublicate);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedfilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLocaleLowerCase().includes(normalizedfilter) ||
        number.toLocaleLowerCase().includes(normalizedfilter)
      );
    });
    return result;
  };

  const onDeleteContact = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== id);
    });
  };

  const items = getFilteredContacts();

  return (
    <div className={css.wrapper}>
      <div className={css.block}>
        <PhonebookBlock title="Phonebook">
          <PhonebookForm onSubmit={onAddContacts} />
        </PhonebookBlock>

        <PhonebookBlock title="Contacts">
          <p className={css.filterTitel}>Find contacts by name</p>
          <input
            name="filter"
            onChange={handleFilterChange}
            value={filter}
            type="text"
          />
          <PhonebookList contacts={items} onDeleteContact={onDeleteContact} />
        </PhonebookBlock>
      </div>
    </div>
  );
};

export default Phonebook;

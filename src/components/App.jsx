import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Filter from './filter/Filter';
import Form from './form/Form';
import List from './list/List';

import s from './app.module.css';
import Message from './message/Message';
const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contact')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = idCandidate => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== idCandidate)
    );
  };
  const changeFilterValue = newValue => {
    setFilter(newValue);
  };

  const setNewContact = contactCandidate => {
    console.log(contactCandidate);
    const result = contacts.find(
      contactItem =>
        contactItem.name.toLowerCase() === contactCandidate.name.toLowerCase()
    );
    if (result) {
      Notify.warning(`${contactCandidate.name} is already in contact`);
      return {};
    }
    setContacts(prevState => [
      ...prevState,
      {
        id: nanoid(),
        ...contactCandidate,
      },
    ]);
  };
  const startSearch = () =>
    contacts.filter(contactItem => {
      return contactItem.name.toLowerCase().includes(filter.toLowerCase());
    });

  return (
    <div>
      <h2 className={s.title}>Phonebook</h2>
      <Form setNewContact={setNewContact} />
      <Filter filterValue={filter} changeEvent={changeFilterValue} />
      {contacts.length === 0 ||
      (filter.length !== 0 && startSearch().length === 0) ? (
        <Message text="No items in list" />
      ) : (
        <List list={startSearch()} deleteContact={deleteContact} />
      )}
    </div>
  );
};

export default App;

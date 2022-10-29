import { useState, useEffect } from 'react';
import { FormPhone } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import React from 'react';

export function OldApp() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normolizeVisibleContact = filter.toLowerCase();

  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normolizeVisibleContact)
  );

  return (
    <>
      <FormPhone contacts={contacts} onSubmit={formSubmitHandler} />
      <Filter value={filter} onChange={changeFilter} />
      <TodoList contacts={visibleContact} onDeleteContact={deleteContact} />
    </>
  );
}

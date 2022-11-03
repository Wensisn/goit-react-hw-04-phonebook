import { useState } from 'react';
import { FormPhone } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { Filter } from './Filter/Filter';
import { useContacts } from '../hooks/useContacts';
import React from 'react';

export function OldApp() {
  const [contacts, formSubmitHandler, deleteContact] = useContacts([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const setFilterContact = () => {
    const normolizeVisibleContact = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizeVisibleContact)
    );
  };

  const visibleContacts = setFilterContact();

  return (
    <>
      <FormPhone contacts={contacts} onSubmit={formSubmitHandler} />
      <Filter value={filter} onChange={changeFilter} />
      <TodoList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </>
  );
}

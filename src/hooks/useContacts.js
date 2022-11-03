import { useLocalStorage } from './useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../components/utils/contacts';
import { nanoid } from 'nanoid';

export const useContacts = defaultValue => {
  const [contacts, setContacts] = useLocalStorage(
    LOCAL_STORAGE_KEYS.contacts,
    defaultValue
  );

  const formSubmitHandler = ({ name, number }) => {
    if (isExistContact(name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
    return true;
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  };

  const isExistContact = name => {
    return contacts.some(item => item.name === name);
  };

  return [contacts, formSubmitHandler, deleteContact];
};

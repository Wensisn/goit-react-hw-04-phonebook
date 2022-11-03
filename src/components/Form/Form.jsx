import { nanoid } from 'nanoid';
import css from './Form.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function FormPhone({ onSubmit }) {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');

  const handelChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const onSubmitnForm = event => {
    event.preventDefault();
    const data = { name, number };
    onSubmit(data);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <div className={css.sectionForm}>
      <h2>PhoneBook</h2>

      <form className={css.form} onSubmit={onSubmitnForm}>
        <label htmlFor={nameInputId} className={css.label}>
          <span className={css.name}>Name</span>
          <input
            className={css.input}
            id={nameInputId}
            value={name}
            type="text"
            name="name"
            required
            onChange={handelChange}
          />
        </label>
        <label htmlFor={numberInputId} className={css.label}>
          <span className={css.name}>Number</span>
          <input
            className={css.input}
            id={numberInputId}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handelChange}
          />
        </label>
        <button type="submit" className={css.click}>
          Add a contact
        </button>
      </form>
    </div>
  );
}

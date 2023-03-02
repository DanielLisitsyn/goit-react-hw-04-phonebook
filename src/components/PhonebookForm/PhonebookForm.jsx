import { useState } from 'react';
import css from './PhonebookForm.module.css';
import PropTypes from 'prop-types';

const PhonebookForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handelSubmit = e => {
    e.preventDefault();

    onSubmit({ ...state });
    setState({ name: '', number: '' });
  };

  const handleChange = ({ target }) => {
    setState(prevState => {
      const { name, value } = target;
      return { ...prevState, [name]: value };
    });
  };
  const { name, number } = state;
  return (
    <form onSubmit={handelSubmit} className={css.form}>
      <div className={css.phonebookGroup}>
        <label className={css.labelForm}>
          Name
          <input
            className={css.inputForm}
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            required
          />
        </label>
      </div>
      <div className={css.phonebookGroup}>
        <label className={css.labelForm}>
          Number
          <input
            className={css.inputForm}
            value={number}
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>

      <button className={css.addContact} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default PhonebookForm;

PhonebookForm.propTypes = {
  onSubmit: PropTypes.func,
};

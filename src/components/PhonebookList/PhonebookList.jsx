import css from './PhonebookList.module.css';
import PropTypes from 'prop-types';

const PhonebookList = ({ contacts, onDeleteContact }) => {
  const elements = contacts.map(({ id, number, name }) => (
    <li className={css.listItem} key={id}>
      {name}: {number}{' '}
      <button className={css.deleteBtn} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  ));
  return <ul className={css.list}>{elements}</ul>;
};

export default PhonebookList;

PhonebookList.protoTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      number: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  onDeleteContact: PropTypes.func,
};

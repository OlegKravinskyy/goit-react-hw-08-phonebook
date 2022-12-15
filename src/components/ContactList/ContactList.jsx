import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';
import { useSelector } from 'react-redux';

export const ContactList = ({ handleDelete }) => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  if (contacts.length === 0) return;
  return (
    <>
      {filter ? (
        false
      ) : (
        <ul className={css.list}>
          {contacts.map(el => (
            <li className={css.item} key={el.id}>
              <p>
                {el.name}: {el.phone}
              </p>
              <button
                onClick={e => handleDelete(e)}
                className={css.btn}
                data-id={el.id}
              >
                {' '}
                Delete{' '}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  handleDelete: PropTypes.func,
};

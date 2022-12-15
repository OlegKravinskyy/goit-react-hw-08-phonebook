import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';
import { useSelector } from 'react-redux';

export const Filter = ({ handleDelete, handleChange }) => {
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts.items);
  return (
    <>
      <label>
        {' '}
        Find contacts by name
        <input
          className={css.find}
          name="filter"
          type="text"
          onChange={event => handleChange(event)}
        />
      </label>
      {filter ? (
        <ul>
          {contacts
            .filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(filtered => (
              <li key={filtered.id}>
                <p>
                  {filtered.name}: {filtered.number}
                </p>
                <button
                  onClick={e => handleDelete(e)}
                  data-id={filtered.id}
                  className={css.btn}
                >
                  {' '}
                  Delete{' '}
                </button>
              </li>
            ))}
        </ul>
      ) : (
        false
      )}
    </>
  );
};

Filter.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
};

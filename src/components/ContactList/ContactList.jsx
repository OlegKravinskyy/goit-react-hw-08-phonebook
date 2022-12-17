import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useState } from 'react';
import { ModalEdit } from 'components/Modal/Modal';
import { DelDialog } from 'components/Dialog/Dialog';

export const ContactList = ({ handleDelete, handleEdit }) => {
  const [open, setOpen] = useState(false);
  const [dataId, setId] = useState(null);
  const handleOpen = (event, id) => {
    setId(event.target.getAttribute('data-id'));
    setOpen(true);
  };

  const [openDia, setOpenDia] = useState(false);
  const handleClickOpen = event => {
    setId(event.target.getAttribute('data-id'));
    setOpenDia(true);
  };

  const handleClickClose = e => {
    setOpenDia(false);
    console.log(e.target);
  };

  const handleClickDel = e => {
    setOpenDia(false);
    handleDelete(dataId);
  };

  const handleClose = () => setOpen(false);
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);
  const find = id => {
    if (id === undefined) return;
    return contacts.find(element => element.id === id);
  };
  const isEdit = useSelector(state => state.contacts.isEdit);

  if (contacts.length === 0) return;
  let index = 0;
  return (
    <>
      {filter ? (
        false
      ) : (
        <table className={css.tableTH}>
          <thead>
            <tr>
              <th className={css.thHead}>Index</th>
              <th className={css.thHead}>Name</th>
              <th className={css.thHead}>Phone Number</th>
              <th className={css.thHead}>Action</th>
            </tr>
          </thead>
          <tbody className={css.tbodyH}>
            {contacts.map(item => (
              <tr key={item.id}>
                <td>{(index += 1)}</td>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td>
                  <Button
                    variant="outlined"
                    data-id={item.id}
                    onClick={e => handleOpen(e, item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleClickOpen}
                    data-id={item.id}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <ModalEdit
          handleEdit={handleEdit}
          dataId={dataId}
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          isEdit={isEdit}
          find={find}
        />
      </div>
      <div>
        <DelDialog
          openDia={openDia}
          handleClickClose={handleClickClose}
          handleClickDel={handleClickDel}
        />
      </div>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  handleDelete: PropTypes.func,
};

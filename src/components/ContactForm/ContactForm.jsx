import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button } from '@mui/material';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useSelector } from 'react-redux';
import { User } from 'components/User/User';
import { useRef, useEffect } from 'react';
export const ContactForm = ({
  handleSubmit,
  handleEdit,
  handleDelete,
  handleChange,
}) => {
  const [success, setSuccess] = React.useState(false);
  const isAdd = useSelector(state => state.contacts.isAdd);
  const timer = useRef();
  const handleButtonClick = () => {
    if (!isAdd) {
      setSuccess(false);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        timer.current = window.setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }, 200);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const buttonSx = {
    ...(success && {
      bgcolor: 'green',
      '&:hover': {
        bgcolor: 'green',
      },
    }),
  };

  return (
    <div>
      <User />
      <div>
        <form onSubmit={event => handleSubmit(event)} className={css.form}>
          <h1>Phonebook</h1>
          <div className={css.formInput}>
            <TextField
              style={{ paddingRight: 20 }}
              name="name"
              id="standard-basic"
              label="Name"
              variant="standard"
            />
            <TextField
              name="number"
              id="standard-basic"
              label="Phone"
              variant="standard"
            />
          </div>
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  variant="contained"
                  sx={buttonSx}
                  type="submit"
                  disabled={isAdd}
                  onClick={handleButtonClick}
                >
                  Add contact
                </Button>
                {isAdd && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'green',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </div>
        </form>
      </div>
      <div className={css.container}>
        <h2>Contacts</h2>
        <Filter handleDelete={handleDelete} handleChange={handleChange} />
        <ContactList handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </div>
  );
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};

import axios from 'axios';
import { ContactForm } from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setFilter } from 'redux/filterSlice';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  checkLocalStorage,
} from 'redux/operations';
import { Login, Register } from './Auth/Auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@mui/material';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contacts.isLoading);
  const contacts = useSelector(state => state.contacts.items);
  const isLogin = useSelector(state => state.contacts.isLogin);
  const user = useSelector(state => state.contacts.user);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = user.token;
    isLogin && dispatch(fetchContacts());
  }, [dispatch, isLogin, user]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      axios.defaults.headers.common['Authorization'] = user.token;
      dispatch(checkLocalStorage());
    }
  }, [dispatch, user.token]);

  const handleSubmit = async event => {
    event.preventDefault();
    const contact = {
      name: event.target.name.value,
      number: event.target.number.value,
    };
    if (contacts.find(element => element.name === contact.name)) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    await dispatch(addContact(contact));
    event.target.reset();
    dispatch(fetchContacts());
  };

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const handleDelete = async id => {
    const contactId = {
      id: id,
    };
    await dispatch(deleteContact(contactId));
    dispatch(fetchContacts());
  };
  const handleEdit = async (event, id, setOpen) => {
    event.preventDefault();
    const contact = {
      id: id,
      name: event.target.form.name.value,
      number: event.target.form.phone.value,
    };
    await dispatch(editContact(contact));
    dispatch(fetchContacts());
    setOpen(false);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            Object.keys(user).length === 0 ||
            user === undefined ||
            user === null ? (
              <Navigate to="/login" />
            ) : (
              <Navigate to="/contacts" />
            )
          }
        />
        <Route
          path="/login"
          element={!isLogin ? <Login /> : <Navigate to="/contacts" />}
        />
        <Route
          path="/register"
          element={!isLogin ? <Register /> : <Navigate to="/contacts" />}
        />
        <Route
          path="/contacts"
          element={
            !isLogin ? (
              <Navigate to="/login" />
            ) : (
              <ContactForm
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleChange={handleChange}
              />
            )
          }
        />
        <Route
          path="*"
          element={
            !isLogin ? <Navigate to="/login" /> : <Navigate to="/contacts" />
          }
        />
      </Routes>
      {
        <Backdrop
          open={isLoading}
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    </div>
  );
};

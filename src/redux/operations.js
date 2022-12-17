import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://connections-api.herokuapp.com/contacts'
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/contacts',
        { name: contact.name, number: contact.number }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${contactId.id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contact/editContact',
  async (editedContact, thunkAPI) => {
    try {
      const response = await axios.patch(
        `https://connections-api.herokuapp.com/contacts/${editedContact.id}`,
        { name: editedContact.name, number: editedContact.number }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'contact/login',
  async (loginProps, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://connections-api.herokuapp.com/users/login`,
        { email: loginProps.email, password: loginProps.password }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'contact/register',
  async (registerProps, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://connections-api.herokuapp.com/users/signup`,
        {
          name: registerProps.name,
          email: registerProps.email,
          password: registerProps.password,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'contact/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://connections-api.herokuapp.com/users/logout`
      );
      localStorage.clear();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkLocalStorage = createAsyncThunk('contact/storage', () => {
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    return user;
  }
});

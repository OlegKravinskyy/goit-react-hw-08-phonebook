import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  login,
  register,
  logout,
  checkLocalStorage,
} from './operations';

const contactInitialState = {
  items: [],
  user: {},
  createdAt: null,
  isLoading: false,
  isAdd: false,
  isEdit: false,
  isDelite: false,
  isLogin: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  extraReducers: {
    [fetchContacts.pending](state, action) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // add contact
    [addContact.pending](state) {
      state.isAdd = true;
    },
    [addContact.fulfilled](state, action) {
      state.isAdd = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isAdd = false;
      state.error = action.payload;
    },
    // delete contact
    [deleteContact.pending](state) {
      state.isDelete = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isDelete = false;
      state.error = null;
      const index = state.items.findIndex(task => task.id === action.payload);
      state.items.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isDelete = false;
      state.error = action.payload;
    },

    [editContact.pending](state) {
      state.isEdit = true;
    },
    [editContact.fulfilled](state, action) {
      state.isEdit = false;
      state.error = null;
    },
    [editContact.rejected](state, action) {
      state.isEdit = false;
      state.error = action.payload;
    },

    [login.pending](state) {
      state.isLoading = true;
    },
    [login.fulfilled](state, action) {
      state.isLogin = true;
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    [login.rejected](state, action) {
      state.isLogin = false;
      state.isLoading = false;
      state.error = action.payload;
    },

    [register.pending](state) {
      state.isLoading = true;
    },
    [register.fulfilled](state, action) {
      // state.isEdit = false;
      state.isLogin = true;
      state.isLoading = false;
      state.user = action.payload;
      // console.log(action.payload);
      state.error = null;
      state.isLogin = true;
    },
    [register.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [logout.pending](state) {
      state.isLoading = true;
    },
    [logout.fulfilled](state, action) {
      state.isLogin = false;
      state.isLoading = false;
      state.error = null;
    },
    [logout.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [checkLocalStorage.fulfilled](state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
  },
});

export const contactReducer = contactSlice.reducer;

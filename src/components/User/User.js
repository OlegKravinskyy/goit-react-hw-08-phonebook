import { logout } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const User = () => {
  const user = useSelector(state => state.contacts.user);
  const dispatch = useDispatch();

  if (user === undefined) return;

  const userLogout = () => {
    dispatch(logout(user.token));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <p>Hello, {user.user.name}!</p>
      <Link to="/login" style={{ textDecoration: 'none', marginRight: 10 }}>
        <Button onClick={userLogout} variant="outlined" color="error">
          Logout
        </Button>
      </Link>
    </div>
  );
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../slices/userSlice';
import { getSignOut } from '../../../helpers/api';

function SignOutButton() {
  const dispatch = useDispatch();

  const handleSignOut = async (e) => {
    e.preventDefault();
    await getSignOut();
    dispatch(clearUser());
    window.location.href = '/';
  };

  return (
    <h2 className='nav__signout' onClick={handleSignOut}>
      Logga ut
    </h2>
  );
}

export default SignOutButton;

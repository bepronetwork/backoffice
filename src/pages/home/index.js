import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/ducks/admin';

/**
 * Home page
 */
function Home() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <>
      <h1>Home</h1>
      <br />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Home;

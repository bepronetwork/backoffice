import React from 'react';
import { useDispatch } from 'react-redux';

import { adminLogout } from 'redux/ducks/auth';

function Home() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(adminLogout());
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

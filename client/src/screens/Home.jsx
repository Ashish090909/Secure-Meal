// App.js

import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleRegistration = () => {
    setIsRegistered(!isRegistered);
  };

  return (
      <div className="">
        {isRegistered ? (
          <Register toggleRegistration={toggleRegistration} />
        ) : (
          <Login toggleRegistration={toggleRegistration} />
        )}
      </div>
  );
};

export default Home;

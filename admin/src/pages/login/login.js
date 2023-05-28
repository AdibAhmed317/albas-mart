import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      <input
        placeholder='emial'
        type='text'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </div>
  );
};

export default Login;

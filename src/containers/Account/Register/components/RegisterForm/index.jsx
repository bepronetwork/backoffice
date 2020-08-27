import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Account from '../../../../../controllers/Account';

import { Input, Button, Link } from '../../../../../components';
import { Form, Label, Actions, HaveAccount } from './styles';

const queryString = require('query-string');

const RegisterForm = props => {
  const [token, setToken] = useState(null);
  const [queryEmail, setQueryEmail] = useState(null);
  const [email, setEmail] = useState('');

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);

    const token = parsed ? parsed.token : null;
    const queryEmail = parsed ? parsed.email : null;

    setToken(token);
    setQueryEmail(queryEmail);
    setEmail(queryEmail);
  }, []);

  async function handleSubmit(data) {
    const { history, showNotification } = props;

    const { username, name, email, password } = data;

    setUsername(username);
    setName(name);
    setEmail(email);
    setPassword(password);

    try {
      setIsLoading(true);

      const account = new Account({
        token,
        queryEmail,
        email,
        username,
        name,
        password,
      });

      await account.register(token);

      !token ? history.push('/initial') : history.push('/home');

      setIsLoading(false);
    } catch (err) {
      showNotification(err.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Username or E-mail</Label>
      <Input
        label="Username"
        name="username"
        type="text"
        defaultValue={username}
      />
      <Label>Name</Label>
      <Input label="Name" name="name" type="text" defaultValue={name} />
      {!queryEmail && (
        <>
          <Label>E-mail</Label>
          <Input label="Email" name="email" type="text" defaultValue={email} />
        </>
      )}
      <Label>Password</Label>
      <Input
        name="password"
        label="Password"
        type="password"
        defaultValue={password}
      />
      <Actions>
        <Button variant="primary" loading={isLoading} type="submit">
          Sign Up
        </Button>
      </Actions>
      <HaveAccount>
        <Link to="/login">Already have an account?</Link>
      </HaveAccount>
    </Form>
  );
};

RegisterForm.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default RegisterForm;

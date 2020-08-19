import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Link } from '../../../../components';

import { Form, Label, ForgotPassword, Actions } from './styles';

const LogInForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { onChangeUsername, onChangePassword, query, login, isLoading } = props;

  useEffect(() => {
    const { username, password } = query;

    setUsername(username);
    setPassword(password);
  }, []);

  function handleSubmit() {
    login();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Username or E-mail</Label>
      <Input
        label="Username or E-mail"
        name="username"
        type="text"
        defaultValue={username}
        onChange={e => onChangeUsername(e.target.value)}
      />
      <Label>Password</Label>
      <Input
        name="password"
        label="Password"
        type="password"
        defaultValue={password}
        onChange={e => onChangePassword(e.target.value)}
      />

      <ForgotPassword>
        <Link to="/password/reset">
          Forgot a password?
          <span role="img" aria-label="confused">
            {` 😕`}
          </span>
        </Link>
      </ForgotPassword>

      <Actions>
        <Button
          variant="primary"
          loading={isLoading}
          type="submit"
          onClick={() => login()}
        >
          Log In
        </Button>
        <Link to="/register">
          <Button variant="secondary">Create Account</Button>
        </Link>
      </Actions>
    </Form>
  );
};

LogInForm.propTypes = {
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func,
  login: PropTypes.func,
  query: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default LogInForm;

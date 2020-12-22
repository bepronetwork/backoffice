import React from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/ducks/admin';

import styles from '../login.module.scss';

function LoginForm() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.admin);

  const onFinish = values => {
    const { username, password } = values;

    dispatch(login({ username, password }));
  };

  return (
    <Form
      layout="vertical"
      style={{ marginTop: 20 }}
      name="login"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username or E-mail"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username or e-mail'
          }
        ]}
      >
        <Input
          prefix={<UserOutlined className={styles.formIcon} />}
          autoFocus
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password'
          }
        ]}
      >
        <Input.Password prefix={<LockOutlined className={styles.formIcon} />} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <a href="/forgot">Forgot password?</a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.fullwidth}
          size="large"
          loading={isLoading}
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;

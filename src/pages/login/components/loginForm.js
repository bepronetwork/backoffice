import React from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from '../login.module.scss';

function LoginForm() {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      style={{ marginTop: 20 }}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username or E-mail"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username or e-mail!'
          }
        ]}
      >
        <Input prefix={<UserOutlined className={styles.formIcon} />} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password prefix={<LockOutlined className={styles.formIcon} />} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <a href="/passwor/forgot">Forgot password?</a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.fullwidth}
          size="large"
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;

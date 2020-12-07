import React from 'react';
import { Tabs, Card } from 'antd';

import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

import styles from './login.module.scss';

const { TabPane } = Tabs;

function Login() {
  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <div className={styles.card}>
          <Card bordered={false}>
            <div className={styles.backofficeLogo} />
            <Tabs defaultActiveKey="login" centered size="large">
              <TabPane tab="Login" key="login">
                <LoginForm />
              </TabPane>
              <TabPane tab="Register" key="register" forceRender={false}>
                <RegisterForm />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;

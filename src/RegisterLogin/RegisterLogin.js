import { Button } from 'antd';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function RegisterLogin() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <>
      {
        isLoginPage ? (
          <Login />
        ) : (
          <Register onComplete={() => setIsLoginPage(true)} />
        )
      }
      {
        isLoginPage ? (
          <h5>ไม่มีบัญชี? <Button type='link' onClick={() => setIsLoginPage(false)}>สมัครสมาชิก</Button></h5>
        ) : (
          <h5>มีบัญชีอยู่แล้ว? <Button type='link' onClick={() => setIsLoginPage(true)}>เข้าสู่ระบบ</Button></h5>
        )
      }
    </>
  )
}
export default RegisterLogin;

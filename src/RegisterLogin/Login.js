import { Button, Form, message } from 'antd';
import ky from 'ky';
import React, { useContext, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { useHistory } from 'react-router';
import { AuthContext } from '../Auth/AuthContext';
import { kyp } from '../utils/kyp';
import { formLayout, formTailLayout, phoneNumberRegex } from './Common';
import MaskedPhoneNumber from './MaskedPhoneNumber';

async function requestOTP(phone, callback) {
  try {
    const path = 'user/otp/'+encodeURIComponent(phone)
    const res = await kyp.get(path).text()
    message.info('ส่ง OTP สำเร็จ')
    callback(res)
    return
  } catch (error) {
    if (error instanceof ky.HTTPError) {
      message.error(`${error.response.status} - ${(await error.response.json()).message}`)
    } else if (error instanceof ky.TimeoutError) {
      message.error('Request time out')
    } else {
      console.error(JSON.stringify(error))
      message.error('Unexpected error')
    }
  }
  callback(undefined)
}

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('')

  const [form2] = Form.useForm()

  const { fetchContext } = useContext(AuthContext)

  const history = useHistory();

  function handleSubmitFormReqOTP(val) {
    requestOTP(val.phoneNumber, (res) => res ? setPhoneNumber(res) : undefined)
  }

  async function handleSubmitFormSentOTP(val) {
    const json = { ...val, phoneNumber }
    try {
      const res = await kyp.post('auth', { json }).json()
      if (res) {
        message.success('Login Successful')
        fetchContext(() => history.push('/'));
      }
    } catch (error) {
      if (error instanceof ky.HTTPError) {
        if ( error.response.status === 410
          || error.response.status === 404
        ) {
          message.error('กรุณาขอ OTP ใหม่')
        } else if (error.response.status === 401) {
          message.error('OTP ไม่ถูกต้อง')
        } else {
          message.error(`${error.response.status} - ${(await error.response.json()).message}`)
        }
      } else if (error instanceof ky.TimeoutError) {
        message.error('Request time out')
      } else {
        console.error(JSON.stringify(error))
        message.error('Unexpected error')
      }
    }
  }

  return (
    <div>
      <h1>เข้าสู่ระบบ</h1>
      <Form {...formLayout} onFinish={handleSubmitFormReqOTP}>
        <Form.Item
          name="phoneNumber"
          label="หมายเลขโทรศัพท์มือถือ"
          rules={[
            {
              required: true,
              pattern: phoneNumberRegex,
              message: "กรุณาใส่หมายเลขโทรศัพท์มือถือให้ถูกต้อง",
            }
          ]}
        >
          <MaskedPhoneNumber />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button htmlType='submit' onClick={() => {
            form2.resetFields()
          }}>
            Request OTP
          </Button>
        </Form.Item>
      </Form>
      {
        phoneNumber ? (
          <>
            <hr />
            <h3>
              กรุณากรอก OTP ที่เราได้ส่งไปยังโทรศัพท์มือถือของท่าน
            </h3>
            <Form {...formLayout} onFinish={handleSubmitFormSentOTP} form={form2}>
              <Form.Item
                label="หมายเลขโทรศัพท์มือถือ"
              >
                {phoneNumber}
              </Form.Item>
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]{6}$/g,
                    message: 'กรุณากรอก OTP ให้ถูกต้อง (ภายใน 5 นาทีนับจากเริ่มขอ OTP)'
                  }
                ]}
              >
                <ReactInputMask
                  mask={"999999"}
                  maskChar={"_"}
                  alwaysShowMark={true}
                />
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (<></>)
      }
    </div>
  )
}
export default Login;

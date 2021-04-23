import { Button, Form, Input, message } from 'antd';
import ky from 'ky';
import React from 'react';
import { kyp } from '../utils/kyp';

const phoneNumberRegex = /^0[1-9][0-9]{8}$/g
const citizenIdRegex = /^[1-9][0-9]{12}$/g

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 6,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 6,
  }
}

const handleSubmitForm = (onComplete) => async (json) => {
  try {
    await kyp.post('user', { json }).json()
    message.success('สมัครสมาชิกสำเร็จ กรุณาลงชื่อเข้าใช้เพื่อยืนยัน', onComplete)
  } catch (error) {
    if (error instanceof ky.HTTPError) {
      if (error.response.status === 409) {
        message.error('เบอร์โทรศัพท์หรือเลขบัตรประชาชนนี้มีผู้ใช้งานแล้ว')
      } else {
        console.error(JSON.stringify(error))
      }
    } else if (error instanceof ky.TimeoutError) {
      message.error('Request time out')
    } else {
      console.error(JSON.stringify(error))
    }
  }
  
}

function Register(props) {
  const [form] = Form.useForm();

  const { onComplete } = props
  const onReset = () => form.resetFields();

  return (
    <div>
      <h1>สมัครสมาชิก</h1>
      <Form {...layout} form={form} onFinish={handleSubmitForm(onComplete)}>
        <Form.Item
          name="phoneNumber"
          label="หมายเลขโทรศัพท์มือถือ"
          rules={[
            {
              required: true,
              pattern: phoneNumberRegex,
              message: "กรุณาใส่หมายเลขโทรศัพท์มือถือให้ถูกต้อง"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="citizenId"
          label="รหัสบัตรประชาชน"
          rules={[
            {
              required: true,
              pattern: citizenIdRegex,
              message: "กรุณาใส่รหัสบัตรประชาชนให้ถูกต้อง",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="ชื่อ"
          rules={[
            {
              required: true,
              message: "กรุณาใส่ชื่อ",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="นามสกุล"
          rules={[
            {
              required: true,
              message: "กรุณาใส่นามสกุล",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>&nbsp;
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register;

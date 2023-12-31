import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Form, Input, Row, Col, Button, Alert, Typography, Divider } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography

export default function SignIn() {
  const [form] = Form.useForm()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signin } = useAuth()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      setError(null)
      await signin(values.email, values.password)
      setLoading(false)
      navigate('/')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const singInAsAdmin = async () => {
    setLoading(true)
    try {
      setError(null)
      await signin('instructor@gmail.com', '123123123')
      setLoading(false)
      navigate('/')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <Col xs={24} md={12} lg={10} xl={8}>
        <Form
          className='myForm'
          labelCol={{ span: 24 }}
          form={form}
          name='register'
          onFinish={onFinish}
          scrollToFirstError
        >
          <Title>Sign In</Title>
          {error && <Alert message={error} type='error' />}
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <div className='myFooter'>
            <Link to='/forgot-password'>Forgot password?</Link>
            <div>
              Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
          </div>
          <Form.Item>
            <Button
              loading={loading}
              disabled={loading}
              type='primary'
              htmlType='submit'
            >
              Sign In
            </Button>
          </Form.Item>
          <Divider />
          <div className='myFooter'>
            <div>
              Or, Click the button bellow and sign in as a default instructor
            </div>
          </div>
          <Button
            loading={loading}
            disabled={loading}
            type='primary'
            onClick={singInAsAdmin}
          >
            Sign In as Instructor
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

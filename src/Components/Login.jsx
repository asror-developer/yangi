import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        axios({
            url: 'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
            method: 'POST',
            data: values,
        })
            .then(res => {
                //    console.log(res.data.data.tokens.accessToken.tokens);
                if (res.data.success) {
                    localStorage.setItem('access_token', res.data.data.tokens.accessToken.token)
                    message.success("Muvaffaqiyatli kirildi")
                    navigate("/home")
                }

            })
            .catch(err => {
                message.error("Parol xato")
            })


    };
    return (
        <div className='container' >
            <div className='login'>
                <Form

                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        padding: '80px',
                        boxShadow: '0 0 10px 10px #87CEFA',
                        maxWidth: 700,
                        margin: '200px auto',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}

                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        style={{ marginLeft: '100px' }}
                        label="Phone"
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ marginLeft: '100px' }}
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login

import React, {useState} from "react"
import {Button, Form, Input, Select, Spin, Upload, Alert, Space} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {UserService as userService} from "../../Services/user-services/user.service"
import 'react-phone-number-input/style.css'

export const FormUserComponent = () => {

    const [form] = Form.useForm();
    const {saveUser} = userService();
    const {Option} = Select;
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const [loading, setLoading] = useState(false);
    const [successSaved, setSuccessSaved] = useState(false);

    const prefixSelector = (
        <Form.Item name="phonePrefix" noStyle>
            <Select
                style={{width: 80,}}
            >
                <Option value="+380">+380</Option>
                <Option value="+87">+87</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = (values) => {
        console.log(values)
        saveUser(values);
        setLoading(true);
        setTimeout(() => {
            form.resetFields();
            setLoading(false);
            setSuccessSaved(true);
            setTimeout(() => {
                setSuccessSaved(false);
            }, 3000)

        }, 500);
    };

    const onFinishFailed = (error) => {
        return error;
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <>
            <Spin spinning={loading}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="saveUser"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{phonePrefix: '+380',}}
                    style={{maxWidth: 600,}}
                    scrollToFirstError

                >
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="userName"
                        label="Username"
                        rules={[
                            {
                                type: 'string',
                                message: 'The input is not valid username!',
                            },
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (getFieldValue('userName')[0] === '@') {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The username should start with @'));
                                }
                            })
                        ]}
                    >
                        <Input placeholder="@"/>
                    </Form.Item>

                    <Form.Item name="location" label="Location">
                        <Select placeholder="Select your location">
                            <Option value="Europe">Europe</Option>
                            <Option value="North America">North America</Option>
                            <Option value="South America">South America</Option>
                            <Option value="Asia">Asia</Option>
                            <Option value="Australia">Australia</Option>
                            <Option value="Africa">Africa</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}

                    >
                        <Input addonBefore={prefixSelector} style={{width: '100%',}}/>
                    </Form.Item>

                    <Form.Item
                        name="photo"
                        label="User photo"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button style={{marginRight: 50}} icon={<UploadOutlined/>}>Click to upload photo</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button block
                                onClick={() =>
                                    form.setFieldValue(
                                    'phone',
                                    form.getFieldValue("phonePrefix") + form.getFieldValue("phone"))}
                                style={{marginLeft: 100}}
                                type="primary"
                                htmlType="submit">Save</Button>
                    </Form.Item>
                    <Form.Item></Form.Item>
                </Form>
                <Space direction="vertical" style={{width: '100%',}}>
                    {successSaved ?  <Alert style={{marginLeft: 100}} message="The user information was saved successful" type="success" showIcon /> : <></>}
                </Space>
            </Spin>
        </>
    );
}
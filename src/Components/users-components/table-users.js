import {Avatar, Col, Row, Space, Spin, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {UserService as userService} from "../../Services/user-services/user.service";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {environment} from "../../Environments/environment";

export const TableUsersComponent = () => {

    const {getAllUsers, deleteUser, userData} = userService();
    const [loading, setLoading] = useState(false);
    const path = environment.baseUserAvatarImage;
    const columns = [
        {
            title: 'User',
            key: 'userName',
            dataIndex: 'userName', render: (username) => {
                return (
                    <>
                        <Space size={8} wrap>
                            <Row gutter={[8, 40]} justify="space-around">
                                <Col span={24}>
                                    <Avatar src={path}></Avatar>
                                </Col>
                            </Row>
                            <Row gutter={[8, 40]} justify="space-around">
                                <Col span={24}>
                                    <Tag color='success' key={username}>{username}</Tag>
                                </Col>
                            </Row>
                        </Space>
                    </>
                )
            }
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status', render: status => {
                let color = 'green'
                if (status === 'Inactive') color = 'volcano'
                return (<Tag color={color} key={status}>{status}</Tag>)
            }
        },
        {
            title: 'Action',
            key: 'action', render: (record) => {
                return (
                    <>
                        <EditOutlined style={{color: "blue", fontSize: 18}}/>
                        <DeleteOutlined
                            onClick={() => {
                                deleteUserEvent(record.id)
                            }}
                            style={{color: "red", marginLeft: 15, fontSize: 18}
                            }/>
                    </>
                )
            },
        }]

    const deleteUserEvent = (userId) => {
        deleteUser(userId)
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getAllUsers()
            setLoading(false)
        }, 1000)

    }, [])
    return (
        <div className="container">
            <Spin spinning={loading}>
                <Table bordered={true} columns={columns} dataSource={userData}/>
            </Spin>
        </div>
    );
}
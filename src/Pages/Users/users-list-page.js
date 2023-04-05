import React from 'react'
import {TableUsersComponent} from "../../Components/users-components/table-users";
import {Button, Col, Divider, Row} from "antd";

export const GetUsers = () => {

    return (
        <div className="container">
            <Row justify="space-around" align="middle">
                <Divider orientation="left">
                    <Col span={4}>
                        <Button value={50} type="primary" onClick={() => onclick = () => {
                            window.location.assign('http://localhost:3000/create_user_form');
                        }}>Add a new user</Button>
                    </Col>
                </Divider>
            </Row>
            <TableUsersComponent/>
        </div>
    );
}
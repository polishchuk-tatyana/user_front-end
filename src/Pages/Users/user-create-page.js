import React from 'react'
import {FormUserComponent} from "../../Components/users-components/form-user";
import {Divider, Row} from "antd";

export const CreateUser = () => {
    return (
        <div className="container">
            <Row justify="space-around" align="middle">
                <Divider orientation="left">Complete user form</Divider>
            </Row>
            <FormUserComponent/>
        </div>
    );
}
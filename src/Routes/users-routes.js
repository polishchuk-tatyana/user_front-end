import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {GetUsers} from "../Pages/Users/users-list-page";
import {CreateUser} from "../Pages/Users/user-create-page";

export const useRoutes = ready => {
    return (
            <Routes>
                <Route path="/" element={<GetUsers />} />
                <Route path="/create_user_form" element={<CreateUser />} />
            </Routes>
    )
}
import {UrlService as urlService} from '../url.service'
import axios from "axios";
import {useState} from "react";

export const UserService = () => {
    const {createUrl} = urlService()
    let getAllUsersUrl = createUrl('api/users')
    let saveUserUrl = createUrl('api/users')
    let deleteUserUrl = (id) => `${createUrl('api/users')}/${id}`
    const [userData, setUserData] = useState([])

    const getAllUsers = () => {
        axios.get(getAllUsersUrl, {responseType: "json",})
            .then((response) => {
                const data = response.data
                setUserData(data)
            })
            .catch(handlerError)
    }

    const saveUser = (userData) => {
        axios
            .post(saveUserUrl, userData)
            .catch(handlerError)
    }

    const deleteUser = (userId) => {
        axios
            .delete(deleteUserUrl(userId))
            .then(() => {getAllUsers()})
            .catch(handlerError)
    }

    const handlerError = (error) => {
        if (error.response) {
            throw error.response.data || error.response.status || error.response.headers
        } else if (error.request) {
            throw error.request
        } else {
            throw new error("Something went wrong! Error ", error.message)
        }
    }

    return {getAllUsers, deleteUser, saveUser, userData}
}
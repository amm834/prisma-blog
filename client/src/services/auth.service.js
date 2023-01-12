import {configureAuth} from 'react-query-auth';
import http from "./http.service.js";

const loginFn = async (user) => {
    try {
        return await http.post("/auth/login", user)
    } catch (error) {
        throw error?.response?.data?.msg
    }
}

const logoutFn = async () => {
    try {
        return await http.post("/auth/logout")
    } catch (error) {
        throw error?.response?.data?.msg
    }
}

export const {useLogin, useLogout} = configureAuth({
    loginFn,
    logoutFn
});
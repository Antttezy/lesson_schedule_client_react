import LoginForm from "../components/LoginForm";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login as loginRequest } from "../api/authentication";
import { Login as setlogin } from "../redux/authentication/actions";
import { Navigate } from "react-router";

export default function Login() {

    const [enabled, setEnabled] = useState(true)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)

    async function login(loginBody) {
        setEnabled(false)

        try {
            let response = await loginRequest(loginBody)
            dispatch(setlogin(response))
            setRedirect(r => true)
        } catch (error) {
            console.log(error.message)
        }
        setEnabled(true)
    }

    return (
        !redirect ?
            <LoginForm loginHandler={(lb) => login(lb)} enabled={enabled} /> :
            <Navigate to='/' />
    );
}

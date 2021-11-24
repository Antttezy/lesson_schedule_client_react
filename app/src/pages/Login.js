import LoginForm from "../components/LoginForm";
import { useState } from "react"

export default function Login() {

    const [enabled, setEnabled] = useState(true)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function login(loginBody) {
        setEnabled(false)
        await sleep(1000);
        setEnabled(true)
    }

    return (
        <LoginForm loginHandler={(lb) => login(lb)} enabled={enabled} />
    );
}

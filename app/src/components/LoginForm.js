import Button from "./Button";
import InputField from "./InputField";
import './form.css'
import { useState } from "react";

export default function LoginForm({ loginHandler, enabled }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function submit() {
        if (enabled)
            loginHandler(
                {
                    login: username,
                    password
                }
            );
    }

    return (
        <form className='form'>
            <p>Вход</p>
            <InputField type='text' placeholder='Имя пользователя' changeHandler={(uname) => setUsername(uname)} />
            <InputField className='mb' type='password' placeholder='Пароль' changeHandler={(passwd) => setPassword(passwd)} />
            <Button caption='Войти' clickHandler={() => submit()} enabled={enabled} />
        </form>
    );
}

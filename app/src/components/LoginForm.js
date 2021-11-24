import Button from "./Button";
import InputField from "./InputField";
import './form.css'

export default function LoginForm({ loginHandler, enabled }) {

    let username = ''
    let password = ''

    function submit() {
        if (enabled)
            loginHandler(
                {
                    username,
                    password
                }
            );
    }

    return (
        <form className='form'>
            <p>Вход</p>
            <InputField type='text' placeholder='Имя пользователя' changeHandler={(uname) => username = uname} />
            <InputField className='mb' type='password' placeholder='Пароль' changeHandler={(passwd) => password = passwd} />
            <Button caption='Войти' clickHandler={() => submit()} enabled={enabled} />
        </form>
    );
}

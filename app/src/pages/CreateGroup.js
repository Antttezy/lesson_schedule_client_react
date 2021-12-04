import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAccessToken } from "../api/authentication";
import { createGroup } from "../api/groups";
import { UpdateAccessToken } from "../redux/authentication/actions";

export default function CreateGroup() {
    const authentication = useSelector(store => store.authenticationReducer)
    const [name, setName] = useState('')
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch()

    async function create() {
        async function body(accessToken) {

            await createGroup(accessToken, {
                name
            })
            setRedirect(_ => true)
        }

        function showError(error) {
            console.log(error)
        }

        try {
            await body(authentication.accessToken)

        } catch (err) {

            if (err.unauthorized) {
                try {
                    const newToken = await getAccessToken(authentication.refreshToken)
                    dispatch(UpdateAccessToken(newToken))
                    await body(newToken)

                } catch (err) {
                    if (!err.unauthorized) {
                        showError('Имя группы должно быть уникальным')
                    }
                }

            } else {
                showError('Имя группы должно быть уникальным')
            }
        }
    }

    function createClick(e) {
        e.preventDefault()
        create()
    }

    function onNameChange(e) {
        setName(_ => e.target.value)
    }

    if (redirect) {
        return <Navigate to='/groups' />
    }

    return (
        <form>
            <input type='text' value={name} placeholder='Имя группы' required onChange={onNameChange} />
            <button type='submit' onClick={createClick}>Создать</button>
        </form>
    )
}

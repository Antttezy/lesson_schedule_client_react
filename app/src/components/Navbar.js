import React, { useEffect } from "react"
import "./navbar.css"
import logo from "./logo.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessToken, logout } from "../api/authentication";
import { useDispatch } from "react-redux";
import { Logout, UpdateAccessToken } from "../redux/authentication/actions";
import { accountData } from "../api/student";
import { clearAll, setData } from "../redux/user/actions";
import { ROLES } from "../redux/authentication/constants";
import { accountData as teacherData } from "../api/teacher";

export default function Navbar() {
    const authentication = useSelector(s => s.authenticationReducer)
    const userData = useSelector(s => s.userReducer)
    const dispatch = useDispatch()

    async function exit() {
        try {
            await logout({
                refreshToken: authentication.refreshToken
            })
        } catch (error) {

        } finally {
            dispatch(Logout())
            dispatch(clearAll())
        }
    }

    async function fetchAccount(isLoggedIn) {
        async function getBody(accessToken) {
            if (isLoggedIn === true) {
                switch (authentication.role) {
                    case ROLES.STUDENT:
                        dispatch(setData(await accountData(accessToken)))
                        break;

                    case ROLES.TEACHER:
                        dispatch(setData(await teacherData(accessToken)))
                        break;

                    default:
                        break;
                }

            }
        }

        try {
            await getBody(authentication.accessToken)

        } catch (error) {
            try {
                let newAccessToken = await getAccessToken(authentication.refreshToken)
                dispatch(UpdateAccessToken(newAccessToken))
                await getBody(newAccessToken)

            } catch (error) {
                exit()
            }
        }
    }

    useEffect(
        () => {
            fetchAccount(authentication.isLoggedIn)
        },
        [authentication.isLoggedIn])

    return (
        <nav className="navbar">
            <Link to='/'>
                <img className="logo" src={logo} alt='Logo' />
            </Link>
            <ul className="nav-items">
                <li className="nav-item"><Link to='/'>Главная</Link></li>
                <li className="nav-item"><Link to='/about'>Информация о приложении</Link></li>
                {userData.isLoggedIn && authentication.role === ROLES.STUDENT ?
                    <li className='nav-item'><Link to='/lessons'>Расписание уроков</Link></li> :
                    null}

                {userData.isLoggedIn && authentication.role === ROLES.TEACHER ?
                    <>
                        <li className="nav-item"><Link to='/students'>Студенты</Link></li>
                        <li className="nav-item"><Link to='/groups'>Группы</Link></li>
                        <li className="nav-item"><Link to='/schedule'>Занятия</Link></li>
                        <li className="nav-item"><Link to='/workloads'>Программы</Link></li>
                    </> :
                    null}
            </ul>
            <ul className="auth-items">
                {userData.isLoggedIn ?
                    <>
                        {authentication.role === ROLES.STUDENT ?
                            <li className='nav-item'><span>{userData.firstName} {userData.secondName}, {userData.group ? userData.group : 'нет группы'}</span></li> :
                            null
                        }

                        {authentication.role === ROLES.TEACHER ?
                            <li className='nav-item'><span>{userData.firstName} {userData.secondName}, {userData.position ? userData.position : 'нет должности'}</span></li> :
                            null
                        }

                        <li className='nav-item'><Link to='/' onClick={() => exit()}>Выход</Link></li>
                    </> :
                    <li className="nav-item"><Link to='/login'>Вход</Link></li>}
            </ul>
        </nav>
    );
}

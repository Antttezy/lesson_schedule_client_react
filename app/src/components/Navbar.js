import React from "react"
import "./navbar.css"
import logo from "./logo.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../api/authentication";
import { useDispatch } from "react-redux";
import { Logout } from "../redux/authentication/actions";

export default function Navbar() {
    const authentication = useSelector(s => s.authenticationReducer)
    const dispatch = useDispatch()

    async function exit() {
        try {
            await logout({
                refreshToken: authentication.refreshToken
            })
        } catch (error) {

        } finally {
            dispatch(Logout())
        }
    }

    return (
        <nav className="navbar">
            <Link to='/'>
                <img className="logo" src={logo} alt='Logo' />
            </Link>
            <ul className="nav-items">
                <li className="nav-item"><Link to='/'>Главная</Link></li>
                <li className="nav-item"><Link to='/about'>Информация о приложении</Link></li>
            </ul>
            <ul className="auth-items">
                {authentication.isLoggedIn ?
                    <li className='nav-item'><Link to='/' onClick={() => exit()}>Выход</Link></li> :
                    <li className="nav-item"><Link to='/login'>Вход</Link></li>}
            </ul>
        </nav>
    );
}

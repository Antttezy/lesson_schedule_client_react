import React from "react"
import "./navbar.css"
import logo from "./logo.png"
import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="navbar">
            <Link to='/'>
                <img className="logo" src={logo} />
            </Link>
            <ul className="nav-items">
                <li className="nav-item"><Link to='/'>Главная</Link></li>
                <li className="nav-item"><Link to='/about'>Информация о приложении</Link></li>
            </ul>
            <ul className="auth-items">
                <li className="nav-item"><Link to='/login'>Вход</Link></li>
            </ul>
        </nav>
    );
}
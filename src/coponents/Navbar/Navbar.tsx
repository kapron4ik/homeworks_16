import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes";

const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to={PATH.LOGIN} activeClassName={s.active}>Login</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={PATH.PROFILE} activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={PATH.REGISTRATION} activeClassName={s.active}>Registration</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={PATH.RECOVERY_PASSWORD} activeClassName={s.active}>Recovery</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={PATH.ENTER_NEW_PASSWORD} activeClassName={s.active}>Set password</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={PATH.CARD_PACKS} activeClassName={s.active}>Card Packs</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={PATH.TEST} activeClassName={s.active}>Test</NavLink>
        </div>
    </nav>
}

export default Navbar;
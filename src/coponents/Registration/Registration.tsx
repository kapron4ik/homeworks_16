import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import {loginTC, registerTC} from "../../redux/auth-reducer";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import s from "./Registration.module.css"



const Registration: React.FC<any> = (props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confPassword, setConfPassword] = useState<string>('')
    const [errorPass, setErrorPass] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const dispatch = useDispatch()

    function isEmail(val: string) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regEmail.test(val)) {
            setErrorEmail('')
            return true
        } else {
            setErrorEmail('не корректный email')
            return false
        }
    }

    function correctPassword(password1: string, password2: string) {
        if (password1 !== password2) {
            setErrorPass('пароли не совпадают')
            return false
        } else if (password1.length < 8) {
            setErrorPass('пароль должен быть больше 8 символов')
            return false
        } else {
            setErrorPass('')
            return true
        }
    }

    function validation() {
        const conf1 = isEmail(email)
        const conf2 = correctPassword(password, confPassword)
        if (conf1 && conf2) {
            dispatch(registerTC(email, password))
        }
    }

    //bdfg@mail.ru
    //12345678

    return <div className={s.wrapper}>
        <h1>Registration</h1>
        <SuperInputText
            value={email}
            onChangeText={setEmail}
            placeholder='введите email'
            error={errorEmail}
        />
        {/*<div>{errorEmail ? errorEmail : ''}</div>*/}
        <SuperInputText
            value={password}
            type={'password'}
            onChangeText={setPassword}
            placeholder='введите пароль 8 символов'
            error={errorPass}
        />
        <SuperInputText
            value={confPassword}
            type={'password'}
            onChangeText={setConfPassword}
            placeholder='подтвердите пароль'
            error={errorPass}
        />
        {/*<div>{errorPass ? errorPass : ''}</div>*/}
        <SuperButton onClick={() => validation()
        }>Зарегестрироваться</SuperButton>
    </div>
}

export default Registration